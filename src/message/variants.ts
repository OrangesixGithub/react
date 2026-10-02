import { tv } from "tailwind-variants";

/** Estilos da confirmação modal. */
export const messageVariants = tv({
    slots: {
        root: "message os-modal os-message w-[450px]",
        mask: "os-modal-mask os-message",
        header: "os-modal-header",
        title: "os-modal-title",
        close: "os-button os-button-focus os-modal-close",
        content: "scrollbar-themed os-modal-content",
        body: "os-modal-description",
        confirm: "min-h-9 px-3 py-1.5 text-sm",
        cancel: "min-h-9 bg-message-cancel-background px-3 py-1.5 text-sm text-message-text hover:bg-message-cancel-hover focus-visible:ring-message-border",
        actions: "os-modal-actions",
    },
    variants: {
        position: {
            start: { actions: "justify-start" },
            center: { actions: "justify-center" },
            end: { actions: "justify-end" },
        },
    },
    defaultVariants: { position: "end" },
});
