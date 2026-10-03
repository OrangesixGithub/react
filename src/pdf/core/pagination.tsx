import { createPortal } from "react-dom";
import { pdfVariants } from "../variants";
import type { PDFProps } from "../@types";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties, RefObject } from "react";

interface PDFPaginationProps {
    appendTo?: PDFProps["appendTo"];
    containerRef: RefObject<HTMLDivElement | null>;
    currentPage: number;
    pages: number;
    onPageChange(page: number): void;
}

/**
 * Core - `PDFPagination`
 *
 * Mantém a navegação local ou no viewport do documento escolhido, inclusive fora do iframe.
 */
export function PDFPagination(props: PDFPaginationProps) {
    const navigationRef = useRef<HTMLElement>(null);
    const [target, setTarget] = useState<HTMLElement | null>(null);
    const [position, setPosition] = useState<CSSProperties>({ visibility: "hidden" });
    const styles = pdfVariants({ portal: target !== null });

    useEffect(() => {
        const container = props.containerRef.current;
        if (!container || !props.appendTo || props.appendTo === "self") {
            setTarget(null);
            return;
        }
        const destination = typeof props.appendTo === "function" ? props.appendTo() : props.appendTo;
        setPosition({ visibility: "hidden" });
        setTarget(destination ?? container.ownerDocument.body);
    }, [props.appendTo, props.containerRef]);

    useEffect(() => {
        const container = props.containerRef.current;
        const navigation = navigationRef.current;
        const sourceWindow = container?.ownerDocument.defaultView;
        const targetWindow = target?.ownerDocument.defaultView;
        if (!container || !navigation || !sourceWindow || !targetWindow) {
            return;
        }
        const windows: Window[] = [];
        let currentWindow: Window = sourceWindow;
        // Apenas documentos ancestrais acessíveis pela política de mesma origem.
        try {
            while (currentWindow !== targetWindow) {
                windows.push(currentWindow);
                if (!currentWindow.frameElement) {
                    return;
                }
                currentWindow = currentWindow.parent;
            }
        } catch {
            return;
        }
        windows.push(targetWindow);

        function updatePosition() {
            if (!container || !navigation || !targetWindow) {
                return;
            }
            const bounds = container.getBoundingClientRect();
            let bottom = bounds.bottom;
            let visibleLeft = Math.max(bounds.left, 0);
            let visibleRight = Math.min(bounds.right, sourceWindow!.innerWidth);
            let visibleTop = Math.max(bounds.top, 0);
            let visibleBottom = Math.min(bottom, sourceWindow!.innerHeight);

            for (const ownerWindow of windows.slice(0, -1)) {
                const frame = ownerWindow.frameElement;
                if (!frame) {
                    return;
                }
                const frameBounds = frame.getBoundingClientRect();
                const offsetLeft = frameBounds.left + frame.clientLeft;
                const offsetTop = frameBounds.top + frame.clientTop;
                bottom += offsetTop;
                visibleLeft = Math.max(visibleLeft + offsetLeft, 0);
                visibleRight = Math.min(visibleRight + offsetLeft, ownerWindow.parent.innerWidth);
                visibleTop = Math.max(visibleTop + offsetTop, 0);
                visibleBottom = Math.min(visibleBottom + offsetTop, ownerWindow.parent.innerHeight);
            }
            const height = navigation.getBoundingClientRect().height;
            const colors = sourceWindow!.getComputedStyle(container);
            const variables = Object.fromEntries([
                "--color-pdf-border", "--color-pdf-text", "--color-pdf-toolbar",
                "--color-pdf-button-hover", "--color-input-focus-ring",
            ].map(name => [name, colors.getPropertyValue(name)]));
            setPosition({
                ...variables,
                left: `${(visibleLeft + visibleRight) / 2}px`,
                top: `${Math.min(bottom - height - 8, visibleBottom - height - 16)}px`,
                maxWidth: `${Math.max(0, visibleRight - visibleLeft - 16)}px`,
                visibility: visibleRight > visibleLeft && visibleBottom - visibleTop >= height + 24 ? "visible" : "hidden",
            });
        }

        updatePosition();
        for (const ownerWindow of windows) {
            ownerWindow.addEventListener("scroll", updatePosition, true);
            ownerWindow.addEventListener("resize", updatePosition);
        }
        const observer = new ResizeObserver(updatePosition);
        observer.observe(container);
        observer.observe(navigation);
        for (const ownerWindow of windows.slice(0, -1)) {
            if (ownerWindow.frameElement) {
                observer.observe(ownerWindow.frameElement);
            }
        }
        return () => {
            observer.disconnect();
            for (const ownerWindow of windows) {
                ownerWindow.removeEventListener("scroll", updatePosition, true);
                ownerWindow.removeEventListener("resize", updatePosition);
            }
        };
    }, [target, props.containerRef]);

    const navigation = (
        <nav
            aria-label="Paginação do PDF"
            className={styles.pagination()}
            ref={navigationRef}
            style={target ? position : undefined}>
            <button
                aria-label="Página anterior"
                className={styles.button()}
                disabled={props.currentPage <= 1}
                type="button"
                onClick={() => props.onPageChange(Math.max(1, props.currentPage - 1))}>
                <i aria-hidden="true"
                    className="bi bi-chevron-double-left"/>
            </button>
            <span aria-atomic="true"
                aria-live="polite">{props.currentPage} de {props.pages}</span>
            <button
                aria-label="Próxima página"
                className={styles.button()}
                disabled={props.currentPage >= props.pages}
                type="button"
                onClick={() => props.onPageChange(Math.min(props.pages, props.currentPage + 1))}>
                <i aria-hidden="true"
                    className="bi bi-chevron-double-right"/>
            </button>
        </nav>
    );
    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return target ? createPortal(navigation, target) : navigation;
}

PDFPagination.displayName = "PDFPagination";
