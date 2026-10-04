import type { DataTableRowClickEvent } from "primereact/datatable";

export interface TableClickProps {
    /**
     * Aplica o evento de double click
     */
    onDoubleClick?(event: DataTableRowClickEvent): void
}
