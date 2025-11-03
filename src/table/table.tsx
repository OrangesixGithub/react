import React from "react";
import { Box } from "../box";
import { TableProps } from ".";
import { tableCore } from "./core/core";
import { tableSort } from "./core/sort";
import { tableClick } from "./core/click";
import { tableGroup } from "./core/group";
import { Column } from "primereact/column";
import { tableExpand } from "./core/expand";
import { tableReorder } from "./core/reorder";
import { bootstrapTableStyle } from "./styled";
import { DataTable } from "primereact/datatable";
import { tableSelection } from "./core/selection";
import { tablePagination } from "./core/pagination";

/**
 * Componente - `Table`
 *
 * Um componente versátil que pode ser utilizado para criar tabela de dados.
 * Permite personalizar o estilo e o conteúdo através de propriedades.
 */
export function Table<T = any>(props: TableProps<T>) {
    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return (
        <Box className="p-0"
             size={props.size ?? "100"}>
            {/*@ts-ignore*/}
            <DataTable<any>
                editMode={props.edit ? "cell" : undefined}
                pt={{ ...bootstrapTableStyle(props) }}
                tableClassName={props.className}
                {...tableCore(props)}
                {...tableGroup(props)}
                {...tableSort(props)}
                {...tableClick(props)}
                {...tableExpand(props)}
                {...tableReorder(props)}
                {...tableSelection(props)}
                {...tablePagination(props)}>
                {props.rowExpandable !== undefined && (
                    <Column align="center"
                            columnKey="key-fixed-expand"
                            expander={data => data[props.rowExpandableAttr ?? ""] !== undefined}
                            field="key-fixed-expand"
                            headerStyle={{ width: "2.5rem" }}
                            key="key-fixed-expand"/>)}
                {(props.reorder === "all" || props.reorder === "rows") && (
                    <Column rowReorder
                            align="center"
                            columnKey="key-fixed-reorder"
                            field="key-fixed-reorder"
                            headerStyle={{ width: "2.5rem" }}
                            key="key-fixed-reorder"/>)}
                {props.selectionMode === "checkbox"
                    && <Column align="center"
                               columnKey="key-fixed-select"
                               field="key-fixed-select"
                               headerStyle={{ width: "2.5rem" }}
                               key="key-fixed-select"
                               selectionMode="multiple"/>}
                {props.column.map(obj => {
                    return (
                        <Column align={obj.align}
                                alignFrozen={obj.frozen ? "right" : undefined}
                                alignHeader={obj.alignHeader}
                                body={obj.body}
                                columnKey={obj.id}
                                editor={obj.editor}
                                field={obj.id}
                                frozen={obj.frozen !== undefined}
                                header={obj.header}
                                key={obj.id}
                                sortable={obj.sort ?? false}
                                style={obj.style}
                                onCellEditComplete={obj.onEditorComplete}/>
                    );
                })}
            </DataTable>
        </Box>
    );
}

Table.displayName = "Table";