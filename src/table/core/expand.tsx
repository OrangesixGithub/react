import type { TableProps } from "../@types";
import type { DataTableBaseProps } from "primereact/datatable";

/**
 * Core - `TableExpand`
 *
 * Expansão controlada de linhas e de grupos em subheader.
 */
export function tableExpand(props: TableProps<any>): Partial<DataTableBaseProps<any[]>> {
    return {
        expandedRows: props.rowExpandable,
        expandableRowGroups: props.rowExpandable !== undefined && props.rowGroup !== undefined && props.rowGroupMode === "subheader",
        rowExpansionTemplate: props.rowExpansionTemplate,
        onRowToggle: props.onRowExpandable,
        onRowExpand: props.onRowExpand,
        onRowCollapse: props.onRowCollapse,
    };
}
