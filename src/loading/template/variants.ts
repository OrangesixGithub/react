import { tv } from "tailwind-variants";

/** Estilos isolados dos indicadores visuais do Loading. */
export const loadingTemplateVariants = tv({
    slots: {
        ring: "size-10 animate-spin rounded-full border-4 border-current/25 border-t-current",
        dots: "flex items-center gap-2",
        dot: "os-loading-dot size-3 rounded-full bg-current",
        bars: "flex h-10 items-center gap-1",
        bar: "os-loading-bar h-full w-1.5 rounded-full bg-current",
        pulse: "relative flex size-10 items-center justify-center",
        pulseWave: "absolute inset-0 animate-ping rounded-full bg-current opacity-60",
        pulseCore: "relative size-5 rounded-full bg-current",
        orbit: "relative flex size-12 items-center justify-center",
        orbitOuter: "absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-current border-b-current",
        orbitInner: "os-loading-orbit-inner size-6 rounded-full border-4 border-transparent border-l-current border-r-current opacity-70",
    },
});
