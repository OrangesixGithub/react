import { Box } from "../box";
import { Loading } from "../loading";
import React, { forwardRef } from "react";
import { tablePivotVariants } from "./variants";
import { TablePivotToolbar } from "./core/toolbar";
import { useTablePivot } from "./hooks/useTablePivot";
import { TablePivotFieldList } from "./core/fieldlist";
import type { TablePivotProps, TablePivotRef } from "./@types";

const styles = tablePivotVariants();

/**
 * Componente - `TablePivot`
 *
 * Tabela dinâmica (pivot) com o motor do Perspective: o usuário distribui os campos entre filtros, colunas,
 * linhas e valores pela lista de campos.
 */
export const TablePivot = forwardRef<TablePivotRef, TablePivotProps>(
    ({ toolbar = true, id = "pivotTable", height = 500, ...props }, ref) => {
        const {
            hostRef, rootRef, client, error, source, layout, expand, fieldList, data, schema,
            expandAll, collapseAll, exportCsv, openFields, closeFields, changeLayout, loadMembers, fullscreen,
        } = useTablePivot(props, id, ref);

        /*
        |------------------------------------------
        | render() - Renderização do componente
        |------------------------------------------
        */
        return (
            <Box
                className={"pivot-table " + (props.className ?? "")}
                css={props.css}
                id={id}
                size={props.size}>
                <div
                    className={styles.root()}
                    ref={rootRef}
                    style={{ height }}>
                    {toolbar && source && layout && (
                        <TablePivotToolbar
                            expandable={layout.rows.length > 1}
                            expanded={expand}
                            labels={props.labels}
                            layout={layout}
                            title={props.title}
                            onCollapse={collapseAll}
                            onExpand={expandAll}
                            onExport={exportCsv}
                            onFields={openFields}
                            onFullscreen={fullscreen}/>
                    )}
                    {fieldList && source && layout && (
                        <TablePivotFieldList
                            labels={props.labels}
                            layout={layout}
                            loadMembers={loadMembers}
                            schema={schema}
                            onApply={changeLayout}
                            onClose={closeFields}/>
                    )}
                    <div
                        className={styles.grid()}
                        ref={hostRef}>
                        {error
                            && <div className={styles.empty()}>Não foi possível carregar o pivot: {error}</div>}
                        {(!error && client && data.length === 0)
                            && <div className={styles.empty()}>Nenhum dado para exibir.</div>}
                        <Loading
                            type="border"
                            visible={!error && data.length > 0 && !source}/>
                    </div>
                </div>
            </Box>
        );
    });

TablePivot.displayName = "TablePivot";
