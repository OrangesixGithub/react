import { tv } from "tailwind-variants";

/** Estilos do filtro de membros de um campo (cartão compacto sobre a lista de campos). */
export const tablePivotMembersVariants = tv({
    slots: {
        root: [
            "flex max-h-full w-full max-w-xs flex-col overflow-hidden rounded-lg border shadow-xl",
            "border-pivot-border bg-pivot-background text-pivot-text",
            "os-modal-enter-active",
        ],
        backdrop: "absolute inset-0 z-10 flex items-center justify-center bg-black/10 p-4",
        action: [
            "os-button os-button-focus inline-flex size-6 shrink-0 items-center justify-center rounded",
            "text-pivot-label hover:bg-pivot-background hover:text-pivot-text",
        ],
        search: "os-field os-input m-2 mb-1 h-8 w-auto px-2.5 font-[inherit] text-sm",
        placeholder: "m-auto px-3 py-4 text-center text-xs text-pivot-label",
        checkbox: "os-checkbox size-4",
        name: "min-w-0 flex-1 truncate",
        header: "flex items-center justify-between gap-2 border-b border-pivot-border py-2 pl-3 pr-2 text-sm font-medium",
        list: "scrollbar-themed max-h-64 min-h-0 flex-1 overflow-auto p-1",
        item: "flex cursor-pointer items-center gap-2 rounded px-2 py-1 text-sm hover:bg-pivot-chip-hover",
        footer: [
            "flex items-center justify-between gap-2 border-t px-3 py-2 text-xs",
            "border-pivot-border text-pivot-label",
        ],
    },
    variants: {
        checked: {
            true: { checkbox: "os-checkbox-checked" },
        },
    },
});
