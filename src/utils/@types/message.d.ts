import { SweetAlertOptions } from "sweetalert2";

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
    snackbar: SnackbarOptions
}