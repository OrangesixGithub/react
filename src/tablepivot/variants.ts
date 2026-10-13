import { tv } from "tailwind-variants";

/** Estilos aplicados dentro do shadow DOM da grade, usando os tokens do tema. */
export const tablePivotGridStyles = `
    regular-table {
        scrollbar-width: thin;
        scrollbar-color: var(--color-scrollbar-thumb) var(--color-scrollbar-track);
    }

    regular-table table thead th {
        background-color: var(--color-pivot-header-background);
        color: var(--color-pivot-label);
    }

    regular-table table thead tr:not(.rt-autosize) th {
        border-bottom: 1px solid var(--color-pivot-grid-line);
    }

    regular-table table thead tr:last-child::after {
        background-color: transparent;
        border-bottom: 1px solid var(--color-pivot-grid-line);
    }

    regular-table table :is(td, th):not(.psp-split-total) {
        color: color-mix(in srgb, var(--color-pivot-text) 75%, transparent);
        font-weight: 400;
    }

    regular-table table tbody :is(td, th):not(.psp-split-total) {
        color: var(--color-pivot-content-text);
    }

    regular-table table .psp-split-total {
        color: var(--color-pivot-text);
        font-weight: 700;
    }
`;

/** Estilos do contêiner, da grade e do estado vazio do TablePivot. */
export const tablePivotVariants = tv({
    slots: {
        root: [
            "os-pivot relative flex w-full flex-col overflow-hidden rounded-md border",
            "border-pivot-border bg-pivot-background text-pivot-text",
        ],
        grid: "relative min-h-0 flex-1",
        viewer: "os-pivot-viewer absolute inset-0",
        empty: "absolute inset-0 z-10 flex items-center justify-center text-sm text-pivot-label",
    },
});
