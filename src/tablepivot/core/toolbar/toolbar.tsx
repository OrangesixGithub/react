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
    const { group, action, filters, columns, rows, values, expandHint, collapseHint } = useToolbar(props);
    
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
                onClick={props.onFields}>
                {group("Filtros", "bi bi-funnel", filters)}
                {group("Colunas", "bi bi-layout-three-columns", columns)}
                {group("Linhas", "bi bi-list-nested", rows)}
                {group("Valores", "bi bi-calculator", values)}
            </div>
            <div className={styles.actions()}>
                {action("Campos", "sliders", props.onFields, "primary")}
                {action("Expandir tudo", "arrows-expand", props.onExpand, "secondary", expandHint)}
                {action("Recolher tudo", "arrows-collapse", props.onCollapse, "secondary", collapseHint)}
                {action("Exportar CSV", "download", props.onExport)}
                {action("Tela cheia", "arrows-fullscreen", props.onFullscreen)}
            </div>
        </div>
    );
}

TablePivotToolbar.displayName = "TablePivotToolbar";
