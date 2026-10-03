import { tv } from "tailwind-variants";

/** Estilos Tailwind do PickList unstyled, de suas listas e dos botões de transferência. */
export const picklistVariants = tv({
    slots: {
        root: "flex w-full min-w-0 flex-row gap-3 text-base",
        listWrapper: "os-panel os-picklist flex min-w-0 flex-1 flex-col",
        header: "os-panel-header px-3 py-2 font-medium",
        filterContainer: "border-b border-picklist-border p-2 bg-picklist-filter-background",
        filter: "relative",
        filterInput: "os-field os-picklist-filter box-border w-full rounded-md py-1.5 pl-3 pr-8 text-sm",
        filterIcon: "pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-sm leading-none " +
            "text-picklist-placeholder",
        list: "m-0 flex max-h-96 min-h-48 flex-1 list-none flex-col gap-1 overflow-y-auto p-1 outline-none scrollbar-themed",
        item: "os-list-item os-picklist-item select-none",
        itemContent: "flex min-w-0 items-center gap-2",
        itemCheckbox: "os-picklist-checkbox pointer-events-none",
        itemLabel: "m-0 min-w-0 flex-1 truncate",
        buttons: "flex shrink-0 flex-col items-center justify-center gap-2",
        button: "os-button os-button-focus h-8 w-8 rounded-md border border-picklist-border " +
            "bg-picklist-button-background text-picklist-text hover:bg-picklist-item-hover " +
            "focus-visible:ring-picklist-focus-ring",
        buttonIcon: "inline-block text-sm leading-none",
        buttonLabel: "sr-only",
    },
    variants: {
        responsive: {
            true: {
                root: "max-md:flex-col",
                buttons: "max-md:flex-row",
                buttonIcon: "max-md:rotate-90",
            },
        },
        disabled: {
            true: { root: "pointer-events-none opacity-60" }
        },
    },
});
