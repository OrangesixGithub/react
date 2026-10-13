import { useState } from "react";
import { configLayout } from "../function/config";
import type { Dispatch, SetStateAction } from "react";
import type { PivotSchema } from "../@types/perspective";
import { viewsRead, viewsWrite } from "../function/views";
import type { TablePivotConditionalRule, TablePivotLayout, TablePivotProps, TablePivotView } from "../@types";

interface PivotViewsOptions {
    props: TablePivotProps
    storageKey: string
    layout: TablePivotLayout | null
    schema: PivotSchema
    expand: boolean
    formattingRules: TablePivotConditionalRule[]
    setLayout: Dispatch<SetStateAction<TablePivotLayout | null>>
    setExpand: Dispatch<SetStateAction<boolean>>
    setFormattingRules: Dispatch<SetStateAction<TablePivotConditionalRule[]>>
}

/**
 * Hook - `useTablePivotViews`
 *
 * Salva, aplica e remove as visões do pivot no `localStorage`, permitindo reabrir a mesma análise em outra sessão.
 */
export function useTablePivotViews(options: PivotViewsOptions) {
    const { props, storageKey, layout, schema, expand, formattingRules, setLayout, setExpand, setFormattingRules } = options;
    // Lista de visões salvas para esta chave
    const [views, setViews] = useState<TablePivotView[]>(() => viewsRead(storageKey));
    // Controla a abertura do painel de visões
    const [viewsOpen, setViewsOpen] = useState(false);
    // Mensagem exibida quando o navegador bloqueia o armazenamento
    const [viewsError, setViewsError] = useState<string | null>(null);

    // Grava a lista e atualiza o estado; avisa quando o navegador não permite salvar
    function persist(next: TablePivotView[]) {
        setViews(next);
        setViewsError(viewsWrite(storageKey, next)
            ? null
            : "Não foi possível salvar neste navegador (armazenamento bloqueado ou cheio).");
    }

    // Abre o painel relendo as visões, que podem ter sido salvas em outra aba
    function openViews() {
        setViews(viewsRead(storageKey));
        setViewsError(null);
        setViewsOpen(true);
    }

    // Fecha o painel de visões
    function closeViews() {
        setViewsOpen(false);
    }

    // Salva a visão atual; um nome já existente é substituído
    function saveView(name: string) {
        if (!layout) {
            return;
        }
        const view: TablePivotView = {
            name,
            layout,
            conditionalFormatting: formattingRules,
            expanded: expand,
            savedAt: new Date().toISOString(),
        };
        const current = viewsRead(storageKey).filter(item => item.name !== name);
        persist([view, ...current]);
    }

    // Aplica a visão, descartando campos que não existem mais nos dados, e informa o consumidor
    function applyView(view: TablePivotView) {
        const next = configLayout(view.layout, schema);
        const rules = view.conditionalFormatting ?? [];
        setLayout(next);
        setFormattingRules(rules);
        setExpand(view.expanded ?? false);
        props.onChange?.(next);
        props.onConditionalFormattingChange?.(rules);
        setViewsOpen(false);
    }

    // Remove a visão salva
    function deleteView(name: string) {
        persist(viewsRead(storageKey).filter(item => item.name !== name));
    }

    // Volta ao layout, à formatação e à expansão definidos pelas props
    function resetView() {
        const next = configLayout(props, schema);
        const rules = props.conditionalFormatting ?? [];
        setLayout(next);
        setFormattingRules(rules);
        setExpand(props.expanded ?? false);
        props.onChange?.(next);
        props.onConditionalFormattingChange?.(rules);
        setViewsOpen(false);
    }

    return { views, viewsOpen, viewsError, openViews, closeViews, saveView, applyView, deleteView, resetView };
}
