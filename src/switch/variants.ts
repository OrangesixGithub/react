import { tv } from "tailwind-variants";

/** Estilos Tailwind aplicados diretamente ao checkbox nativo. */
export const switchVariants = tv({
    slots: {
        wrapper: "flex w-full items-center gap-2",
        input: "m-0 h-6 w-11 shrink-0 appearance-none cursor-pointer rounded-full border border-switch-border bg-switch-background " +
            "bg-[radial-gradient(circle,var(--color-switch-thumb)_0_55%,transparent_60%)] bg-size-[22px_22px] bg-left bg-no-repeat " +
            "outline-none transition-[background-position,background-color,border-color] duration-150 " +
            "focus-visible:border-switch-focus focus-visible:ring-3 focus-visible:ring-switch-focus-ring " +
            "forced-colors:appearance-auto",
        legend: "cursor-pointer text-sm text-switch-text",
    },
    variants: {
        size: {
            small: { input: "h-5 w-9 bg-size-[18px_18px]", legend: "text-xs" },
            large: { input: "h-7 w-13 bg-size-[26px_26px]", legend: "text-base" },
        },
        checked: {
            true: { input: "border-switch-selected bg-switch-selected bg-right" }
        },
        invalid: {
            true: { input: "border-switch-invalid focus-visible:border-switch-invalid focus-visible:ring-switch-invalid-ring" }
        },
        readonly: {
            true: { input: "cursor-default", legend: "cursor-default" }
        },
        disabled: {
            true: {
                input: "cursor-not-allowed opacity-50",
                legend: "cursor-not-allowed text-switch-disabled-text"
            }
        },
    },
    compoundVariants: [{
        checked: true,
        invalid: true,
        class: { input: "bg-switch-invalid" }
    }],
});
