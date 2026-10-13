import { tv } from "tailwind-variants";

/** Estilos da lista de campos (zonas Filtros, Colunas, Linhas e Valores). */
export const tablePivotFieldListVariants = tv({
    slots: {
        backdrop: "fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4",
        panel: [
            "relative flex max-h-full w-full max-w-4xl flex-col overflow-hidden rounded-lg border shadow-2xl",
            "border-pivot-border bg-pivot-background text-pivot-text",
            "os-modal-enter-active",
        ],
        header: "flex items-center justify-between gap-3 border-b border-pivot-border px-4 py-3",
        title: "m-0 text-base font-semibold",
        hint: "m-0 text-xs text-pivot-label",
        close: [
            "os-button os-button-focus inline-flex size-8 items-center justify-center rounded-md",
            "text-pivot-label hover:bg-pivot-chip-hover hover:text-pivot-text",
        ],
        body: [
            "scrollbar-themed grid min-h-0 flex-1 grid-cols-1 gap-3 overflow-auto p-4",
            "md:grid-cols-[minmax(0,15rem)_minmax(0,1fr)_minmax(0,1fr)]",
            "md:grid-rows-[minmax(10rem,1fr)_minmax(10rem,1fr)]",
        ],
        fields: "md:row-span-2",
        box: "flex min-h-40 flex-col overflow-hidden rounded-md border border-pivot-border transition-colors",
        boxHeader: [
            "flex items-center gap-2 border-b px-3 py-2 text-sm font-medium",
            "border-pivot-border bg-pivot-header-background",
        ],
        boxIcon: "text-pivot-label",
        boxBody: "scrollbar-themed flex min-h-0 flex-1 flex-col overflow-auto p-1",
        search: "os-field os-input m-2 mb-1 h-8 w-auto px-2.5 font-[inherit] text-sm",
        item: "group flex min-h-8 items-center gap-2 rounded px-2 py-1 text-sm hover:bg-pivot-chip-hover",
        handle: "bi bi-grip-vertical cursor-grab text-pivot-label opacity-60 group-hover:opacity-100",
        name: "min-w-0 flex-1 truncate",
        type: "text-[10px] uppercase text-pivot-label",
        action: [
            "os-button os-button-focus inline-flex size-6 shrink-0 items-center justify-center rounded",
            "text-pivot-label hover:bg-pivot-background hover:text-pivot-text",
        ],
        checkbox: "os-checkbox size-4",
        aggregation: [
            "os-field os-select field-sizing-content h-7 w-auto shrink-0 appearance-none",
            "py-0 pl-2 pr-6 font-[inherit] text-xs dark:scheme-dark",
        ],
        move: "absolute inset-0 cursor-pointer opacity-0 dark:scheme-dark",
        select: "relative inline-flex shrink-0",
        selectIcon: [
            "bi bi-chevron-down pointer-events-none absolute right-2 top-1/2 -translate-y-1/2",
            "text-[10px] leading-none text-select-icon",
        ],
        option: "bg-select-option-background text-select-text",
        placeholder: "m-auto px-3 py-4 text-center text-xs text-pivot-label",
        footer: "flex flex-wrap items-center justify-between gap-3 border-t border-pivot-border px-4 py-3",
        defer: "flex cursor-pointer items-center gap-2 text-sm",
        buttons: "flex gap-2",
    },
    variants: {
        dropping: {
            true: { box: "border-pivot-active bg-pivot-drop" },
        },
        dragging: {
            true: { item: "opacity-40" },
        },
        checked: {
            true: { checkbox: "os-checkbox-checked" },
        },
        active: {
            true: { action: "text-pivot-active" },
        },
    },
});
