import { tv } from "tailwind-variants";

/**
 * Classes aplicadas pelo `response()` nos campos dos componentes 3.x.
 */
export const responseVariants = tv({
    slots: {
        control: "",
        feedback: "mt-1 text-xs",
        tab: "",
    },
    variants: {
        type: {
            "is-invalid": {
                control: "os-field-invalid",
                feedback: "text-input-feedback-error",
                tab: "text-error!",
            },
            "is-valid": {
                control: "os-field-valid",
                feedback: "text-valid",
            },
        },
    },
});

/**
 * Classes do card da snackbar (tokens `--color-snackbar-*` em `style/components/snackbar.css`).
 */
export const snackbarVariants = tv({
    slots: {
        root: "flex w-full items-start gap-3 rounded-xl border px-4 py-3 text-left font-sans text-sm font-normal leading-5 shadow-lg",
        icon: "mt-0.5 shrink-0 text-base leading-none",
        content: "flex min-w-0 flex-col gap-0.5",
        title: "font-semibold",
        text: "text-snackbar-text",
    },
    variants: {
        type: {
            success: {
                root: "border-snackbar-success-border bg-snackbar-success-background",
                icon: "text-snackbar-success-title",
                title: "text-snackbar-success-title",
            },
            warning: {
                root: "border-snackbar-warning-border bg-snackbar-warning-background",
                icon: "text-snackbar-warning-title",
                title: "text-snackbar-warning-title",
            },
            error: {
                root: "border-snackbar-error-border bg-snackbar-error-background",
                icon: "text-snackbar-error-title",
                title: "text-snackbar-error-title",
            },
            info: {
                root: "border-snackbar-info-border bg-snackbar-info-background",
                icon: "text-snackbar-info-title",
                title: "text-snackbar-info-title",
            },
        },
    },
    defaultVariants: {
        type: "info",
    },
});

/**
 * Ícone padrão (Bootstrap Icons) de cada tipo de mensagem.
 */
export const snackbarIcons = {
    success: "bi bi-check-circle",
    warning: "bi bi-exclamation-triangle",
    error: "bi bi-x-circle",
    info: "bi bi-info-circle",
} as const;
