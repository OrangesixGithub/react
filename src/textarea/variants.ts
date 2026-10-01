import { tv } from "tailwind-variants";

/** Estilos Tailwind do campo de texto multilinha. */
export const textareaVariants = tv({
    base: "os-field os-textarea scrollbar-themed block box-border w-full min-w-0 min-h-20 font-[inherit] leading-normal",
    variants: {
        invalid: {
            true: "os-field-invalid",
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
