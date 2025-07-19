import { TableProps } from "..";
import { DataTableProps, DataTableSelectionSingleChangeEvent } from "primereact/datatable";

/**
 * Componente - `Table`
 *
 * Define as configurações do modo de seleção de dados.
 */
export function tableSelection(
    props: TableProps<any>
): Partial<DataTableProps<any>> {

    function onSelect(e: DataTableSelectionSingleChangeEvent<any>) {
        if (props.onSelection) {
            props.onSelection(e.value);
        }
    }

    return {
        metaKeySelection: props.onSelection !== undefined,
        selection: props.selection,
        selectionMode: props.onSelection !== undefined ? (props.selectionMode as any ?? "single") : undefined,
        onSelectionChange: onSelect,
    };
}