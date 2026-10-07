import { tv } from "tailwind-variants";

/** Estilos Tailwind do Accordion unstyled e de suas abas. */
export const accordionVariants = tv({
    slots: {
        root: "flex w-full min-w-0 flex-col gap-2",
        tab: "os-panel os-accordion",
        header: [
            "group bg-accordion-header-background text-accordion-header-text",
            "data-[p-highlight=true]:bg-accordion-header-selected-background",
            "data-[p-disabled=true]:cursor-not-allowed data-[p-disabled=true]:text-accordion-disabled-text",
            "data-[p-disabled=true]:opacity-60",
        ],
        headerAction: [
            "flex w-full cursor-pointer items-center gap-2 px-3 py-2 font-medium text-inherit no-underline outline-none",
            "hover:bg-accordion-header-hover focus-visible:ring-3 focus-visible:ring-inset focus-visible:ring-accordion-focus-ring",
            "group-data-[p-disabled=true]:pointer-events-none",
        ],
        headerIcon: "size-3 shrink-0 text-accordion-icon",
        headerTitle: "min-w-0 flex-1 text-base",
        toggleableContent: "grid grid-rows-[1fr] overflow-hidden border-t border-accordion-border",
        content: "min-h-0 overflow-hidden text-base",
        contentBody: "p-2 px-3",
    },
});
