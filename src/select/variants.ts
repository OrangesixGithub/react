import { tv } from "tailwind-variants";

/** Estilos Tailwind do select nativo e das opções. */
export const selectVariants = tv({
    slots: {
        wrapper: "group relative w-full min-w-0",
        root: "os-field os-select block box-border w-full min-w-0 h-10 appearance-none pr-10 " +
            "font-[inherit] text-base leading-normal",
        icon: "pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm leading-none text-select-icon transition-colors group-focus-within:text-select-focus-border",
        option: "bg-select-option-background text-select-text disabled:text-select-disabled-text",
    },
    variants: {
        invalid: {
            true: { root: "os-field-invalid" }
        },
        disabled: {
            true: { root: "os-field-disabled", icon: "text-select-disabled-text" }
        },
        readonly: {
            true: { root: "os-field-readonly cursor-default" }
        },
        size: {
            small: { root: "h-8 py-1 text-sm", icon: "text-xs" },
            large: { root: "h-11 py-2.5 text-lg", icon: "text-base" },
        },
        placeholder: { true: { root: "text-select-placeholder" } },
    },
});
