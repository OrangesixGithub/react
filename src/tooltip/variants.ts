import { tv } from "tailwind-variants";
import type { TooltipTransition } from "./@types";

const root = tv({
    base: "absolute -top-[9999px] -left-[9999px] w-max max-w-[min(20rem,100vw,var(--os-tooltip-width,100vw))]",
    variants: {
        position: {
            top: "py-1",
            bottom: "py-1",
            left: "px-1",
            right: "px-1",
            mouse: "p-1",
        },
    },
});

const arrow = tv({
    base: "absolute h-0 w-0 border-solid border-transparent",
    variants: {
        position: {
            top: "bottom-0 left-1/2 -ml-1 border-x-4 border-t-4 border-b-0 border-t-tooltip-background",
            bottom: "top-0 left-1/2 -ml-1 border-x-4 border-t-0 border-b-4 border-b-tooltip-background",
            left: "top-1/2 right-0 -mt-1 border-y-4 border-r-0 border-l-4 border-l-tooltip-background",
            right: "top-1/2 left-0 -mt-1 border-y-4 border-r-4 border-l-0 border-r-tooltip-background",
            mouse: "hidden",
        },
    },
});

const text = tv({
    base: "rounded-md bg-tooltip-background px-3 py-2 text-sm leading-relaxed whitespace-pre-line wrap-break-word text-tooltip-text shadow-md",
});

/** Classes do painel, seta e conteúdo conforme a posição efetiva do PrimeReact. */
export const tooltipVariants = { root, arrow, text };

/** Animações do painel inteiro, mantendo conteúdo e seta sincronizados. */
export function tooltipTransitionFrames(transition: TooltipTransition): Keyframe[] {
    const transform = transition === "zoom" ? "scale(0.9)" : transition === "slide" ? "translateY(-8px)" : "none";
    return [{ opacity: 0, transform }, { opacity: 1, transform: "none" }];
}
