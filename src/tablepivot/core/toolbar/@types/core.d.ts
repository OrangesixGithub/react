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
    onExpand: () => void
    onCollapse: () => void
    onExport: () => void
    onFullscreen: () => void
}

