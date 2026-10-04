import type { TableProps } from "../@types";
import type { DataTableBaseProps } from "primereact/datatable";

/**
 * Core - `TableReorder`
 *
 * Reordena os registros sem modificar os objetos recebidos pelo consumidor.
 */
export function tableReorder(props: TableProps<any>): Partial<DataTableBaseProps<any[]>> {
    return {
        reorderableColumns: props.reorder === "all" || props.reorder === "columns",
        reorderableRows: props.reorder === "all" || props.reorder === "rows",
        onRowReorder: event => {
            const attr = props.reorderRowsAttr ?? "order";
            props.onReorder?.(event.value.map((item, index) => ({ ...item, [attr]: index + 1 })));
        },
    };
}
