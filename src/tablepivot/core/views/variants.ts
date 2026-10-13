import { tv } from "tailwind-variants";

/** Estilos do painel de visões salvas, com cores do tema e rolagem do sistema. */
export const tablePivotViewsVariants = tv({
    slots: {
        backdrop: "fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4",
        panel: [
            "os-modal-enter-active flex max-h-full w-full max-w-lg flex-col overflow-hidden rounded-lg border shadow-2xl",
            "border-pivot-border bg-pivot-background text-pivot-text",
        ],
        header: "flex items-center justify-between gap-2 border-b border-pivot-border px-3 py-2",
        title: "m-0 text-base font-semibold",
        close: [
            "os-button os-button-focus inline-flex size-8 shrink-0 items-center justify-center rounded-md",
            "text-pivot-label hover:bg-pivot-chip-hover hover:text-pivot-text",
        ],
        form: "flex items-end gap-2 border-b border-pivot-border p-3",
        label: "flex min-w-0 flex-1 flex-col gap-1 text-xs text-pivot-label",
        input: "os-field os-input h-8 w-full px-2 py-1 text-sm",
        body: "scrollbar-themed min-h-0 flex-1 overflow-auto p-2",
        item: "group flex items-center gap-2 rounded-md px-2 py-2 hover:bg-pivot-chip-hover",
        apply: "os-button os-button-focus flex min-w-0 flex-1 flex-col items-start rounded text-left",
        name: "max-w-full truncate text-sm font-medium",
        summary: "max-w-full truncate text-xs text-pivot-label",
        empty: "m-0 py-6 text-center text-sm text-pivot-label",
        error: "m-0 px-3 pt-2 text-xs text-red-600 dark:text-red-400",
        footer: "flex flex-wrap items-center justify-between gap-2 border-t border-pivot-border px-3 py-2",
        hint: "m-0 text-xs text-pivot-label",
    },
});
