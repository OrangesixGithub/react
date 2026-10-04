import type { TableProps } from "../@types";
import type { DataTableBaseProps } from "primereact/datatable";

/**
 * Core - `TableGroup`
 *
 * Adapta o nome legado rowgroup ao modo rowspan do PrimeReact.
 */
export function tableGroup(props: TableProps<any>): Partial<DataTableBaseProps<any[]>> {
    return {
        groupRowsBy: props.rowGroup,
        rowGroupMode: props.rowGroupMode === "rowgroup" ? "rowspan" : props.rowGroupMode,
        rowGroupHeaderTemplate: props.rowGroupHeaderTemplate,
        rowGroupFooterTemplate: props.rowGroupFooterTemplate,
    };
}
