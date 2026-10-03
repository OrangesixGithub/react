import { useEffect, useRef } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";

/** Opções internas do arraste compartilhado dos diálogos. */
interface ModalDragOptions {
    visible: boolean;
    enabled: boolean;
}

/**
 * Core - `useModalDrag`
 *
 * Arrasta o diálogo no documento de destino do portal, inclusive fora do iframe de origem.
 */
export function useModalDrag(props: ModalDragOptions) {
    const cleanup = useRef<(() => void) | null>(null);

    useEffect(() => {
        if (!props.visible || !props.enabled) {
            cleanup.current?.();
        }
        return () => cleanup.current?.();
    }, [props.visible, props.enabled]);

    function onPointerDown(event: ReactPointerEvent<HTMLDivElement>) {
        if (!props.visible || !props.enabled || event.button !== 0 || !event.isPrimary) {
            return;
        }

        const header = event.currentTarget;
        // Evita instanceof: o alvo pode pertencer à janela pai.
        const target = event.target as Element;
        if (target.closest("button, a, input, textarea, select, [contenteditable], [role='button']")) {
            return;
        }

        const dialog = header.closest<HTMLElement>("[role='dialog']");
        const ownerDocument = header.ownerDocument;
        const ownerWindow = ownerDocument.defaultView;
        if (!dialog || !ownerWindow) {
            return;
        }

        cleanup.current?.();
        event.preventDefault();
        const bounds = dialog.getBoundingClientRect();
        const startX = event.clientX;
        const startY = event.clientY;
        const pointerId = event.pointerId;
        const previousSelection = ownerDocument.body.style.userSelect;
        ownerDocument.body.style.userSelect = "none";

        function onMove(move: PointerEvent) {
            if (move.pointerId !== pointerId || !dialog) {
                return;
            }
            const width = ownerDocument.documentElement.clientWidth;
            const height = ownerDocument.documentElement.clientHeight;
            const left = Math.max(0, Math.min(bounds.left + move.clientX - startX, width - bounds.width));
            const top = Math.max(0, Math.min(bounds.top + move.clientY - startY, height - bounds.height));
            Object.assign(dialog.style, {
                position: "fixed",
                margin: "0",
                left: `${left}px`,
                top: `${top}px`,
            });
            move.preventDefault();
        }

        function stop() {
            ownerDocument.removeEventListener("pointermove", onMove);
            ownerDocument.removeEventListener("pointerup", onEnd);
            ownerDocument.removeEventListener("pointercancel", onEnd);
            header.removeEventListener("lostpointercapture", stop);
            ownerWindow?.removeEventListener("blur", stop);
            if (header.hasPointerCapture(pointerId)) {
                header.releasePointerCapture(pointerId);
            }
            ownerDocument.body.style.userSelect = previousSelection;
            cleanup.current = null;
        }

        function onEnd(end: PointerEvent) {
            if (end.pointerId === pointerId) {
                stop();
            }
        }

        ownerDocument.addEventListener("pointermove", onMove, { passive: false });
        ownerDocument.addEventListener("pointerup", onEnd);
        ownerDocument.addEventListener("pointercancel", onEnd);
        ownerWindow.addEventListener("blur", stop);
        header.addEventListener("lostpointercapture", stop);
        cleanup.current = stop;
        header.setPointerCapture(pointerId);
    }

    return { onPointerDown };
}
