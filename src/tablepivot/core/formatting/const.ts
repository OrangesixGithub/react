import type { TablePivotConditionalOperator } from "../../@types";

/** Comparações disponíveis no painel. */
export const pivotFormattingOperators: Array<{ id: TablePivotConditionalOperator, label: string }> = [
    { id: "lt", label: "Menor que" },
    { id: "lte", label: "Menor ou igual a" },
    { id: "gt", label: "Maior que" },
    { id: "gte", label: "Maior ou igual a" },
    { id: "eq", label: "Igual a" },
    { id: "neq", label: "Diferente de" },
    { id: "between", label: "Entre" },
    { id: "notBetween", label: "Fora do intervalo" },
];
