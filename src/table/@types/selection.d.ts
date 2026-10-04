import type { DataTableSelectEvent, DataTableUnselectEvent } from "primereact/datatable";

export interface TableSelectionProps {
    /**
     * Objeto selecionando dentro da tabela
     */
    selection?: any

    /**
     * Define qual tipo de seleção
     */
    selectionMode?: "single" | "checkbox"

    /**
     * Realiza a seleção do element
     */
    onSelection?(value: any): void

    /** Evento original do PrimeReact ao selecionar uma linha. Contém originalEvent, data e type. */
    onRowSelect?(event: DataTableSelectEvent): void

    /** Evento original do PrimeReact ao desmarcar uma linha. Contém originalEvent, data e type. */
    onRowUnselect?(event: DataTableUnselectEvent): void
}
