import React from "react";
import { Box } from "../box";
import { tableStyle } from "./styled";
import { tableCore } from "./core/core";
import { tableSort } from "./core/sort";
import { tableClick } from "./core/click";
import { tableGroup } from "./core/group";
import { tableVariants } from "./variants";
import type { TableProps } from "./@types";
import { Column } from "primereact/column";
import { tableExpand } from "./core/expand";
import { tableReorder } from "./core/reorder";
import { ObjectUtils } from "primereact/utils";
import { DataTable } from "primereact/datatable";
import { tableSelection } from "./core/selection";
import { tablePagination } from "./core/pagination";

/**
 * Componente - `Table`
 *
 * Tabela de dados PrimeReact unstyled com seleção, edição, expansão e paginação.
 * Preserva a API pública da Orange Six 2.x.
 */
export function Table<T = any>(props: TableProps<T>) {
    const styles = tableVariants();
    const iconPrefix = props.iconPrefix ?? "bi bi-";
    const icon = (bootstrap: string, prime: string) => iconPrefix + (iconPrefix === "pi pi-" ? prime : bootstrap);
    const grouped = props.rowGroup !== undefined && props.rowGroupMode === "subheader";

    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return (
        <Box
            className="p-0"
            size={props.size ?? "100"}>
            <DataTable<any[]>
                unstyled
                collapsedRowIcon={icon("chevron-right", "chevron-right")}
                editMode={props.edit ? "cell" : undefined}
                expandedRowIcon={icon("chevron-down", "chevron-down")}
                pt={tableStyle(props)}
                tableClassName={props.className}
                {...tableCore(props)}
                {...tableGroup(props)}
                {...tableSort(props)}
                {...tableClick(props)}
                {...tableExpand(props)}
                {...tableReorder(props)}
                {...tableSelection(props)}
                {...tablePagination(props)}>
                {props.rowExpandable !== undefined && !grouped && (
                    <Column
                        align="center"
                        columnKey="key-fixed-expand"
                        expander={data => props.rowExpandableAttr === undefined || ObjectUtils.resolveFieldData(data, props.rowExpandableAttr) !== undefined}
                        field="key-fixed-expand"
                        headerStyle={{ width: "2.5rem" }}
                        key="key-fixed-expand"
                        reorderable={false}/>)}
                {(props.reorder === "all" || props.reorder === "rows") && (
                    <Column
                        rowReorder
                        rowReorderIcon={<span
                            aria-hidden="true"
                            className={styles.reorderIcon({ class: icon("grip-vertical", "bars") })}
                            data-pc-section="rowreordericon"/>}
                        align="center"
                        columnKey="key-fixed-reorder"
                        field="key-fixed-reorder"
                        headerStyle={{ width: "2.5rem" }}
                        key="key-fixed-reorder"
                        reorderable={false}/>)}
                {props.selectionMode === "checkbox" && (
                    <Column
                        align="center"
                        columnKey="key-fixed-select"
                        field="key-fixed-select"
                        headerStyle={{ width: "2.5rem" }}
                        key="key-fixed-select"
                        reorderable={false}
                        selectionMode="multiple"/>)}
                {props.column.map(column => (
                    <Column
                        align={column.align}
                        alignFrozen={column.frozen ? "right" : undefined}
                        alignHeader={column.alignHeader ?? column.align}
                        body={column.body}
                        bodyClassName={column.className}
                        columnKey={column.id}
                        editor={props.edit ? column.editor : undefined}
                        field={column.id}
                        footer={column.footer}
                        footerClassName={column.className}
                        frozen={column.frozen === true}
                        header={column.header}
                        headerClassName={column.className}
                        key={column.id}
                        sortable={column.sort ?? false}
                        style={column.style}
                        onCellEditComplete={column.onEditorComplete}/>
                ))}
            </DataTable>
        </Box>
    );
}

Table.displayName = "Table";
