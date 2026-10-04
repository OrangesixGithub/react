import type { TableProps } from "../@types";
import type { DataTableProps } from "primereact/datatable";

/**
 * Core - `TableSelection`
 *
 * Mantém os eventos de seleção simples e por checkbox tipados pela API do PrimeReact.
 */
export function tableSelection(props: TableProps<any>): DataTableProps<any[]> {
    const events = {
        onRowSelect: props.onRowSelect,
        onRowUnselect: props.onRowUnselect,
    };
    if (props.onSelection === undefined) {
        return events;
    }
    if (props.selectionMode === "checkbox") {
        return {
            ...events,
            selectionMode: "checkbox",
            selection: props.selection ?? [],
            metaKeySelection: false,
            onSelectionChange: event => props.onSelection?.(event.value),
        };
    }
    return {
        ...events,
        selectionMode: "single",
        selection: props.selection ?? null,
        metaKeySelection: true,
        onSelectionChange: event => props.onSelection?.(event.value),
    };
}
