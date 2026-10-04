import type { TableProps } from "../@types";
import type { DataTableBaseProps } from "primereact/datatable";

/**
 * Core - `TableClick`
 *
 * Encaminha o duplo clique na linha.
 */
export function tableClick(props: TableProps<any>): Partial<DataTableBaseProps<any[]>> {
    return { onRowDoubleClick: props.onDoubleClick };
}
