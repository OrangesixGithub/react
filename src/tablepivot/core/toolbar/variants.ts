import { tv } from "tailwind-variants";

/** Estilos da barra do TablePivot: resumo do slice e ações. */
export const tablePivotToolbarVariants = tv({
    slots: {
        root: [
            "flex flex-wrap items-center gap-x-4 gap-y-2 border-b px-2 py-1 text-sm",
            "border-pivot-border bg-pivot-toolbar-background",
        ],
        title: "font-semibold text-pivot-text",
        summary: [
            "flex min-w-0 cursor-pointer flex-wrap items-center gap-x-4 gap-y-1.5 rounded-md p-1 transition-colors",
            "hover:bg-pivot-chip-hover",
        ],
        group: "flex flex-wrap items-center gap-1.5",
        label: "flex size-6 items-center justify-center text-sm text-pivot-label",
        chip: [
            "inline-flex h-6 items-center rounded-full border px-2.5 text-xs",
            "border-pivot-chip-border bg-pivot-chip-background text-pivot-chip-text",
        ],
        none: "text-xs text-pivot-label",
        actions: "ml-auto flex flex-wrap items-center gap-1.5",
        icon: [
            "os-button inline-flex size-7 shrink-0 items-center justify-center rounded-md border",
            "duration-150 motion-reduce:transition-none",
        ],
    },
    variants: {
        color: {
            primary: {
                icon: [
                    "border-primary-500 bg-primary-500 text-white",
                    "hover:border-primary-500/50 hover:bg-primary-500/50 focus-visible:ring-primary-300",
                ],
            },
            secondary: {
                icon: [
                    "border-pivot-chip-border bg-pivot-chip-background text-pivot-text",
                    "hover:bg-pivot-chip-hover focus-visible:ring-pivot-active",
                ],
            },
        },
        disabled: {
            true: { icon: "cursor-not-allowed opacity-50 hover:bg-pivot-chip-background" },
        },
    },
});
