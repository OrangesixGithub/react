import { tv } from "tailwind-variants";

/** Estilos do painel de formatação condicional, com cores do tema e rolagem do sistema. */
export const tablePivotFormattingVariants = tv({
    slots: {
        backdrop: "fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4",
        panel: [
            "os-modal-enter-active flex max-h-full w-full max-w-2xl flex-col overflow-hidden rounded-lg border shadow-2xl",
            "border-pivot-border bg-pivot-background text-pivot-text",
        ],
        header: "flex items-center justify-between gap-2 border-b border-pivot-border px-3 py-2",
        title: "m-0 text-base font-semibold",
        close: [
            "os-button os-button-focus inline-flex size-8 items-center justify-center rounded-md",
            "text-pivot-label hover:bg-pivot-chip-hover hover:text-pivot-text",
        ],
        body: "scrollbar-themed min-h-0 flex-1 space-y-2 overflow-auto p-3",
        card: "space-y-3 rounded-md border border-pivot-border p-3",
        cardHeader: "flex items-center justify-between gap-2 text-sm font-medium",
        conditions: "grid grid-cols-1 items-end gap-2 sm:grid-cols-3",
        formats: "grid grid-cols-2 items-end gap-2 sm:grid-cols-[1fr_1fr_auto]",
        label: "flex min-w-0 flex-col gap-1 text-xs text-pivot-label",
        input: "os-field os-input h-8 w-full px-2 py-1 text-sm",
        select: "os-field os-select h-8 w-full px-2 py-1 text-sm dark:scheme-dark",
        option: "bg-select-option-background text-select-text",
        checkLabel: "flex items-center gap-1.5 text-xs",
        checkbox: "os-checkbox size-4",
        color: "h-8 w-full cursor-pointer rounded border border-pivot-border bg-pivot-background p-1 disabled:cursor-not-allowed disabled:opacity-40",
        typography: "col-span-2 flex min-w-0 flex-col gap-1 sm:col-span-1",
        preview: "flex min-h-8 min-w-24 items-center justify-center rounded border border-pivot-border px-3 py-1 text-sm",
        toggles: "flex flex-wrap gap-x-3 gap-y-2",
        error: "m-0 text-xs text-red-600 dark:text-red-400",
        empty: "m-0 py-6 text-center text-sm text-pivot-label",
        hint: "m-0 text-xs text-pivot-label",
        footer: "flex flex-wrap items-center justify-between gap-2 border-t border-pivot-border px-3 py-2",
        buttons: "flex gap-2",
    },
    variants: {
        checked: { true: { checkbox: "os-checkbox-checked" } },
        range: { true: { conditions: "sm:grid-cols-4" } },
    },
});
