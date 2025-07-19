import React from "react";
import { TableProps } from "..";
import { DataTableBaseProps, DataTableRowToggleEvent } from "primereact/datatable";

/**
 * Componente - `Table`
 *
 * Define as configurações de agrupamento da tabela.
 */
export function tableGroup(
    props: TableProps<any>,
    expandedRows: any,
    setExpandedRows: React.Dispatch<any>
): Partial<DataTableBaseProps<any>> {
    return {
        groupRowsBy: props.rowGroup,
        rowGroupMode: props.rowGroupMode,
        rowGroupHeaderTemplate: props.rowGroupHeaderTemplate,
        rowGroupFooterTemplate: props.rowGroupFooterTemplate,
        expandableRowGroups: props.rowExpandable ?? false,
        expandedRows: expandedRows,
        onRowToggle(event: DataTableRowToggleEvent) {
            setExpandedRows(event.data);
        }
    };
}