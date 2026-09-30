import { tv } from "tailwind-variants";

/** Estilos do campo e das sugestões do autocomplete unstyled. */
export const autocompleteVariants = tv({
    slots: {
        root: "relative inline-flex w-full min-w-0",
        input: "box-border w-full min-w-0 rounded-lg border border-input-border bg-input-background px-3 py-2 " +
            "font-[inherit] text-input-text outline-none transition-colors placeholder:text-input-placeholder " +
            "focus:border-input-focus-border focus:ring-3 focus:ring-input-focus-ring " +
            "read-only:bg-input-readonly-background disabled:cursor-not-allowed " +
            "disabled:bg-input-disabled-background disabled:text-input-disabled-text",
        panel: "absolute z-50 min-w-full overflow-hidden rounded-lg border border-autocomplete-border " +
            "bg-autocomplete-panel-background text-autocomplete-text shadow-lg",
        list: "m-0 max-h-60 list-none overflow-y-auto p-1 [scrollbar-width:thin]",
        item: "cursor-pointer rounded-md px-3 py-2 text-sm outline-none hover:bg-autocomplete-item-hover " +
            "aria-selected:bg-autocomplete-item-selected aria-selected:text-autocomplete-item-selected-text " +
            "data-[p-focused=true]:bg-autocomplete-item-hover",
        emptyMessage: "px-3 py-2 text-sm text-input-placeholder",
        loadingIcon: "pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 animate-spin text-input-placeholder",
    },
    variants: {
        invalid: {
            true: { input: "border-input-invalid-border focus:border-input-invalid-border focus:ring-input-invalid-ring" }
        },
    },
});
