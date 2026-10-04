import { tv } from "tailwind-variants";

/** Estilos da tabela unstyled, incluindo células e controles internos. */
export const tableVariants = tv({
    slots: {
        root: "os-table relative w-full min-w-0 text-table-text",
        wrapper: "relative w-full overflow-auto scrollbar-themed",
        table: "w-full border-collapse border-spacing-0 text-sm",
        section: "border-b border-table-border bg-table-header-background px-4 py-3",
        row: "bg-table-background aria-selected:bg-table-selected aria-selected:text-table-selected-text focus-visible:not-aria-selected:bg-table-focus-background focus-visible:outline-2 focus-visible:outline-table-focus-ring",
        headerCell: "p-[var(--os-table-cell-padding)] relative border-b border-table-border bg-table-header-background text-table-header-text text-[11px] leading-4 uppercase tracking-wide font-semibold outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-table-focus-ring",
        bodyCell: "p-[var(--os-table-cell-padding)] border-b border-table-border",
        footerCell: "p-[var(--os-table-cell-padding)] border-t border-table-border bg-table-footer-background text-table-text-strong font-semibold",
        headerContent: "flex items-center gap-2",
        icon: "inline-block h-3.5 w-3.5 shrink-0 text-sm leading-none",
        sortBadge: "inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-primary-500/10 px-1 text-[10px] leading-none text-primary-500",
        control: "os-button os-button-focus h-8 w-8 shrink-0 rounded-md border-0 bg-transparent text-table-text hover:bg-table-hover disabled:cursor-default disabled:opacity-40",
        resizer: "absolute right-0 top-0 z-10 h-full w-2 cursor-col-resize",
        resizeHelper: "absolute z-20 hidden w-px bg-primary-500",
        reorderIndicator: "absolute z-20 hidden text-table-selected-text",
        reorderIcon: "inline-block cursor-move text-sm",
        group: "bg-table-header-background text-table-header-text font-semibold",
        expansion: "bg-table-background",
        empty: "bg-table-background text-table-text",
        paginator: "flex flex-wrap items-center gap-1 border-t border-table-border bg-table-background p-3",
        pages: "flex items-center gap-1",
        pageButton: "os-button os-button-focus h-8 min-w-8 rounded-lg border-0 bg-transparent px-1.5 text-xs font-medium text-table-text hover:bg-table-hover aria-[current=true]:bg-primary-500 aria-[current=true]:text-white disabled:cursor-default disabled:opacity-40",
        pageNavigation: "os-button os-button-focus h-8 rounded-lg border border-table-border bg-transparent px-2.5 text-xs font-medium text-table-text hover:bg-table-hover disabled:cursor-default disabled:opacity-40",
        pageSelect: "os-field os-input rounded-lg px-2 py-1 text-sm",
        pageReport: "ml-2 text-sm",
        pageSide: "flex items-center gap-2",
        checkboxRoot: "relative inline-flex h-4 w-4 shrink-0 align-middle",
        checkboxInput: "os-checkbox m-0 h-4 w-4",
    },
    variants: {
        size: {
            small: {
                root: "[--os-table-cell-padding:0.375rem]"
            },
            normal: {
                root: "[--os-table-cell-padding:0.625rem]"
            },
            large: {
                root: "[--os-table-cell-padding:0.875rem]"
            },
        },
        bordered: {
            true: {
                root: "os-table-bordered",
                paginator: "border-t-0",
            },
        },
        striped: { true: { row: "even:bg-table-striped" } },
        selectable: { true: { row: "cursor-pointer hover:bg-table-hover" } },
        sorted: { true: { icon: "text-primary-500" } },
        selectionColumn: { true: { headerContent: "gap-0" } },
        groupToggle: { true: { control: "mr-2 align-middle" } },
        align: {
            left: {
                headerCell: "text-left",
                bodyCell: "text-left",
                footerCell: "text-left",
                headerContent: "justify-start"
            },
            center: {
                headerCell: "text-center",
                bodyCell: "text-center",
                footerCell: "text-center",
                headerContent: "justify-center"
            },
            right: {
                headerCell: "text-right",
                bodyCell: "text-right",
                footerCell: "text-right",
                headerContent: "justify-end"
            },
        },
        paginatorAlign: {
            start: { paginator: "justify-start" },
            center: { paginator: "justify-center" },
            end: { paginator: "justify-end" },
        },
    },
    defaultVariants: {
        size: "normal",
        align: "left",
        paginatorAlign: "center"
    },
});
