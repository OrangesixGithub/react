import { TableProps } from "..";
import { DataTableProps, DataTableStateEvent } from "primereact/datatable";

/**
 * Componente - `Table`
 *
 * Define as configurações do modo de ordenação de resultado.
 */
export function tableSort(
    props: TableProps<any>
): Partial<DataTableProps<any>> {

    function onSort(event: DataTableStateEvent) {
        if (props.onSort) {
            props.onSort(event.sortField, event.sortOrder);
        }
    }

    return {
        sortField: props.lazy?.sortField,
        sortOrder: props.lazy?.sortOrder ?? null,
        onSort: props.lazy !== undefined ? onSort : undefined
    };
}