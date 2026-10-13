import { useEffect } from "react";
import type { TablePivotCellMeta } from "../@types";
import { initializePerspective } from "../core/engine";
import { configLayout, configPerspective } from "../function/config";
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
    props, id, hostRef, viewerRef, tableRef, retiredRef, closingRef, styleCellRef,
    client, error, source, layout, expand, rendered,
    setClient, setError, setSource, setLayout, setExpand, setRendered, applyDepth, relabel,
}: PivotEffectsOptions) {
    const data = props.data ?? [];
    // Compara o layout pelo conteúdo para evitar restaurações a cada renderização
    const layoutKey = JSON.stringify([props.rows, props.columns, props.values, props.filters, props.sort]);
    // Compara os rótulos pelo conteúdo para evitar restaurações desnecessárias
    const labelsKey = JSON.stringify(props.labels ?? {});

    // Sincroniza a expansão quando a prop expanded muda
    useEffect(() => setExpand(props.expanded ?? false), [props.expanded]);

    // Monta o layout a partir das props quando elas ou os campos dos dados mudam.
    useEffect(() => {
        if (source) {
            setLayout(configLayout(props, source.schema));
        }
    }, [source, layoutKey]);

    // Cria o `<perspective-viewer>` e carrega o motor. Na desmontagem, libera a memória WASM do viewer.
    useEffect(() => {
        let disposed = false;
        closingRef.current = null;
        const viewer = document.createElement("perspective-viewer");
        viewer.className = styles.viewer();
        viewer.addEventListener("contextmenu", blockContextMenu, { capture: true });
        hostRef.current?.append(viewer);
        viewerRef.current = viewer;

        initializePerspective()
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
        const pending = client.table(data as Record<string, unknown>[], { name: tableName(id) })
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
        if (!viewer || !rendered) {
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
            gridStyles.textContent = tablePivotGridStyles;
            grid.parentNode?.appendChild(gridStyles);
            unsubscribe = grid.addStyleListener(() => {
                grid.querySelectorAll<HTMLTableCellElement>("td, th").forEach((cell: HTMLTableCellElement) => {
                    if (cell.tagName === "TH") {
                        relabel(cell);
                    }
                    styleCellRef.current?.(cell, (grid.getMeta(cell) ?? {}) as TablePivotCellMeta);
                });
            });
            // O primeiro desenho acontece antes do registro; redesenha para aplicar os rótulos e o `styleCell`.
            grid.draw();
        }).catch(() => undefined);

        return () => {
            cancelled = true;
            unsubscribe?.();
            gridStyles?.remove();
        };
    }, [rendered]);

}
