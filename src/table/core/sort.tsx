import type { TableProps } from "../@types";
import type { DataTableBaseProps } from "primereact/datatable";

/**
 * Core - `TableSort`
 *
 * Adapta ordenação simples ou múltipla, local ou controlada pelo consumidor.
 */
export function tableSort(props: TableProps<any>): Partial<DataTableBaseProps<any[]>> {
    const multiple = props.sortMode === "multiple";
    const controlled = props.lazy !== undefined || (multiple && props.onMultiSort !== undefined);
    return {
        sortMode: props.sortMode ?? "single",
        sortField: props.lazy?.sortField,
        sortOrder: props.lazy?.sortOrder,
        multiSortMeta: props.lazy?.multiSortMeta ?? props.multiSortMeta,
        onSort: controlled ? event => {
            if (multiple) {
                props.onMultiSort?.(event.multiSortMeta ?? []);
            } else {
                props.onSort?.(event.sortField, event.sortOrder);
            }
        } : undefined,
    };
}
