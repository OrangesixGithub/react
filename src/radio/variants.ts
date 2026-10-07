import { tv } from "tailwind-variants";

/** Estilos Tailwind do grupo Radio e do input radio nativo. */
export const radioVariants = tv({
    slots: {
        group: "flex w-full flex-wrap gap-3",
        option: "flex items-center gap-2",
        label: "cursor-pointer text-sm text-radio-text",
        input: [
            "m-0 h-5 w-5 shrink-0 appearance-none cursor-pointer rounded-full border border-radio-border bg-radio-background",
            "outline-none transition-colors focus-visible:border-radio-focus focus-visible:ring-3 focus-visible:ring-radio-focus-ring",
            "forced-colors:appearance-auto",
        ],
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
            true: { input: "border-radio-selected bg-radio-selected bg-[radial-gradient(circle,var(--color-radio-dot)_0_30%,transparent_35%)]" }
        },
        invalid: {
            true: { input: "border-radio-invalid focus-visible:border-radio-invalid focus-visible:ring-radio-invalid-ring" }
        },
        readonly: {
            true: { input: "cursor-default", label: "cursor-default" }
        },
        disabled: {
            true: {
                input: "cursor-not-allowed opacity-50",
                label: "cursor-not-allowed text-radio-disabled-text"
            }
        },
    },
    compoundVariants: [
        {
            checked: true,
            invalid: true,
            class: { input: "bg-radio-invalid" },
        },
    ],
    defaultVariants: { align: "row" },
});
