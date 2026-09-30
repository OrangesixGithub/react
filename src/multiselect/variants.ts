import { tv } from "tailwind-variants";

/** Estilos Tailwind do MultiSelect unstyled e de seu painel. */
export const multiselectVariants = tv({
    slots: {
        root: "relative flex w-full min-w-0 cursor-pointer items-center rounded-lg border border-multiselect-border " +
            "bg-multiselect-background text-base text-multiselect-text outline-none transition-colors " +
            "focus-within:border-multiselect-focus-border focus-within:ring-3 focus-within:ring-multiselect-focus-ring",
        hiddenInput: "sr-only",
        labelContainer: "min-w-0 flex-1 overflow-hidden",
        label: "flex min-h-10 flex-wrap items-center gap-1 px-3 py-1.5",
        placeholder: "flex min-h-10 items-center px-3 py-2 text-multiselect-placeholder",
        token: "inline-flex max-w-full items-center gap-1 rounded-md bg-multiselect-chip-background px-2 py-0.5 text-sm text-multiselect-chip-text",
        tokenLabel: "truncate",
        removeTokenIcon: "shrink-0 cursor-pointer text-xs",
        trigger: "flex w-10 shrink-0 items-center justify-center text-multiselect-placeholder",
        triggerIcon: "text-sm",
        panel: "absolute z-50 min-w-full overflow-hidden rounded-lg border border-multiselect-border " +
            "bg-multiselect-panel-background text-base text-multiselect-text shadow-lg [color-scheme:var(--multiselect-color-scheme)] [&_[data-p-hidden-focusable=true]]:sr-only",
        header: "flex items-center gap-3 border-b border-multiselect-border bg-multiselect-header-background p-2",
        headerCheckboxContainer: "flex shrink-0 items-center gap-2",
        headerSelectAllLabel: "cursor-pointer text-sm text-multiselect-header-text",
        checkboxRoot: "inline-flex shrink-0 items-center [--color-checkbox-background:var(--color-multiselect-filter-background)]",
        checkboxBox: "hidden",
        filterContainer: "relative min-w-0 flex-1",
        filterInput: "box-border w-full rounded-md border border-multiselect-border bg-multiselect-filter-background " +
            "py-1.5 pl-3 pr-8 text-sm text-multiselect-text outline-none placeholder:text-multiselect-placeholder " +
            "focus:border-multiselect-focus-border focus:ring-3 focus:ring-multiselect-focus-ring",
        filterIcon: "pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-multiselect-placeholder",
        closeButton: "flex h-4 w-4 text-xs shrink-0 cursor-pointer items-center justify-center rounded-md border-0 bg-transparent " +
            "text-multiselect-text hover:bg-multiselect-item-hover focus-visible:outline-none focus-visible:ring-3 " +
            "focus-visible:ring-multiselect-focus-ring",
        wrapper: "overflow-x-hidden overflow-y-auto [scrollbar-width:thin] [scrollbar-color:var(--color-multiselect-border)_transparent]",
        list: "m-0 flex list-none flex-col gap-1 p-1",
        item: "flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm outline-none " +
            "hover:bg-multiselect-item-hover aria-selected:bg-multiselect-item-selected " +
            "aria-selected:text-multiselect-item-selected-text data-[p-disabled=true]:cursor-not-allowed " +
            "data-[p-disabled=true]:opacity-50 data-[p-focused=true]:bg-multiselect-item-hover",
        checkboxContainer: "flex shrink-0 items-center",
        emptyMessage: "px-3 py-2 text-sm text-multiselect-placeholder",
    },
    variants: {
        size: {
            small: {
                root: "text-sm",
                label: "min-h-8 py-1",
                placeholder: "min-h-8 py-1",
                token: "text-xs",
                trigger: "w-8"
            },
            large: {
                root: "text-lg",
                label: "min-h-11 py-2",
                placeholder: "min-h-11 py-2.5",
                token: "text-base",
                trigger: "w-11"
            },
        },
        invalid: {
            true: { root: "border-multiselect-invalid-border focus-within:border-multiselect-invalid-border focus-within:ring-multiselect-invalid-ring" }
        },
        disabled: {
            true: {
                root: "cursor-not-allowed bg-multiselect-disabled-background text-multiselect-disabled-text",
                token: "opacity-50",
                trigger: "text-multiselect-disabled-text"
            }
        },
        readonly: {
            true: {
                root: "cursor-default bg-multiselect-readonly-background",
                removeTokenIcon: "hidden"
            }
        },
    },
});
