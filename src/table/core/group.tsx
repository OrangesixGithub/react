import { TableProps } from "..";
import { DataTableBaseProps } from "primereact/datatable";

/**
 * Componente - `Table`
 *
 * Define as configurações de agrupamento da tabela.
 */
export function tableGroup(props: TableProps<any>): Partial<DataTableBaseProps<any>> {
    return {
        groupRowsBy: props.rowGroup,
        rowGroupMode: props.rowGroupMode,
        rowGroupHeaderTemplate: props.rowGroupHeaderTemplate,
        rowGroupFooterTemplate: props.rowGroupFooterTemplate,
    };
}