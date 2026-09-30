import { tv } from "tailwind-variants";

/** Estilos Tailwind do select nativo e das opções. */
export const selectVariants = tv({
    slots: {
        wrapper: "group relative w-full min-w-0",
        root: "block box-border w-full min-w-0 h-10 appearance-none cursor-pointer rounded-lg border border-select-border bg-select-background pl-3 pr-10 py-2 " +
            "font-[inherit] text-base leading-normal text-select-text outline-none transition-colors focus:border-select-focus-border focus:ring-3 focus:ring-select-focus-ring",
        icon: "pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm leading-none text-select-icon transition-colors group-focus-within:text-select-focus-border",
        option: "bg-select-option-background text-select-text disabled:text-select-disabled-text",
    },
    variants: {
        invalid: {
            true: { root: "border-select-invalid-border focus:border-select-invalid-border focus:ring-select-invalid-ring" }
        },
        disabled: {
            true: { root: "cursor-not-allowed bg-select-disabled-background text-select-disabled-text", icon: "text-select-disabled-text" }
        },
        readonly: {
            true: { root: "cursor-default bg-select-readonly-background" }
        },
        size: {
            small: { root: "h-8 py-1 text-sm", icon: "text-xs" },
            large: { root: "h-11 py-2.5 text-lg", icon: "text-base" },
        },
        placeholder: { true: { root: "text-select-placeholder" } },
    },
});
