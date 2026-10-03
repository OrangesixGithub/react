import { tv } from "tailwind-variants";

/** Estilos do documento e da navegação do PDF. */
export const pdfVariants = tv({
    slots: {
        root: "pdf min-w-0 flex-col",
        container: "pdf-container relative w-full rounded-lg border border-pdf-border bg-pdf-background p-2",
        viewport: "w-full min-w-0",
        document: "flex flex-col items-center gap-4",
        page: "max-w-full overflow-hidden shadow-sm",
        pagination: "pdf-pagination sticky bottom-4 z-10 mx-auto mt-2 flex w-fit items-center gap-2 rounded-lg border border-pdf-border bg-pdf-toolbar px-2 py-1 text-pdf-text shadow-md",
        button: "os-button os-button-focus pdf-page flex size-8 items-center justify-center rounded-md text-pdf-text hover:bg-pdf-button-hover disabled:opacity-40",
        message: "m-0 p-4 text-center text-pdf-text",
    },
    variants: {
        portal: {
            true: { pagination: "fixed bottom-auto z-50 m-0 -translate-x-1/2" },
        },
    },
});
