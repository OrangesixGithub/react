import { useEffect, useState } from "react";
import type { TooltipProps } from "../@types";
import type { RefObject, CSSProperties } from "react";
import type { Tooltip as PrimeTooltip } from "primereact/tooltip";

type Placement = NonNullable<TooltipProps["position"]>;
const opposite: Record<Placement, Placement> = {
    top: "bottom", bottom: "top", left: "right", right: "left", mouse: "mouse",
};

/** Alinha painel e seta ao alvo no documento local, inclusive após colisões no iframe. */
export function useTooltipArrow(tooltip: RefObject<PrimeTooltip | null>, visible: boolean, requested: Placement) {
    const [geometry, setGeometry] = useState<{ position?: Placement; style: CSSProperties }>({ style: {} });

    useEffect(() => {
        if (!visible) {
            setGeometry({ style: {} });
            return;
        }

        const target = tooltip.current?.getTarget();
        const view = target?.ownerDocument.defaultView;
        if (!target || !view || requested === "mouse") {
            return;
        }

        let frame = 0;
        let observer: ResizeObserver | undefined;
        let attempts = 0;

        function measure() {
            const panel = tooltip.current?.getElement();
            if (!panel || !target || !view || panel.ownerDocument !== target.ownerDocument) {
                return;
            }
            const targetRect = target.getBoundingClientRect();
            const bounds = {
                left: 0, top: 0,
                right: target.ownerDocument.documentElement.clientWidth,
                bottom: target.ownerDocument.documentElement.clientHeight,
            };
            // Em renderTo="self", o painel também precisa caber nos ancestrais que recortam conteúdo.
            for (let ancestor = panel.parentElement; ancestor; ancestor = ancestor.parentElement) {
                const css = view.getComputedStyle(ancestor);
                const rect = ancestor.getBoundingClientRect();
                if (/auto|scroll|hidden|clip/.test(css.overflowX)) {
                    bounds.left = Math.max(bounds.left, rect.left + ancestor.clientLeft);
                    bounds.right = Math.min(bounds.right, rect.left + ancestor.clientLeft + ancestor.clientWidth);
                }
                if (/auto|scroll|hidden|clip/.test(css.overflowY)) {
                    bounds.top = Math.max(bounds.top, rect.top + ancestor.clientTop);
                    bounds.bottom = Math.min(bounds.bottom, rect.top + ancestor.clientTop + ancestor.clientHeight);
                }
            }
            panel.style.setProperty("--os-tooltip-width", `${Math.max(0, bounds.right - bounds.left)}px`);
            // As dimensões de layout não variam com o zoom/slide aplicado ao painel inteiro.
            const width = panel.offsetWidth;
            const height = panel.offsetHeight;
            const available = {
                top: targetRect.top - bounds.top,
                bottom: bounds.bottom - targetRect.bottom,
                left: targetRect.left - bounds.left,
                right: bounds.right - targetRect.right,
                mouse: 0,
            };
            const needed = requested === "top" || requested === "bottom" ? height : width;
            const alternate = opposite[requested];
            const position = available[requested] < needed && available[alternate] > available[requested] ? alternate : requested;
            const vertical = position === "top" || position === "bottom";
            let left = targetRect.left + (targetRect.width - width) / 2;
            let top = targetRect.top + (targetRect.height - height) / 2;
            if (position === "top") {
                top = targetRect.top - height;
            } else if (position === "bottom") {
                top = targetRect.bottom;
            } else if (position === "left") {
                left = targetRect.left - width;
            } else if (position === "right") {
                left = targetRect.right;
            }
            left = Math.max(bounds.left, Math.min(left, bounds.right - width));
            top = Math.max(bounds.top, Math.min(top, bounds.bottom - height));

            // Coordenadas do viewport precisam ser convertidas ao ancestral que posiciona o painel.
            const parent = panel.offsetParent as HTMLElement | null;
            const positionedParent = parent && !(parent === panel.ownerDocument.body && view.getComputedStyle(parent).position === "static");
            const parentRect = positionedParent ? parent.getBoundingClientRect() : null;
            panel.style.left = `${left - (parentRect?.left ?? 0) - (positionedParent ? parent.clientLeft : 0) + (positionedParent ? parent.scrollLeft : view.scrollX)}px`;
            panel.style.top = `${top - (parentRect?.top ?? 0) - (positionedParent ? parent.clientTop : 0) + (positionedParent ? parent.scrollTop : view.scrollY)}px`;
            const length = vertical ? width : height;
            const center = vertical
                ? targetRect.left + targetRect.width / 2 - left
                : targetRect.top + targetRect.height / 2 - top;
            const offset = `${Math.max(0, Math.min(100, center / length * 100))}%`;
            const style = vertical ? { left: offset } : { top: offset };
            setGeometry(previous => previous.position === position && previous.style.left === style.left && previous.style.top === style.top ? previous : {
                position,
                style
            });
        }

        function schedule() {
            view?.cancelAnimationFrame(frame);
            frame = view?.requestAnimationFrame(measure) ?? 0;
        }

        function attach() {
            const panel = tooltip.current?.getElement();
            if (!panel && attempts++ < 3) {
                frame = view?.requestAnimationFrame(attach) ?? 0;
                return;
            }
            if (panel && target) {
                observer = new ResizeObserver(schedule);
                observer.observe(panel);
                observer.observe(target);
                measure();
            }
        }

        frame = view.requestAnimationFrame(attach);
        view.addEventListener("resize", schedule);
        target.ownerDocument.addEventListener("scroll", schedule, true);
        return () => {
            view.cancelAnimationFrame(frame);
            observer?.disconnect();
            view.removeEventListener("resize", schedule);
            target.ownerDocument.removeEventListener("scroll", schedule, true);
        };
    }, [tooltip, visible, requested]);

    return geometry;
}
