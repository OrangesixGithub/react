import { useEffect, useRef } from "react";
import type { TablePivotCellMeta } from "../@types";
import { initializePerspectiveFor } from "../core/engine";
import { configLayout, configPerspective } from "../function/config";
import { formattingCell, formattingCss } from "../function/formatting";
import { tablePivotGridStyles, tablePivotVariants } from "../variants";
import type { PivotDatagridPlugin, PivotEffectsOptions, PivotSchema, Table } from "../@types/perspective";

const styles = tablePivotVariants();

let sequence = 0;

// Gera um nome de tabela único, inclusive após recarregar o módulo no HMR
function tableName(id: string) {
    return `${id}-${++sequence}-${Math.random().toString(36).slice(2, 8)}`;
}

// Remove tabelas do worker e ignora as que já foram removidas
function deleteTables(tables: Table[]) {
    tables.forEach(table => table.delete().catch(() => undefined));
}

// Bloqueia o menu nativo e impede que o Perspective abra suas opções avançadas
function blockContextMenu(event: Event) {
    event.preventDefault();
    event.stopImmediatePropagation();
}

/**
 * Hook - `useTablePivotEffects`
 *
 * Sincroniza o motor, os dados, o layout e a personalização da grade.
 */
export function useTablePivotEffects({
    props, formattingRules, setFormattingRules, id, hostRef, viewerRef, tableRef, retiredRef, closingRef, styleCellRef,
    client, error, source, layout, expand, rendered,
    setClient, setError, setSource, setLayout, setExpand, setRendered, applyDepth, relabel,
}: PivotEffectsOptions) {
    const data = props.data ?? [];
    // Compara o layout pelo conteúdo para evitar restaurações a cada renderização
    const layoutKey = JSON.stringify([props.rows, props.columns, props.values, props.filters, props.sort]);
    // Guarda o layout das props já aplicado, para diferenciar troca de props de troca de dados
    const appliedKeyRef = useRef<string | null>(null);
    // Compara os rótulos pelo conteúdo para evitar restaurações desnecessárias
    const labelsKey = JSON.stringify(props.labels ?? {});

    const formattingKey = JSON.stringify(formattingRules);
    const formattingPropsKey = JSON.stringify(props.conditionalFormatting ?? []);

    // Sincroniza as regras quando a configuração recebida pelas props muda
    useEffect(() => {
        setFormattingRules(props.conditionalFormatting ?? []);
    }, [formattingPropsKey]);

    // Sincroniza a expansão quando a prop expanded muda
    useEffect(() => setExpand(props.expanded ?? false), [props.expanded]);

    // Monta o layout a partir das props quando elas mudam. Com dados novos e as mesmas props, mantém o layout atual
    // (alterado pela lista de campos ou por uma visão salva), descartando os campos que não existem mais.
    useEffect(() => {
        if (!source) {
            return;
        }
        const propsChanged = appliedKeyRef.current !== layoutKey;
        appliedKeyRef.current = layoutKey;
        setLayout(current => configLayout(propsChanged || !current ? props : current, source.schema));
    }, [source, layoutKey]);

    // Cria o `<perspective-viewer>` e carrega o motor. Na desmontagem, libera a memória WASM do viewer.
    useEffect(() => {
        let disposed = false;
        closingRef.current = null;
        // Cria o viewer no documento do contêiner: dentro de um iframe, uma modal pode renderizar na janela principal.
        const owner = hostRef.current?.ownerDocument ?? document;
        const viewer = owner.createElement("perspective-viewer");
        viewer.className = styles.viewer();
        viewer.addEventListener("contextmenu", blockContextMenu, { capture: true });
        hostRef.current?.append(viewer);
        viewerRef.current = viewer;

        initializePerspectiveFor(owner.defaultView ?? window)
            .then(async loaded => {
                if (disposed) {
                    return;
                }
                await viewer.load(loaded);
                if (!disposed) {
                    setClient(loaded);
                }
            })
            .catch(reason => !disposed && setError(String(reason?.message ?? reason)));

        return () => {
            disposed = true;
            viewer.removeEventListener("contextmenu", blockContextMenu, { capture: true });
            viewerRef.current = null;
            setClient(null);
            setRendered(false);
            // Antes do motor carregar, o elemento ainda não foi registrado e não tem `delete()`.
            const deleting = typeof viewer.delete === "function" ? viewer.delete() : Promise.resolve();
            closingRef.current = deleting.catch(() => undefined).finally(() => {
                viewer.remove();
                deleteTables(retiredRef.current.splice(0));
            });
        };
    }, []);

    // Cria uma tabela a cada novo conjunto de dados e remove a anterior depois da troca.
    useEffect(() => {
        if (!client || data.length === 0) {
            setSource(null);
            return;
        }

        let disposed = false;
        let created: Table | null = null;
        // Em outra janela, copia os dados para o contexto dela, onde está o motor do Perspective.
        const owner = hostRef.current?.ownerDocument.defaultView ?? window;
        const rows = owner === window ? data : owner.structuredClone(data);
        const pending = client.table(rows as Record<string, unknown>[], { name: tableName(id) })
            .then(async table => {
                created = table;
                const columns = await table.schema();
                if (disposed) {
                    return;
                }
                tableRef.current = table;
                setSource({ table, schema: columns as PivotSchema });
            })
            .catch(reason => !disposed && setError(String(reason?.message ?? reason)));

        return () => {
            disposed = true;
            // A tabela só é removida depois que o viewer passar a usar a próxima (ou for desmontado).
            pending.then(() => {
                if (!created) {
                    return;
                }
                const table = created;
                if (closingRef.current) {
                    closingRef.current.then(() => deleteTables([table]));
                } else {
                    retiredRef.current.push(table);
                }
            });
        };
    }, [client, props.data, id]);

    // Oculta a grade enquanto não houver tabela (sem dados, carregando ou erro).
    useEffect(() => {
        if (viewerRef.current) {
            viewerRef.current.hidden = !source || !!error;
        }
        if (hostRef.current && (!source || error)) {
            hostRef.current.style.height = "80px";
        }
    }, [source, error]);

    // Aplica o layout na grade sempre que ele, os dados ou os nomes dos campos mudarem.
    useEffect(() => {
        const viewer = viewerRef.current;
        if (!viewer || !source || !layout) {
            return;
        }

        let cancelled = false;
        source.table.get_name()
            .then(async name => {
                if (cancelled) {
                    return;
                }
                await viewer.restore({ ...configPerspective(layout, source.schema, props.labels), table: name });
                // Cada restore recria a View totalmente expandida; a profundidade é reaplicada em seguida.
                await applyDepth();
                setRendered(true);
                const retired = retiredRef.current.filter(table => table !== source.table);
                retiredRef.current = retiredRef.current.filter(table => table === source.table);
                deleteTables(retired);
            })
            .catch(reason => !cancelled && setError(String(reason?.message ?? reason)));
        return () => {
            cancelled = true;
        };
    }, [source, layout, labelsKey]);

    // Expande ou recolhe a hierarquia de linhas sem reconstruir a View.
    useEffect(() => {
        if (rendered) {
            applyDepth().catch(() => undefined);
        }
    }, [expand]);

    // Liga o `styleCell` ao desenho da grade (regular-table do plugin Datagrid) e traduz o rótulo do total.
    useEffect(() => {
        const viewer = viewerRef.current;
        if (!viewer || !rendered || !source) {
            return;
        }

        let unsubscribe: (() => void) | undefined;
        let gridStyles: HTMLStyleElement | undefined;
        let cancelled = false;
        Promise.resolve().then(() => viewer.getPlugin("Datagrid")).then((plugin: PivotDatagridPlugin) => {
            const grid = plugin?.regular_table;
            if (cancelled || !grid) {
                return;
            }
            // Aplica o cabeçalho destacado e a rolagem do sistema dentro do shadow DOM
            gridStyles = grid.ownerDocument.createElement("style");
            gridStyles.textContent = tablePivotGridStyles + "\n" + formattingCss(formattingRules, grid.ownerDocument);
            grid.parentNode?.appendChild(gridStyles);

            let measuring = false;
            let pending = false;

            // Calcula a altura de todas as linhas, incluindo as que a grade virtualizada ainda não desenhou
            const resizeHeight = async () => {
                pending = true;
                if (measuring) {
                    return;
                }
                measuring = true;
                try {
                    do {
                        pending = false;
                        const view = await viewer.getView();
                        const rows = await view.num_rows();
                        const host = hostRef.current;
                        if (cancelled || !host) {
                            return;
                        }
                        const rowHeight = grid.querySelector("tbody tr")?.getBoundingClientRect().height ?? 23;
                        const headerHeight = grid.querySelector("thead")?.getBoundingClientRect().height ?? 0;
                        const hostRect = host.getBoundingClientRect();
                        const gridRect = grid.getBoundingClientRect();
                        const offset = Math.max(0, gridRect.top - hostRect.top);
                        const bottom = Math.max(0, hostRect.bottom - gridRect.bottom);
                        const scrollbar = Math.max(0, grid.offsetHeight - grid.clientHeight);
                        const height = Math.ceil(offset + headerHeight + rows * rowHeight + scrollbar + bottom);
                        const next = Math.max(1, height) + "px";
                        if (host.style.height !== next) {
                            host.style.height = next;
                            // Redesenha com o novo espaço: sem isso, a grade virtualizada mantém só as linhas antigas.
                            await viewer.resize();
                        }
                    } while (pending && !cancelled);
                } finally {
                    measuring = false;
                }
            };

            let fitting = false;

            // Alarga a última coluna da hierarquia quando algum rótulo de linha não cabe. Com a hierarquia recolhida,
            // os rótulos ocupam várias colunas (colspan) e a grade não os considera ao calcular as larguras.
            const fitRowHeaders = () => {
                if (fitting) {
                    return;
                }
                const labels = [...grid.querySelectorAll<HTMLTableCellElement>("tbody th.psp-tree-label, tbody th.psp-tree-leaf")];
                const missing = Math.max(0, ...labels.map(cell => cell.scrollWidth - cell.clientWidth));
                const corners = [...grid.querySelectorAll<HTMLTableCellElement>("thead tr:last-child th.psp-header-corner")];
                const last = corners[corners.length - 1];
                const index = Number(last?.className.match(/rt-col-(\d+)/)?.[1]);
                if (missing <= 1 || !last || Number.isNaN(index)) {
                    return;
                }
                fitting = true;
                const sizes = grid.saveColumnSizes();
                sizes[index] = Math.ceil(last.getBoundingClientRect().width) + missing + 8;
                grid.restoreColumnSizes(sizes);
                Promise.resolve(grid.draw()).finally(() => {
                    fitting = false;
                });
            };

            unsubscribe = grid.addStyleListener(() => {
                grid.querySelectorAll<HTMLTableCellElement>("td, th").forEach((cell: HTMLTableCellElement) => {
                    if (cell.tagName === "TH") {
                        relabel(cell);
                    }
                    const meta = (grid.getMeta(cell) ?? {}) as TablePivotCellMeta;
                    formattingCell(cell, meta, formattingRules, layout, props.labels);
                    styleCellRef.current?.(cell, meta);
                });
                fitRowHeaders();
                resizeHeight().catch(() => undefined);
            });
            // O primeiro desenho acontece antes do registro; redesenha para aplicar os rótulos e o `styleCell`.
            grid.draw();
        }).catch(() => undefined);

        return () => {
            cancelled = true;
            unsubscribe?.();
            gridStyles?.remove();
        };
    }, [rendered, source, formattingKey, layout, labelsKey]);

}
