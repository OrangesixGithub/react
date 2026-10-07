import { tv } from "tailwind-variants";

/** Layout do conteúdo HTML; o overlay usa os estilos originais da Lightbox3. */
export const lightboxVariants = tv({
    slots: {
        container: [
            "lightbox-container flex w-full flex-wrap justify-start gap-2 p-2 [&_img]:max-w-full",
            "[&_a[data-lightbox]]:cursor-zoom-in [&_a[data-lightbox]]:focus-visible:outline-2",
        ],
    },
});
