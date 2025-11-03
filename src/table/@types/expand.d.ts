import * as React from "react";
import {
    DataTableRowData,
    DataTableRowEvent,
    DataTableValueArray,
    DataTableExpandedRows,
    DataTableRowToggleEvent,
    DataTableRowExpansionTemplate,
} from "primereact/datatable";

export interface TableExpandProps {
    /**
     * Define o state de expansão da tabela
     */
    rowExpandable?: DataTableValueArray | DataTableExpandedRows

    /**
     * Define qual indice do objeto Data que sera expandido
     */
    rowExpandableAttr?: string

    /**
     * Função que define o template de expansão
     */
    rowExpansionTemplate?(data: DataTableRowData<any>, options: DataTableRowExpansionTemplate): React.ReactNode

    /**
     * Função para atualizar o state de expansão
     */
    onRowExpandable?: (data: DataTableRowToggleEvent<any>) => void

    /**
     * Função é executada com quando a linha e expandida
     */
    onRowExpand?(event: DataTableRowEvent): void

    /**
     * Função é executada quando a linha e recolhida
     */
    onRowCollapse?(event: DataTableRowEvent): void;
}