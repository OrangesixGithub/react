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
            let data: any = e.value;
            let orders = data.map((item: any) => item.order).sort((a: any, b: any) => a - b);
            data.forEach((item: any, index: number) => {
                item.order = orders[index];
            });

            if (e.dragIndex < e.dropIndex) {
                return props.onReorder(data.filter((_: any, index: number) => {
                    return index >= e.dragIndex && index <= e.dropIndex;
                }));
            }

            if (e.dragIndex > e.dropIndex) {
                return props.onReorder(data.filter((_: any, index: number) => {
                    return index >= e.dropIndex && index <= e.dragIndex;
                }));
            }
        }
    }

    return {
        reorderableColumns: props.reorder === "all" || props.reorder === "columns",
        reorderableRows: props.reorder === "all" || props.reorder === "rows",
        onRowReorder: onReorder
    };
}
