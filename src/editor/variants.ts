import { tv } from "tailwind-variants";

/** Estilos da área editável e da barra de ferramentas do TipTap. */
export const editorVariants = tv({
    slots: {
        root: "w-full min-w-0 rounded-lg border border-editor-border bg-editor-background text-editor-text transition-colors " +
            "focus-within:border-editor-focus-border focus-within:ring-3 focus-within:ring-editor-focus-ring",
        content: "min-w-0 overflow-x-auto scrollbar-themed",
        editable: "w-full min-w-0 box-border px-3 py-1 outline-none whitespace-pre-wrap break-words " +
            "[&_p]:my-2 [&_h1]:my-3 [&_h1]:text-3xl [&_h1]:font-bold [&_h2]:my-3 [&_h2]:text-2xl [&_h2]:font-bold " +
            "[&_h3]:my-2 [&_h3]:text-xl [&_h3]:font-bold [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 " +
            "[&_blockquote]:border-l-4 [&_blockquote]:border-editor-border [&_blockquote]:pl-3 " +
            "[&_a]:text-primary-500 [&_a]:underline [&_img]:max-w-full [&_img]:h-auto " +
            "[&_code]:rounded [&_code]:bg-editor-hover [&_code]:px-1 [&_pre]:overflow-x-auto [&_pre]:rounded [&_pre]:bg-editor-hover [&_pre]:p-3 " +
            "[&_table]:w-full [&_table]:table-fixed [&_table]:border-collapse [&_table]:my-3 " +
            "[&_td]:relative [&_td]:border [&_td]:border-editor-border [&_td]:p-2 [&_td]:align-top " +
            "[&_th]:relative [&_th]:border [&_th]:border-editor-border [&_th]:bg-editor-hover [&_th]:p-2 [&_th]:font-bold " +
            "[&_.selectedCell]:bg-editor-active " +
            "[&_hr]:border-editor-border [&_strong]:font-bold [&_em]:italic [&_s]:line-through",
        toolbar: "flex flex-wrap items-center gap-1 border-b border-editor-border bg-editor-toolbar-background py-1 px-2",
        group: "flex flex-wrap items-center gap-1",
        button: "inline-flex h-6 min-w-6 cursor-pointer items-center justify-center rounded-md border-0 bg-transparent " +
            "text-sm text-editor-text hover:bg-editor-hover focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-editor-focus-ring " +
            "aria-pressed:bg-editor-active aria-pressed:text-editor-active-text disabled:cursor-not-allowed disabled:opacity-50",
        tablePicker: "relative inline-flex",
        tablePanel: "absolute right-0 top-full z-50 mt-1 w-56 max-w-[calc(100vw-3rem)] rounded-lg border border-editor-border bg-editor-panel-background p-3 text-editor-text shadow-lg",
        tableGrid: "grid grid-cols-8 gap-1",
        tableCell: "h-5 w-full cursor-pointer rounded-sm border border-editor-border bg-transparent p-0 hover:border-editor-focus-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-editor-focus-ring data-[selected=true]:border-editor-focus-border data-[selected=true]:bg-editor-active",
        tableDimensions: "mt-3 flex items-center gap-2 text-xs",
        tableNumber: "w-14 rounded-md border border-editor-border bg-transparent p-1 text-editor-text",
        tableActions: "mt-3 flex flex-col gap-1 border-t border-editor-border pt-2",
        tableAction: "flex w-full cursor-pointer items-center rounded-md border-0 bg-transparent px-2 py-1.5 text-left text-xs text-editor-text hover:bg-editor-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-editor-focus-ring",
        color: "h-8 w-8 cursor-pointer rounded-md border border-editor-border bg-transparent p-1",
        image: "relative inline-flex",
        file: "sr-only",
        link: "flex w-full flex-wrap items-center gap-2",
        linkInput: "min-w-0 flex-1 rounded-md border border-editor-border bg-editor-background px-2 py-1 text-sm text-editor-text outline-none " +
            "focus:border-editor-focus-border focus:ring-3 focus:ring-editor-focus-ring",
    },
    variants: {
        invalid: {
            true: { root: "border-input-invalid-border focus-within:border-input-invalid-border focus-within:ring-input-invalid-ring" }
        },
        disabled: {
            true: { root: "bg-input-disabled-background text-input-disabled-text" }
        },
        readonly: {
            true: { root: "bg-input-readonly-background" }
        },
    },
});
