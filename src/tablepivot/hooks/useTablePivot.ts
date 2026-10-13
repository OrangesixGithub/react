import type { ForwardedRef } from "react";
import { pivotIntegerLabel } from "../core/const";
import { useTablePivotEffects } from "./useTablePivotEffects";
import { useTablePivotToolbar } from "./useTablePivotToolbar";
import { configHasIntegerHierarchy } from "../function/config";
import { useImperativeHandle, useMemo, useRef, useState } from "react";
import type { TablePivotConditionalRule, TablePivotLayout, TablePivotProps, TablePivotRef } from "../@types";
import type { Client, HTMLPerspectiveViewerElement, PivotDepth, PivotSource, Table } from "../@types/perspective";

/**
 * Hook - `useTablePivot`
 *
 * Controla o motor, os dados, o layout e as ações da tabela dinâmica.
 */
export function useTablePivot(props: TablePivotProps, id: string, ref: ForwardedRef<TablePivotRef>) {
    // Referencia o contêiner que recebe o viewer do Perspective
    const hostRef = useRef<HTMLDivElement>(null);
    // Referencia o contêiner usado no modo de tela cheia
    const rootRef = useRef<HTMLDivElement>(null);
    // Guarda o viewer enquanto o componente estiver montado
    const viewerRef = useRef<HTMLPerspectiveViewerElement | null>(null);
    // Guarda a tabela disponível pela ref pública
    const tableRef = useRef<Table | null>(null);
    // Guarda as tabelas antigas até concluir a troca de dados
    const retiredRef = useRef<Table[]>([]);
    // Acompanha a liberação do viewer durante a desmontagem
    const closingRef = useRef<Promise<void> | null>(null);
    // Mantém a personalização de células atualizada para a grade
    const styleCellRef = useRef(props.styleCell);
    // Guarda a profundidade e o formato dos cabeçalhos da hierarquia
    const depthRef = useRef<PivotDepth>({ collapsed: false, levels: 0, integer: false });
    // Guarda o worker compartilhado após carregar o motor
    const [client, setClient] = useState<Client | null>(null);
    // Guarda a mensagem de erro do carregamento ou da grade
    const [error, setError] = useState<string | null>(null);
    // Guarda a tabela e o esquema do conjunto de dados atual
    const [source, setSource] = useState<PivotSource | null>(null);
    // Guarda o layout aplicado à grade
    const [layout, setLayout] = useState<TablePivotLayout | null>(null);
    // Controla se a hierarquia de linhas está expandida
    const [expand, setExpand] = useState(props.expanded ?? false);
    // Indica se a grade já recebeu seu primeiro layout
    const [rendered, setRendered] = useState(false);
    // Controla a abertura da lista de campos
    const [fieldList, setFieldList] = useState(false);
    // Controla a abertura do painel de formatação condicional
    const [formatting, setFormatting] = useState(false);
    // Guarda as regras aplicadas aos valores da grade
    const [formattingRules, setFormattingRules] = useState<TablePivotConditionalRule[]>(props.conditionalFormatting ?? []);
    // Usa uma lista vazia quando não houver dados
    const data = props.data ?? [];
    // Disponibiliza o esquema dos campos da tabela atual
    const schema = useMemo(() => source?.schema ?? {}, [source]);
    styleCellRef.current = props.styleCell;
    depthRef.current = {
        collapsed: !expand && (layout?.rows.length ?? 0) > 1,
        levels: layout?.rows.length ?? 0,
        integer: layout ? configHasIntegerHierarchy(layout, schema) : false,
    };

    // Aplica a profundidade da hierarquia de linhas (recolhida no primeiro nível ou expandida) e redesenha a grade.
    async function applyDepth() {
        const viewer = viewerRef.current;
        if (!viewer) {
            return;
        }
        const { collapsed, levels } = depthRef.current;
        const view = await viewer.getView();
        await view.set_depth(collapsed ? 0 : levels);
        const plugin = await viewer.getPlugin("Datagrid");
        await plugin.draw(view);
    }

    // Traduz o rótulo do total e remove o separador de milhar dos rótulos de campos inteiros (ex.: `2.024`).
    function relabel(cell: HTMLTableCellElement) {
        // Os cabeçalhos de coluna guardam o texto em um `<span>`, ao lado do controle de redimensionamento.
        const label = cell.childElementCount === 0 ? cell : cell.querySelector(":scope > span:not([class])");
        const text = label?.textContent ?? "";
        if (!label || label.childElementCount > 0) {
            return;
        }
        if (text === "TOTAL") {
            label.textContent = "Total";
        } else if (depthRef.current.integer && pivotIntegerLabel.test(text)) {
            label.textContent = text.replace(/[^\d-]/g, "");
        }
    }

    // Registra os efeitos de carregamento e sincronização da grade
    useTablePivotEffects({
        props, formattingRules, setFormattingRules, id, hostRef, viewerRef, tableRef, retiredRef, closingRef, styleCellRef,
        client, error, source, layout, expand, rendered,
        setClient, setError, setSource, setLayout, setExpand, setRendered, applyDepth, relabel,
    });

    // Prepara as ações executadas pelos botões da barra
    const { expandAll, collapseAll, exportCsv, openFields, openFormatting, fullscreen } = useTablePivotToolbar({
        rootRef, viewerRef, setExpand, setFieldList, setFormatting,
    });

    // Disponibiliza as ações e os acessos avançados pela ref pública
    useImperativeHandle(ref, () => ({
        expandAll,
        collapseAll,
        exportCsv,
        get viewer() {
            return viewerRef.current;
        },
        get table() {
            return tableRef.current;
        },
    }), []);

    // Fecha a lista de campos
    function closeFields() {
        setFieldList(false);
    }

    // Fecha o painel sem alterar as regras aplicadas
    function closeFormatting() {
        setFormatting(false);
    }

    // Aplica as regras e permite que o consumidor salve a configuração
    function changeFormatting(rules: TablePivotConditionalRule[]) {
        setFormattingRules(rules);
        props.onConditionalFormattingChange?.(rules);
    }

    // Atualiza o layout e informa a alteração ao consumidor
    function changeLayout(next: TablePivotLayout) {
        setLayout(next);
        props.onChange?.(next);
    }

    // Valores distintos de um campo, para o filtro de membros da lista de campos.
    async function loadMembers(field: string) {
        const table = source?.table;
        if (!table) {
            return [];
        }
        const view = await table.view({ group_by: [field], columns: [] });
        try {
            const columns = await view.to_columns() as Record<string, unknown[]>;
            return (columns.__ROW_PATH__ ?? [])
                .map(path => (path as unknown[])[0])
                .filter(value => value !== undefined)
                .map(value => value === null ? "" : String(value));
        } finally {
            view.delete().catch(() => undefined);
        }
    }

    return {
        hostRef, rootRef, client, error, source, layout, expand, fieldList, data, schema,
        formatting, formattingRules, openFormatting, closeFormatting, changeFormatting,
        expandAll, collapseAll, exportCsv, openFields, closeFields, changeLayout, loadMembers, fullscreen,
    };
}
