import type { TooltipProps } from "./@types";
import { tooltipVariants } from "./variants";
import { useId, useRef, useState } from "react";
import { useTooltipArrow } from "./hooks/useTooltipArrow";
import { Tooltip as PrimeTooltip } from "primereact/tooltip";
import { useTooltipTransition } from "./hooks/useTooltipTransition";

/**
 * Componente - Tooltip com conteúdo contextual em texto ou React.
 */
export function Tooltip({ event = "hover", renderTo = "self", ...props }: TooltipProps) {
    const [visible, setVisible] = useState(false);
    const [targetElement, setTargetElement] = useState<HTMLDivElement | null>(null);

    const id = useId();
    const target = `tooltip-target-${id.replace(/[^a-zA-Z0-9_-]/g, "_")}`;
    const tooltipRef = useRef<PrimeTooltip>(null);
    const geometry = useTooltipArrow(tooltipRef, visible, props.position ?? "right");
    const animation = useTooltipTransition(tooltipRef, props.transition);

    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return (
        <div
            className={target}
            ref={setTargetElement}
            onBlurCapture={e => {
                if (event !== "hover" && !e.currentTarget.contains(e.relatedTarget)) {
                    e.currentTarget.dispatchEvent(new Event("blur"));
                }
            }}
            onFocusCapture={e => {
                if (event !== "hover" && !props.disabled) {
                    animation.cancelExit();
                    e.currentTarget.dispatchEvent(new Event("focus"));
                }
            }}
            onMouseEnter={() => {
                if (event !== "focus") {
                    animation.cancelExit();
                }
            }}>
            {targetElement && <PrimeTooltip
                closeOnEscape
                unstyled
                pt={{
                    root: options => ({
                        "aria-hidden": false,
                        "data-tooltip-position": options?.state.position,
                        className: tooltipVariants.root({
                            position: (geometry.position ?? options?.state.position) as TooltipProps["position"],
                            className: props.className
                        }),
                    }),
                    arrow: options => ({
                        className: tooltipVariants.arrow({ position: (geometry.position ?? options?.state.position) as TooltipProps["position"] }),
                        style: geometry.style,
                    }),
                    text: { className: tooltipVariants.text() },
                }}
                appendTo={renderTo}
                baseZIndex={props.zIndex}
                disabled={props.disabled}
                event={event}
                hideEvent={event === "focus" ? "blur" : "mouseleave"}
                position={props.position}
                ref={tooltipRef}
                showEvent={event === "focus" ? "focus" : "mouseenter"}
                style={props.css}
                target={targetElement}
                onHide={() => {
                    setVisible(false);
                    props.onHide?.();
                }}
                onShow={() => {
                    setVisible(true);
                    animation.onShow();
                    props.onShow?.();
                }}
                onBeforeHide={animation.onBeforeHide}>
                {props.content}
            </PrimeTooltip>}
            {props.children}
        </div>
    );
}

Tooltip.displayName = "Tooltip";
