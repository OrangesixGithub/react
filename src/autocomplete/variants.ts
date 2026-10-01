import { tv } from "tailwind-variants";

/** Estilos do campo e das sugestões do autocomplete unstyled. */
export const autocompleteVariants = tv({
    slots: {
        root: "relative inline-flex w-full min-w-0",
        input: "os-field os-input box-border w-full min-w-0",
        panel: "absolute z-50 min-w-full overflow-hidden rounded-lg border border-autocomplete-border " +
            "bg-autocomplete-panel-background text-autocomplete-text shadow-lg",
        list: "m-0 max-h-60 list-none overflow-y-auto p-1 scrollbar-themed",
        item: "os-list-item os-autocomplete-item",
        emptyMessage: "px-3 py-2 text-sm text-input-placeholder",
        loadingIcon: "pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 animate-spin text-input-placeholder",
    },
    variants: {
        invalid: {
            true: { input: "os-field-invalid" }
        },
    },
});
