import type { TablePivotAggregation } from "../@types";
import type { PivotSchema } from "../@types/perspective";
import { pivotAggregations, pivotFieldTypes } from "../core/const";

/**
 * Nome exibido de um campo: o informado em `labels` ou o próprio campo.
 */
export function fieldName(field: string, labels: Record<string, string> = {}) {
    return labels[field] || field;
}

/**
 * Nome da operação em português (ex.: `Soma`).
 */
export function fieldAggregationName(aggregation: TablePivotAggregation) {
    return pivotAggregations.find(option => option.id === aggregation)?.name ?? aggregation;
}

/**
 * Rótulo curto do tipo do campo exibido na lista de campos.
 */
export function fieldTypeName(schema: PivotSchema, field: string) {
    return pivotFieldTypes[schema[field]] ?? schema[field] ?? "";
}
