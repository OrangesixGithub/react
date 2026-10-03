import type { ModalTransition } from "../@types";
import type { DialogProps } from "primereact/dialog";

/**
 * Core - `useModalTransiction`
 *
 * Seleciona a animação de abertura e fechamento da modal.
 */
export function useModalTransiction(transition: ModalTransition = "zoom"): DialogProps["transitionOptions"] {
    return {
        classNames: transition === "zoom" ? "os-modal" : `os-modal-${transition}`,
        timeout: { enter: 300, exit: 150 },
    };
}
