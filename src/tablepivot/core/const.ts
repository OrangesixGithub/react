import type { PivotAggregationOption, PivotZoneOption } from "../@types/perspective";

/**
 * Operações oferecidas ao usuário, com o nome em português e a agregação do Perspective.
 */
export const pivotAggregations: PivotAggregationOption[] = [
    { id: "sum", name: "Soma", numeric: true, perspective: "sum" },
    { id: "count", name: "Contagem", numeric: false, perspective: "count" },
    { id: "avg", name: "Média", numeric: true, perspective: "avg" },
    { id: "min", name: "Mínimo", numeric: true, perspective: "min" },
    { id: "max", name: "Máximo", numeric: true, perspective: "max" },
    { id: "distinct", name: "Contagem distinta", numeric: false, perspective: "distinct count" },
];

/**
 * Áreas da lista de campos, na ordem exibida.
 */
export const pivotZones: PivotZoneOption[] = [
    { id: "filters", label: "Filtros", icon: "bi bi-funnel" },
    { id: "columns", label: "Colunas", icon: "bi bi-layout-three-columns" },
    { id: "rows", label: "Linhas", icon: "bi bi-list-nested" },
    { id: "values", label: "Valores", icon: "bi bi-calculator" },
];

/**
 * Rótulos curtos dos tipos de coluna do Perspective, exibidos na lista de campos.
 */
export const pivotFieldTypes: Record<string, string> = {
    string: "texto",
    integer: "número",
    float: "número",
    date: "data",
    datetime: "data",
    boolean: "sim/não",
};

/**
 * Inteiro formatado com separador de milhar (`2.024`, `2,024`, `2 024`).
 */
export const pivotIntegerLabel = /^-?\d{1,3}([.,   ]\d{3})+$/;

/**
 * Quantidade máxima de valores exibidos de uma vez no filtro; a busca alcança os demais.
 */
export const pivotMembersLimit = 500;
