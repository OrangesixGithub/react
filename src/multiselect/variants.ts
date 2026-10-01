import { tv } from "tailwind-variants";

/** Estilos Tailwind do MultiSelect unstyled e de seu painel. */
export const multiselectVariants = tv({
    slots: {
        root: "os-field os-field-group os-multiselect relative flex w-full min-w-0 items-center p-0 text-base",
        hiddenInput: "sr-only",
        labelContainer: "min-w-0 flex-1 overflow-hidden",
        label: "flex min-h-10 flex-wrap items-center gap-1 px-3 py-1.5",
        placeholder: "flex min-h-10 items-center px-3 py-2 text-multiselect-placeholder",
        token: "os-chip",
        tokenLabel: "truncate",
        removeTokenIcon: "os-button os-chip-remove",
        trigger: "flex w-10 shrink-0 items-center justify-center text-multiselect-placeholder",
        triggerIcon: "text-sm",
        panel: "os-panel os-multiselect-panel absolute z-50 min-w-full text-base " +
            "[color-scheme:var(--multiselect-color-scheme)] [&_[data-p-hidden-focusable=true]]:sr-only",
        header: "os-panel-header gap-3",
        headerCheckboxContainer: "flex shrink-0 items-center gap-2",
        headerSelectAllLabel: "cursor-pointer text-sm text-multiselect-header-text",
        checkboxRoot: "os-multiselect-checkbox inline-flex shrink-0 items-center",
        checkboxBox: "hidden",
        filterContainer: "relative min-w-0 flex-1",
        filterInput: "os-field os-multiselect-filter box-border w-full rounded-md py-1.5 pl-3 pr-8 text-sm",
        filterIcon: "pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-multiselect-placeholder",
        closeButton: "os-button font-normal flex h-4 w-4 text-xs shrink-0 rounded-md border-0 bg-transparent " +
            "text-multiselect-text hover:bg-multiselect-item-hover os-button-focus " +
            "focus-visible:ring-multiselect-focus-ring",
        wrapper: "overflow-x-hidden overflow-y-auto scrollbar-themed",
        list: "m-0 flex list-none flex-col gap-1 p-1",
        item: "os-list-item os-multiselect-item flex items-center gap-2 " +
            "data-[p-disabled=true]:cursor-not-allowed data-[p-disabled=true]:opacity-50",
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
            true: { root: "os-field-invalid" }
        },
        disabled: {
            true: {
                root: "os-field-disabled",
                token: "opacity-50",
                trigger: "text-multiselect-disabled-text"
            }
        },
        readonly: {
            true: {
                root: "os-field-readonly cursor-default",
                removeTokenIcon: "hidden"
            }
        },
    },
});
