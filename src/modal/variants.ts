import { tv } from "tailwind-variants";

/** Estilos da janela modal, compartilhando a base visual do Message. */
export const modalVariants = tv({
    slots: {
        root: "modal os-modal os-message pointer-events-auto",
        mask: "os-modal-mask os-message p-3",
        header: "os-modal-header",
        title: "os-modal-title",
        icons: "flex shrink-0 items-center gap-1",
        close: "os-button os-button-focus os-modal-close",
        content: "scrollbar-themed os-modal-content min-h-0 flex-1",
        footer: "shrink-0 px-4 pb-4",
    },
    variants: {
        sizes: {
            small: { root: "w-[300px] max-md:w-4/5 max-sm:w-[90%]" },
            medium: { root: "w-[500px] max-md:w-4/5 max-sm:w-[90%]" },
            large: { root: "w-[800px] max-md:w-4/5 max-sm:w-[90%]" },
            "extra-large": { root: "w-4/5 max-sm:w-[90%]" },
        },
        maximized: {
            true: { root: "!fixed !inset-0 !m-0 !h-dvh !max-h-dvh !w-screen !max-w-none rounded-none" },
        },
        background: {
            false: { mask: "bg-transparent backdrop-blur-none" },
        },
        draggable: {
            true: { header: "cursor-move touch-none" },
        },
        header: {
            false: { content: "pt-4" },
        },
    },
});
