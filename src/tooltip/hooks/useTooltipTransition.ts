import { useEffect, useRef } from "react";
import type { RefObject } from "react";
import type { TooltipTransition } from "../@types";
import { tooltipTransitionFrames } from "../variants";
import type { Tooltip as PrimeTooltip } from "primereact/tooltip";

/** Anima a entrada e adia a desmontagem do PrimeReact até terminar a saída. */
export function useTooltipTransition(tooltip: RefObject<PrimeTooltip | null>, transition: TooltipTransition = "zoom") {
    const animations = useRef<Animation[]>([]);
    const pendingFrame = useRef<{ view: Window; id: number } | null>(null);
    const exiting = useRef(false);
    const allowHide = useRef(false);
    const generation = useRef(0);
    const mounted = useRef(true);

    function cancel() {
        generation.current++;
        exiting.current = false;
        if (pendingFrame.current) {
            pendingFrame.current.view.cancelAnimationFrame(pendingFrame.current.id);
            pendingFrame.current = null;
        }
        animations.current.forEach(animation => animation.cancel());
        animations.current = [];
    }

    useEffect(() => {
        mounted.current = true;
        return () => {
            mounted.current = false;
            cancel();
        };
    }, []);

    function currentFrame(panel: HTMLElement): Keyframe {
        const css = panel.ownerDocument.defaultView?.getComputedStyle(panel);
        return { opacity: css?.opacity ?? "1", transform: css?.transform ?? "none" };
    }

    function animate(panel: HTMLElement, exit: boolean, from?: Keyframe) {
        const frames = tooltipTransitionFrames(transition);
        const keyframes = exit ? [from ?? frames[1], frames[0]] : [from ?? frames[0], frames[1]];
        const options: KeyframeAnimationOptions = {
            duration: exit ? 150 : 300,
            easing: exit ? "ease-in" : "ease-out",
            fill: "both",
        };
        animations.current = [panel.animate(keyframes, options)];
        return Promise.all(animations.current.map(animation => animation.finished));
    }

    function reducedMotion(panel: HTMLElement) {
        return panel.ownerDocument.defaultView?.matchMedia("(prefers-reduced-motion: reduce)").matches ?? true;
    }

    function onShow() {
        cancel();
        const view = tooltip.current?.getTarget()?.ownerDocument.defaultView;
        if (!view) {
            return;
        }
        let attempts = 0;
        function start() {
            pendingFrame.current = null;
            const panel = tooltip.current?.getElement();
            if (!panel && attempts++ < 3) {
                pendingFrame.current = { view: view!, id: view!.requestAnimationFrame(start) };
                return;
            }
            if (panel && !reducedMotion(panel)) {
                const current = generation.current;
                void animate(panel, false).then(() => {
                    if (generation.current === current) {
                        cancel();
                    }
                }).catch(() => {});
            }
        }
        pendingFrame.current = { view, id: view.requestAnimationFrame(start) };
    }

    function onBeforeHide() {
        if (!mounted.current || allowHide.current) {
            return true;
        }
        const panel = tooltip.current?.getElement();
        if (!panel || reducedMotion(panel)) {
            cancel();
            return true;
        }
        if (!exiting.current) {
            const from = currentFrame(panel);
            cancel();
            exiting.current = true;
            const current = generation.current;
            void animate(panel, true, from).then(() => {
                if (generation.current === current) {
                    allowHide.current = true;
                    tooltip.current?.hide();
                    allowHide.current = false;
                    // Mantém o último frame invisível até o PrimeReact desmontar o painel.
                    exiting.current = false;
                }
            }).catch(() => {});
        }
        return false;
    }

    function cancelExit() {
        if (exiting.current) {
            const panel = tooltip.current?.getElement();
            const from = panel ? currentFrame(panel) : undefined;
            cancel();
            if (panel && !reducedMotion(panel)) {
                const current = generation.current;
                void animate(panel, false, from).then(() => {
                    if (generation.current === current) {
                        cancel();
                    }
                }).catch(() => {});
            }
        }
    }

    return { onShow, onBeforeHide, cancelExit };
}
