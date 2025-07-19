import { TableProps } from "..";
import { DataTableBaseProps } from "primereact/datatable";

/**
 * Componente - `Table`
 *
 * Define as configurações do modo principal da tabela.
 */
export function tableCore(
    props: TableProps<any>
): Partial<DataTableBaseProps<any>> {

    const cellRender = (isRender?: boolean) => {
        return isRender === undefined ? {} : {
            cellMemo: props.cellRender ?? undefined
        };
    };

    return {
        dataKey: "id",
        value: props.data as any,
        lazy: props.lazy !== undefined,
        resizableColumns: props.styleResizable ?? false,
        columnResizeMode: "expand",
        emptyMessage: props.emptyMessage ?? "Não há informações disponíveis no momento.",
        header: props.templeteHeader,
        footer: props.templateFooter,
        stripedRows: props.styleStriped,
        size: props.styleSize,
        showGridlines: props.styleType === "bordered",
        ...cellRender(props.cellRender)
    };
}