import { Box } from "../box";
import { Loading } from "../loading";
import React, { forwardRef } from "react";
import { TablePivotViews } from "./core/views";
import { tablePivotVariants } from "./variants";
import { TablePivotToolbar } from "./core/toolbar";
import { useTablePivot } from "./hooks/useTablePivot";
import { TablePivotFieldList } from "./core/fieldlist";
import { TablePivotFormatting } from "./core/formatting";
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
            formatting, formattingRules, openFormatting, closeFormatting, changeFormatting,
            expandAll, collapseAll, exportCsv, openFields, closeFields, changeLayout, loadMembers, fullscreen,
            copy, copied, exportXlsx,
            views, viewsOpen, viewsError, openViews, closeViews, saveView, applyView, deleteView, resetView,
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
                    style={{ maxHeight: height }}>
                    {toolbar && source && layout && (
                        <TablePivotToolbar
                            copied={copied}
                            expandable={layout.rows.length > 1}
                            expanded={expand}
                            formattingActive={formattingRules.length > 0}
                            labels={props.labels}
                            layout={layout}
                            title={props.title}
                            viewsCount={views.length}
                            onCollapse={collapseAll}
                            onCopy={() => copy().catch(() => undefined)}
                            onExpand={expandAll}
                            onExport={exportCsv}
                            onExportExcel={exportXlsx}
                            onFields={openFields}
                            onFormatting={openFormatting}
                            onFullscreen={fullscreen}
                            onViews={openViews}/>
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
                    {viewsOpen && (
                        <TablePivotViews
                            error={viewsError}
                            labels={props.labels}
                            views={views}
                            onApply={applyView}
                            onClose={closeViews}
                            onDelete={deleteView}
                            onReset={resetView}
                            onSave={saveView}/>
                    )}
                    {formatting && layout && (
                        <TablePivotFormatting
                            labels={props.labels}
                            layout={layout}
                            rules={formattingRules}
                            onApply={changeFormatting}
                            onClose={closeFormatting}/>
                    )}
                    <div
                        className={styles.grid()}
                        ref={hostRef}>
                        {error
                            && <div className={styles.empty()}>Não foi possível carregar o pivot: {error}</div>}
                        {(!error && client && data.length === 0)
                            && <div className={styles.empty()}>Nenhum dado para exibir.</div>}
                        <Loading
                            opacity="0.2"
                            text="Carregando..."
                            type="bars"
                            visible={!error && data.length > 0 && !source}/>
                    </div>
                </div>
            </Box>
        );
    });

TablePivot.displayName = "TablePivot";
