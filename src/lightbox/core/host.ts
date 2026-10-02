import { Lightbox as LightboxGallery } from "lightbox3";
import type { LightboxProps } from "../@types";

type GalleryImage = {
    src: string;
    caption: string
};

type GalleryHost = {
    open(images: GalleryImage[], index: number, restoreFocus: () => void, appendTo?: HTMLElement): () => void;
};

type HostWindow = Window & {
    __orangesixLightboxHost?: GalleryHost
};

/**
 * Inicializa a Lightbox3 na janela atual e permite receber galerias de iframes da mesma origem.
 * Chame uma vez na entrada da aplicação principal, após importar o style.css do pacote.
 */
export function initializeLightbox(): void {
    if (typeof window === "undefined") {
        return;
    }
    const hostWindow = window as HostWindow;
    if (hostWindow.__orangesixLightboxHost) {
        return;
    }
    const lightbox = LightboxGallery.init();
    let releasePrevious: (() => void) | undefined;
    let sequence = 0;
    hostWindow.__orangesixLightboxHost = {
        open(images, index, restoreFocus, appendTo = document.body) {
            releasePrevious?.();
            const container = document.createElement("div");
            const group = `orangesix-lightbox-host-${++sequence}`;
            container.hidden = true;
            for (const image of images) {
                const anchor = document.createElement("a");
                anchor.href = image.src;
                anchor.setAttribute("data-lightbox", group);
                anchor.setAttribute("data-title", image.caption);
                container.appendChild(anchor);
            }
            document.body.appendChild(container);
            let released = false;
            let shouldRestoreFocus = true;
            // A Lightbox3 cria o overlay no body. Movê-lo no mesmo documento mantém
            // teclado, medidas do viewport e eventos na janela correta.
            const moveOverlay = () => {
                const overlay = document.querySelector<HTMLElement>(".lightbox3-overlay");
                if (overlay && overlay.parentElement !== appendTo) {
                    appendTo.appendChild(overlay);
                }
            };
            const observer = new MutationObserver(moveOverlay);
            observer.observe(document.body, { childList: true });
            const release = () => {
                if (released) {
                    return;
                }
                released = true;
                lightbox.off("closed", onClosed);
                observer.disconnect();
                container.remove();
                if (releasePrevious === release) {
                    releasePrevious = undefined;
                }
            };
            const onClosed = () => {
                release();
                if (shouldRestoreFocus) {
                    restoreFocus();
                }
            };
            releasePrevious = release;
            lightbox.on("closed", onClosed);
            lightbox.open(group, index);
            moveOverlay();
            return () => {
                if (!released) {
                    shouldRestoreFocus = false;
                    lightbox.close();
                }
            };
        },
    };
}

/** Localiza a janela mais alta acessível que inicializou a integração. */
function findHost(): GalleryHost | undefined {
    let current: Window = window;
    let host: GalleryHost | undefined;
    while (current.parent !== current) {
        try {
            const parent = current.parent as HostWindow;
            // A leitura também verifica a permissão de mesma origem.
            void parent.document;
            host = parent.__orangesixLightboxHost ?? host;
            current = parent;
        } catch {
            break;
        }
    }
    return host;
}

/** Encaminha cliques da galeria ao documento principal e limpa ao desmontar. */
export function connectLightbox(container: HTMLDivElement, appendTo?: LightboxProps["appendTo"]): () => void {
    let disposeGallery: (() => void) | undefined;
    const onClick = (event: MouseEvent) => {
        // Use a janela proprietária: instanceof Element falha entre documentos.
        const target = event.target as Element | null;
        const anchor = target?.closest?.<HTMLAnchorElement>("a[data-lightbox]");
        if (!anchor || !container.contains(anchor)) {
            return;
        }
        const destination = appendTo === "self" ? container : typeof appendTo === "function" ? appendTo() : appendTo;
        const destinationWindow = destination?.ownerDocument.defaultView as HostWindow | null | undefined;
        const host = appendTo === undefined
            ? findHost()
            : (destinationWindow ?? window as HostWindow).__orangesixLightboxHost;
        if (!host) {
            if (destination) {
                event.preventDefault();
                event.stopPropagation();
                console.error("[OrangeSix Lightbox] Chame initializeLightbox() na janela de appendTo antes de abrir a galeria.");
            }
            return;
        }
        event.preventDefault();
        event.stopPropagation();
        const anchors = Array.from(container.querySelectorAll<HTMLAnchorElement>("a[data-lightbox]"));
        disposeGallery = host.open(anchors.map(item => ({
            src: item.href,
            caption: item.getAttribute("data-caption") ?? item.getAttribute("data-title") ?? "",
        })), anchors.indexOf(anchor), () => {
            if (anchor.isConnected) {
                anchor.ownerDocument.defaultView?.focus();
                anchor.focus();
            }
        }, destination ?? undefined);
    };
    const cleanup = () => {
        container.removeEventListener("click", onClick);
        container.ownerDocument.defaultView?.removeEventListener("pagehide", cleanup);
        disposeGallery?.();
    };
    container.addEventListener("click", onClick);
    container.ownerDocument.defaultView?.addEventListener("pagehide", cleanup);
    return cleanup;
}
