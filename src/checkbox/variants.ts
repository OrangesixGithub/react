import { tv } from "tailwind-variants";

/** Estilos Tailwind do grupo Checkbox e do input checkbox nativo. */
export const checkboxVariants = tv({
    slots: {
        group: "flex w-full flex-wrap gap-3",
        option: "flex items-center gap-2",
        label: "cursor-pointer text-sm text-checkbox-text",
        input: "os-checkbox",
    },
    variants: {
        size: {
            small: { input: "h-4 w-4", label: "text-xs" },
            large: { input: "h-6 w-6", label: "text-base" },
        },
        align: {
            row: { group: "flex-row" },
            column: { group: "flex-col" }
        },
        checked: {
            true: { input: "os-checkbox-checked" }
        },
        invalid: {
            true: { input: "os-checkbox-invalid" }
        },
        readonly: {
            true: { input: "os-checkbox-readonly", label: "cursor-default" }
        },
        disabled: {
            true: {
                input: "os-checkbox-disabled",
                label: "cursor-not-allowed text-checkbox-disabled-text"
            }
        },
    },
    defaultVariants: { align: "row" },
});
