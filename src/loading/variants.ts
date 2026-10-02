import { tv } from "tailwind-variants";
import type { ColorProps } from "../api";

/** Estilos Tailwind do Loading, do indicador padrão e da mensagem. */
export const loadingVariants = tv({
    slots: {
        root: "os-loading inset-0 flex flex-col gap-2",
        ring: "size-10 animate-spin rounded-full border-4 border-current/25 border-t-current",
        dots: "flex items-center gap-2",
        dot: "os-loading-dot size-3 rounded-full bg-current",
        text: "m-0 text-base text-loading-text",
    },
    variants: {
        fullscreen: {
            true: { root: "fixed backdrop-blur-sm" },
            false: { root: "absolute" },
        },
        color: {
            primary: { root: "text-primary-500" },
            secondary: { root: "text-slate-500" },
            success: { root: "text-green-500" },
            danger: { root: "text-red-500" },
            light: { root: "text-slate-100" },
            warning: { root: "text-amber-500" },
            gray: { root: "text-gray-500" },
            info: { root: "text-cyan-500" },
            dark: { root: "text-slate-900" },
            help: { root: "text-violet-500" },
            contrast: { root: "text-black" },
            white: { root: "text-white" },
        } satisfies Record<ColorProps, { root: string }>,
    },
});
