import { TableProps } from "..";
import { DataTableBaseProps } from "primereact/datatable";

/**
 * Componente - `Table`
 *
 * Define as configurações de expansão da tabela.
 */
export function tableExpand(
    props: TableProps<any>,
): Partial<DataTableBaseProps<any>> {
    return {
        expandedRows: props.rowExpandable,
        expandableRowGroups: props.rowExpandable !== undefined && props.rowGroup !== undefined,
        rowExpansionTemplate: props.rowExpansionTemplate,
        onRowToggle: props.onRowExpandable,
        onRowExpand: props.onRowExpand,
        onRowCollapse: props.onRowCollapse,
    };
}