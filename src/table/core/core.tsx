import type { TableProps } from "../@types";
import type { DataTableBaseProps } from "primereact/datatable";

/**
 * Core - `Table`
 *
 * Configuração dos dados, templates e comportamento visual.
 */
export function tableCore(props: TableProps<any>): Partial<DataTableBaseProps<any[]>> {
    return {
        id: props.id,
        style: props.css,
        dataKey: props.dataKey ?? "id",
        value: props.data,
        lazy: props.lazy !== undefined,
        resizableColumns: props.styleResizable ?? false,
        columnResizeMode: "expand",
        emptyMessage: props.emptyMessage ?? "Não há informações disponíveis no momento.",
        header: props.templeteHeader,
        footer: props.templateFooter,
        stripedRows: props.styleStriped,
        size: props.styleSize,
        showGridlines: props.styleType === "bordered",
        ...(props.cellRender === undefined ? {} : { cellMemo: props.cellRender }),
        scrollable: props.column.some(column => column.frozen === true),
    };
}
