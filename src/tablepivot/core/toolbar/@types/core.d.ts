import type { TablePivotLayout } from "../../../@types";

/**
 * Props internas da barra do TablePivot.
 */
export interface TablePivotToolbarProps {
    layout: TablePivotLayout
    labels?: Record<string, string>
    title?: string
    expandable: boolean
    /** Indica se todos os níveis da hierarquia estão expandidos. */
    expanded: boolean
    /** Indica se há regras de formatação condicional aplicadas à tabela. */
    formattingActive: boolean
    onFormatting: () => void
    onFields: () => void
    /** Abre o painel de visões salvas. */
    onViews: () => void
    /** Quantidade de visões salvas para esta chave. */
    viewsCount: number
    onExpand: () => void
    onCollapse: () => void
    onExport: () => void
    /** Baixa a tabela em Excel (.xlsx). */
    onExportExcel: () => void
    /** Copia a tabela para a área de transferência. */
    onCopy: () => void
    /** Indica que a tabela acabou de ser copiada. */
    copied: boolean
    onFullscreen: () => void
}

