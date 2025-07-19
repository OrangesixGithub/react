import { TableProps } from "..";
import { DataTableProps, DataTableRowClickEvent, DataTableSelectionSingleChangeEvent } from "primereact/datatable";

/**
 * Componente - `Table`
 *
 * Define as configurações do modo de seleção de dados.
 */
export function tableClick(
    props: TableProps<any>
): Partial<DataTableProps<any>> {

    function onDoubleClick(e: DataTableRowClickEvent) {
        if (props.onDoubleClick) {
            props.onDoubleClick(e);
        }
    }

    return {
        onRowDoubleClick: onDoubleClick
    };
}