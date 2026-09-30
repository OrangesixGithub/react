import { tv } from "tailwind-variants";

/** Estilos Tailwind do campo de texto multilinha. */
export const textareaVariants = tv({
    base: "scrollbar-themed block box-border w-full min-w-0 min-h-20 rounded-lg border px-3 py-2 font-[inherit] leading-normal " +
        "border-input-border bg-input-background text-input-text placeholder:text-input-placeholder outline-none " +
        "transition-colors focus:border-input-focus-border focus:ring-3 focus:ring-input-focus-ring " +
        "read-only:bg-input-readonly-background disabled:cursor-not-allowed disabled:bg-input-disabled-background " +
        "disabled:text-input-disabled-text",
    variants: {
        invalid: {
            true: "border-input-invalid-border focus:border-input-invalid-border focus:ring-input-invalid-ring",
        },
        autoResize: {
            true: "resize-none overflow-hidden",
            false: "resize-y",
        },
        size: {
            small: "min-h-16 py-1 text-sm",
            large: "min-h-28 py-2.5 text-lg",
        },
    },
    defaultVariants: { autoResize: false },
});
