import type { PivotToolbarOptions } from "../@types/perspective";

/**
 * Hook - `useTablePivotToolbar`
 *
 * Reúne as ações de expansão, lista de campos e tela cheia da barra.
 */
export function useTablePivotToolbar({ rootRef, setExpand, setFieldList, setFormatting }: PivotToolbarOptions) {
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
        // Usa o documento do próprio pivot, que pode ser a janela principal quando renderizado a partir de um iframe.
        const owner = rootRef.current?.ownerDocument ?? document;
        if (owner.fullscreenElement) {
            owner.exitFullscreen().catch(() => undefined);
        } else {
            rootRef.current?.requestFullscreen().catch(() => undefined);
        }
    }

    return { expandAll, collapseAll, openFields, openFormatting, fullscreen };
}
