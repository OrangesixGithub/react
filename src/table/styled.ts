import { tableVariants } from "./variants";
import type { TableProps } from "./@types";
import { checkboxVariants } from "../checkbox/variants";
import type { CheckboxPassThroughOptions } from "primereact/checkbox";
import type { DataTablePassThroughOptions } from "primereact/datatable";

/** Core - `TableStyle`: classes dos elementos internos do PrimeReact unstyled. */
export function tableStyle(props: TableProps<any>): DataTablePassThroughOptions {
    const styles = tableVariants({
        size: props.styleSize ?? "normal",
        striped: props.styleStriped,
        bordered: props.styleType === "bordered",
        selectable: props.onSelection !== undefined && props.selectionMode !== "checkbox",
        paginatorAlign: props.paginatorAlign ?? "center",
    });
    const checkbox: CheckboxPassThroughOptions = {
        root: { className: styles.checkboxRoot() },
        input: options => ({
            className: checkboxVariants({
                size: "small",
                checked: options?.props?.checked,
                disabled: options?.props?.disabled,
            }).input(),
        }),
        box: { className: "hidden" },
    };
    const pageLink = { className: styles.pageButton() };
    return {
        root: { className: styles.root() },
        wrapper: { className: styles.wrapper() },
        table: { className: styles.table() },
        header: { className: styles.section() },
        footer: { className: styles.section() },
        bodyRow: { className: styles.row() },
        rowExpansion: { className: styles.expansion() },
        rowGroupHeader: { className: styles.group() },
        rowGroupFooter: { className: styles.group() },
        rowGroupToggler: { className: styles.control({ groupToggle: true }) },
        rowGroupTogglerIcon: { className: styles.icon() },
        emptyMessage: { className: styles.empty() },
        resizeHelper: { className: styles.resizeHelper() },
        reorderIndicatorUp: { className: styles.reorderIndicator() },
        reorderIndicatorDown: { className: styles.reorderIndicator() },
        column: {
            headerCell: options => ({
                className: styles.headerCell({
                    align: options?.props?.alignHeader ?? options?.props?.align ?? "left",
                    class: [
                        options?.props?.sortable ? "cursor-pointer select-none hover:bg-table-hover" : "",
                        options?.props?.frozen ? "p-frozen-column" : "",
                        props.styleResizable ? "overflow-hidden whitespace-nowrap" : "",
                    ],
                }),
            }),
            bodyCell: options => ({
                className: styles.bodyCell({
                    align: options?.props?.align ?? "left",
                    class: [
                        options?.props?.frozen ? "p-frozen-column" : "",
                        props.styleResizable ? "overflow-hidden whitespace-nowrap" : "",
                    ],
                }),
            }),
            headerContent: options => ({
                className: styles.headerContent({
                    align: options?.props?.alignHeader ?? options?.props?.align ?? "left",
                    selectionColumn: options?.props?.selectionMode === "multiple",
                }),
            }),
            footerCell: options => ({
                className: styles.footerCell({
                    align: options?.props?.align ?? "left",
                    class: options?.props?.frozen ? "p-frozen-column" : undefined,
                }),
            }),
            columnTitle: { className: "hidden" },
            sortIcon: options => ({
                className: styles.icon({ sorted: options?.context?.sorted ?? false }),
            }),
            sortBadge: { className: styles.sortBadge() },
            rowToggler: { className: styles.control() },
            rowTogglerIcon: { className: styles.icon() },
            rowReorderIcon: { className: styles.reorderIcon() },
            columnResizer: { className: styles.resizer() },
            headerCheckbox: checkbox,
            rowCheckbox: checkbox,
        },
        paginator: {
            root: { className: styles.paginator() },
            pages: { className: styles.pages() },
            pageButton: pageLink,
            firstPageButton: pageLink,
            prevPageButton: pageLink,
            nextPageButton: pageLink,
            lastPageButton: pageLink,
            firstPageIcon: { className: styles.icon() },
            prevPageIcon: { className: styles.icon() },
            nextPageIcon: { className: styles.icon() },
            lastPageIcon: { className: styles.icon() },
            left: { className: styles.pageSide() },
            end: { className: styles.pageSide() },
        },
    };
}

/** @deprecated Use tableStyle. Alias mantido para imports profundos da 2.x. */
export const bootstrapTableStyle = tableStyle;
