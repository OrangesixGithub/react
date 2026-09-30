import { tv } from "tailwind-variants";

/** Estilos Tailwind do grupo Checkbox e do input checkbox nativo. */
export const checkboxVariants = tv({
    slots: {
        group: "flex w-full flex-wrap gap-3",
        option: "flex items-center gap-2",
        label: "cursor-pointer text-sm text-checkbox-text",
        input: "m-0 h-5 w-5 shrink-0 appearance-none cursor-pointer rounded-sm border border-checkbox-border bg-checkbox-background " +
            "bg-size-[100%] outline-none transition-colors " +
            "focus-visible:border-checkbox-focus focus-visible:ring-3 focus-visible:ring-checkbox-focus-ring " +
            "forced-colors:appearance-auto",
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
            true: { input: "border-checkbox-selected bg-checkbox-selected bg-(image:--checkbox-check-image) bg-center bg-no-repeat" }
        },
        invalid: {
            true: { input: "border-checkbox-invalid focus-visible:border-checkbox-invalid focus-visible:ring-checkbox-invalid-ring" }
        },
        readonly: {
            true: { input: "cursor-default", label: "cursor-default" }
        },
        disabled: {
            true: {
                input: "cursor-not-allowed opacity-50",
                label: "cursor-not-allowed text-checkbox-disabled-text"
            }
        },
    },
    compoundVariants: [
        {
            checked: true,
            invalid: true,
            class: { input: "bg-checkbox-invalid" },
        },
    ],
    defaultVariants: { align: "row" },
});
