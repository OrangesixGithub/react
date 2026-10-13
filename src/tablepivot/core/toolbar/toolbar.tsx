import React from "react";
import { useToolbar } from "./hooks/useToolbar";
import { tablePivotToolbarVariants } from "./variants";
import type { TablePivotToolbarProps } from "./@types";

/**
 * Core - `TablePivotToolbar`
 *
 * Barra do TablePivot: resumo de filtros, colunas, linhas e valores (abre a lista de campos) e as ações principais.
 */
export function TablePivotToolbar(props: TablePivotToolbarProps) {

    const styles = tablePivotToolbarVariants();
    const {
        summaryRef, actionsRef, wrapped, group, action, filters, columns, rows, values, expandHint, collapseHint,
    } = useToolbar(props);
    
    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return (
        <div className={styles.root()}>
            {props.title && <span className={styles.title()}>{props.title}</span>}
            <div
                className={styles.summary()}
                ref={summaryRef}
                onClick={props.onFields}>
                {group("Filtros", "bi bi-funnel", filters)}
                {group("Colunas", "bi bi-layout-three-columns", columns)}
                {group("Linhas", "bi bi-list-nested", rows)}
                {group("Valores", "bi bi-calculator", values)}
            </div>
            <div
                className={styles.actions({ wrapped })}
                ref={actionsRef}>
                {action("Campos", "sliders", props.onFields, "primary")}
                {action(props.viewsCount > 0 ? `Visões salvas (${props.viewsCount})` : "Visões salvas", props.viewsCount > 0 ? "bookmarks-fill" : "bookmarks", props.onViews)}
                {action("Expandir tudo", "arrows-expand", props.onExpand, "secondary", expandHint)}
                {action("Recolher tudo", "arrows-collapse", props.onCollapse, "secondary", collapseHint)}
                {action("Formatação condicional", "palette", props.onFormatting, props.formattingActive ? "primary" : "secondary", undefined, props.formattingActive)}
                {action(props.copied ? "Tabela copiada" : "Copiar tabela", props.copied ? "clipboard-check" : "clipboard", props.onCopy)}
                {action("Exportar CSV", "filetype-csv", props.onExport)}
                {action("Exportar Excel (.xlsx)", "file-earmark-excel", props.onExportExcel)}
                {action("Tela cheia", "arrows-fullscreen", props.onFullscreen)}
            </div>
        </div>
    );
}

TablePivotToolbar.displayName = "TablePivotToolbar";
