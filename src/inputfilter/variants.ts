import { tv } from "tailwind-variants";

const control = "os-field os-input box-border h-10 min-w-0 font-[inherit]";

const invalid = "os-field-invalid";

/** Estilos Tailwind do filtro: seletor de operador, campos de texto, número, data e autocomplete. */
export const inputfilterVariants = tv({
    slots: {
        container: "min-w-0 max-w-full",
        content: "flex w-full min-w-0 items-start gap-2 max-sm:flex-col",
        selectWrapper: "group relative w-44 shrink-0 max-sm:w-full",
        select: "os-field os-select os-inputfilter-select block box-border h-10 min-w-0 w-full appearance-none pr-10 font-[inherit]",
        selectIcon: "pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm leading-none text-select-icon " +
            "transition-colors group-focus-within:text-select-focus-border",
        selectOption: "bg-select-option-background text-select-text",
        field: "w-full flex-1 " + control,
        dates: "flex w-full min-w-0 flex-col gap-2",
        dateRow: "flex w-full min-w-0 gap-2",
        dateField: "flex-1 " + control,
        autocomplete: "relative inline-flex w-full min-w-0 flex-1",
        autocompleteContainer: "os-field os-field-group os-input m-0 flex min-h-10 w-full min-w-0 list-none flex-wrap items-center gap-1 px-2 py-1",
        autocompleteToken: "inline-flex items-center gap-1 rounded-md bg-autocomplete-item-selected px-2 py-0.5 text-sm " +
            "text-autocomplete-item-selected-text",
        autocompleteRemove: "os-button font-normal text-xs leading-none opacity-70 hover:opacity-100 focus-visible:ring-offset-0 focus-visible:ring-input-focus-ring",
        autocompleteInputToken: "m-0 min-w-24 flex-1 list-none p-0",
        autocompleteInput: "box-border w-full min-w-0 border-0 bg-transparent p-1 font-[inherit] text-input-text outline-none " +
            "placeholder:text-input-placeholder disabled:cursor-not-allowed",
        panel: "absolute z-50 min-w-full overflow-hidden rounded-lg border border-autocomplete-border " +
            "bg-autocomplete-panel-background text-autocomplete-text shadow-lg",
        list: "m-0 max-h-60 list-none overflow-y-auto p-1 scrollbar-themed",
        item: "os-list-item os-autocomplete-item",
        emptyMessage: "px-3 py-2 text-sm text-input-placeholder",
        loadingIcon: "pointer-events-none animate-spin text-input-placeholder",
    },
    variants: {
        invalid: {
            true: {
                select: "os-field-invalid",
                field: invalid,
                dateField: invalid,
                autocompleteContainer: invalid,
            },
        },
    },
});
