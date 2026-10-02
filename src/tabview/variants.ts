import { tv } from "tailwind-variants";

/** Estilos Tailwind do TabView unstyled e de suas abas. */
export const tabviewVariants = tv({
    slots: {
        root: "flex w-full min-w-0 flex-col text-tabview-text",
        navContainer: "relative flex items-stretch",
        navContent: "min-w-0 flex-1 overflow-x-auto overflow-y-hidden scrollbar-themed",
        nav: "relative m-0 flex w-max min-w-full list-none border-b border-tabview-border p-0",
        inkbar: "hidden",
        header: "-mb-px flex shrink-0",
        headerAction: "flex cursor-pointer items-center gap-2 whitespace-nowrap rounded-t-lg border border-transparent " +
            "px-3 py-2 text-tabview-header-text no-underline outline-none transition-colors " +
            "hover:bg-tabview-header-hover hover:text-tabview-text " +
            "aria-selected:border-tabview-border " +
            "aria-selected:bg-tabview-selected-background aria-selected:text-tabview-selected-text " +
            "focus-visible:ring-3    focus-visible:ring-inset focus-visible:ring-tabview-focus-ring " +
            "aria-disabled:pointer-events-none aria-disabled:cursor-not-allowed aria-disabled:text-tabview-disabled-text " +
            "aria-disabled:opacity-60",
        headerTitle: "min-w-0 text-base",
        closeIcon: "ml-1 size-2.5 shrink-0 cursor-pointer rounded text-tabview-icon outline-none hover:text-tabview-text " +
            "focus-visible:ring-2 focus-visible:ring-tabview-focus-ring",
        panelContainer: "min-w-0 rounded-b-lg border border-t-0 border-tabview-border bg-tabview-panel-background p-3",
        content: "text-base",
    },
    variants: {
        hidden: {
            true: { content: "hidden" },
        },
    },
});
