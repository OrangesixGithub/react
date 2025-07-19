import Snackbar from "node-snackbar";
import { IUtilsMessage, IUtilsMessageOptions } from ".";
import SweetAlert, { SweetAlertOptions } from "sweetalert2";

/**
 * Envia a mensagem para o evento da janela
 */
export function sendMessage<T extends keyof IUtilsMessageOptions>(params: IUtilsMessage<T>) {
    let Window: Window = window.self === window.top ? window : window.parent;
    const { message, library, type, options } = params;
    Window.postMessage({
        type: "message",
        params: {
            message,
            options,
            type: type ?? "message",
            library: library ?? "snackbar"
        }
    }, "*");
}

/**
 * Retorna o objeto mensagem de acordo com os parâmetros
 */
export function message<T extends keyof IUtilsMessageOptions>(params: IUtilsMessage<T>) {
    let { message, library, type, options } = params;

    library = library ?? "snackbar";
    switch (library) {
        case "sweetAlert":
            let swal: any = {
                icon: message.type,
                title: message.title,
                text: message.text
            };
            if (type === "toast") {
                let config: SweetAlertOptions = options as SweetAlertOptions ?? {
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.onmouseenter = SweetAlert.stopTimer;
                        toast.onmouseleave = SweetAlert.resumeTimer;
                    }
                };
                const Toast = SweetAlert.mixin(config);
                Toast.fire(swal);
            } else {
                SweetAlert.fire({ ...swal, ...options });
            }
            break;
        case "snackbar":
            let config: any = options;
            let text: string = message.message ?? message.text ?? message.title ?? "Não foi possível carregar a mensagem.";
            Snackbar.show(config === undefined ? {
                pos: "top-right",
                showAction: false,
                customClass: message.type,
                text: "<p class='d-flex m-0 align-items-center'><i class='me-2 " + message.icon + "'></i>" + text + "</p>",
            } : config);
            break;
    }
}