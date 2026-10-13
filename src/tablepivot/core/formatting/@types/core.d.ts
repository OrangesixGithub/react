import type { TablePivotCellMeta, TablePivotConditionalRule, TablePivotLayout } from "../../../@types";

/** Props internas do painel de formatação condicional. */
export interface TablePivotFormattingProps {
    rules: TablePivotConditionalRule[]
    layout: TablePivotLayout
    labels?: Record<string, string>
    onApply: (rules: TablePivotConditionalRule[]) => void
    onClose: () => void
}

/** Regra em edição, preservando valores vazios nos campos numéricos. */
export interface PivotFormattingDraft extends Omit<TablePivotConditionalRule, "value" | "valueTo"> {
    key: string
    value: string
    valueTo: string
}

/** Metadados internos: user contém o valor bruto antes da formatação numérica. */
export interface PivotFormattingCellMeta extends TablePivotCellMeta {
    user?: unknown
}
