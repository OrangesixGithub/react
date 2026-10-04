import type * as React from "react";
import type {
    DataTableRowEvent,
    DataTableValueArray,
    DataTableExpandedRows,
    DataTableRowToggleEvent,
    DataTableRowExpansionTemplate,
} from "primereact/datatable";

export interface TableExpandProps<T = any> {
    /**
     * Estado de expansão: lista de registros ou mapa de chaves para linhas.
     * Em grupos subheader, use uma lista; mapa só quando dataKey for igual a rowGroup.
     */
    rowExpandable?: DataTableValueArray | DataTableExpandedRows

    /**
     * Define qual indice do objeto Data que sera expandido
     */
    rowExpandableAttr?: string

    /**
     * Função que define o template de expansão
     */
    rowExpansionTemplate?(data: T, options: DataTableRowExpansionTemplate): React.ReactNode

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
