import { tv } from "tailwind-variants";

const control = "os-field os-input box-border h-10 min-w-0 font-[inherit]";

const invalid = "os-field-invalid";

/** Estilos Tailwind do filtro: seletor de operador, campos de texto, número, data e autocomplete. */
export const inputfilterVariants = tv({
    slots: {
        container: "@container min-w-0 max-w-full",
        content: "flex w-full min-w-0 items-start gap-2 @max-xs:flex-col",
        selectWrapper: "group relative min-w-0 basis-[calc(35%-0.25rem)] grow-0 @max-xs:w-full @max-xs:flex-none",
        select: "os-field os-select os-inputfilter-select block box-border h-10 min-w-0 w-full appearance-none pr-10 font-[inherit]",
        selectIcon: "pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm leading-none text-select-icon " +
            "transition-colors group-focus-within:text-select-focus-border",
        selectOption: "bg-select-option-background text-select-text",
        field: "min-w-0 basis-[calc(65%-0.25rem)] grow-0 @max-xs:w-full @max-xs:flex-none " + control,
        dates: "flex min-w-0 basis-[calc(65%-0.25rem)] grow-0 flex-col gap-2 @max-xs:w-full @max-xs:flex-none",
        dateRow: "flex w-full min-w-0 gap-2",
        dateField: "flex-1 " + control,
        autocomplete: "relative inline-flex min-w-0 basis-[calc(65%-0.25rem)] grow-0 @max-xs:w-full @max-xs:flex-none",
        autocompleteContainer: "os-field os-field-group os-input m-0 flex min-h-10 w-full min-w-0 list-none flex-wrap items-center gap-1 px-2 py-1",
        autocompleteToken: "os-chip",
        autocompleteRemove: "os-button os-chip-remove",
        autocompleteInputToken: "m-0 min-w-24 flex-1 list-none p-0",
        autocompleteInput: "box-border w-full min-w-0 border-0 bg-transparent p-1 font-[inherit] text-input-text outline-none " +
            "placeholder:text-input-placeholder disabled:cursor-not-allowed",
        panel: "absolute z-50 min-w-full overflow-hidden rounded-lg border border-autocomplete-border " +
            "bg-autocomplete-panel-background text-autocomplete-text shadow-lg",
        list: "m-0 max-h-60 list-none overflow-y-auto p-1 scrollbar-themed",
        item: "os-list-item os-autocomplete-item",
        emptyMessage: "px-3 py-2 text-sm text-input-placeholder",
        loadingIcon: "pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 animate-spin text-input-placeholder",
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
