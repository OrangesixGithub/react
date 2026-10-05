import type { SweetAlertOptions } from "sweetalert2";
import type { IUtilsResponseMessage } from "./response";

/**
 * Retorna os tipos do arquivo <b>message.ts</b>
 *
 * @module utils
 * @author Luiz Fernando Bernardes de Paula
 */
export interface IUtilsMessage<T extends keyof IUtilsMessageOptions> {
    message: IUtilsResponseMessage,
    type?: "toast" | "message",
    options?: IUtilsMessageOptions[T],
    library?: keyof IUtilsMessageOptions
}

export interface IUtilsMessageOptions {
    sweetAlert: SweetAlertOptions,
    snackbar: IUtilsSnackbarOptions
}

/**
 * Opções da node-snackbar (substituem o card padrão quando informadas).
 * `text` é inserido como HTML: não use com conteúdo vindo do usuário sem escapar.
 */
export interface IUtilsSnackbarOptions {
    text?: string
    textColor?: string
    pos?: "bottom-left" | "bottom-center" | "bottom-right" | "top-left" | "top-center" | "top-right"
    customClass?: string
    width?: string
    showAction?: boolean
    actionText?: string
    actionTextColor?: string
    backgroundColor?: string
    duration?: number
    onActionClick?: (element: HTMLElement) => void
    onClose?: (element: HTMLElement) => void
}
