import { TableProps } from "..";
import { DataTableProps, DataTableRowReorderEvent } from "primereact/datatable";

/**
 * Componente - `Table`
 *
 * Define as configurações do modo de ordenação colunas e tabelas.
 */
export function tableReorder(
    props: TableProps<any>
): Partial<DataTableProps<any>> {

    function onReorder(e: DataTableRowReorderEvent<any>) {
        if (props.onReorder) {
            let attr = props.reorderRowsAttr ?? "order";
            let data: any = [...e.value];

            data.forEach((item: any, index: number) => {
                item[attr] = index + 1;
            });

            return props.onReorder(data);
        }
    }

    return {
        reorderableColumns: props.reorder === "all" || props.reorder === "columns",
        reorderableRows: props.reorder === "all" || props.reorder === "rows",
        onRowReorder: onReorder
    };
}
