import type { PivotToolbarOptions } from "../@types/perspective";

/**
 * Hook - `useTablePivotToolbar`
 *
 * Reúne as ações de expansão, exportação, lista de campos e tela cheia da barra.
 */
export function useTablePivotToolbar({ rootRef, viewerRef, setExpand, setFieldList, setFormatting }: PivotToolbarOptions) {
    // Baixa os dados exibidos na grade em CSV
    function exportCsv() {
        viewerRef.current?.download({ method: "csv" }).catch(() => undefined);
    }

    // Expande todos os níveis da hierarquia de linhas
    function expandAll() {
        setExpand(true);
    }

    // Recolhe a hierarquia de linhas ao primeiro nível
    function collapseAll() {
        setExpand(false);
    }

    // Abre a lista de campos
    function openFields() {
        setFieldList(true);
    }

    // Abre o painel de formatação condicional
    function openFormatting() {
        setFormatting(true);
    }

    // Alterna o componente entre tela cheia e modo normal
    function fullscreen() {
        if (document.fullscreenElement) {
            document.exitFullscreen().catch(() => undefined);
        } else {
            rootRef.current?.requestFullscreen().catch(() => undefined);
        }
    }

    return { expandAll, collapseAll, exportCsv, openFields, openFormatting, fullscreen };
}
