import Snackbar from "node-snackbar";
import { snackbarIcons, snackbarVariants } from "./variants";
import { IUtilsMessage, IUtilsMessageOptions, IUtilsResponseMessage } from ".";
import SweetAlert, { SweetAlertOptions } from "sweetalert2";

/**
 * Envia a mensagem para o evento da janela
 * Dentro de um iframe, envia para a janela pai (somente na mesma origem), que registra `windowMessageEvent()`.
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
    }, "/"); // "/" = somente a mesma origem desta página
}

/**
 * Retorna o objeto mensagem de acordo com os parâmetros
 */
export function message<T extends keyof IUtilsMessageOptions>(params: IUtilsMessage<T>) {
    let { message, library, type, options } = params;

    library = library ?? "snackbar";
    switch (library) {
        case "sweetAlert":
            // titleText/text são texto puro (title do SweetAlert2 aceita HTML); options pode sobrescrever, ex.: html
            let swal: SweetAlertOptions = {
                icon: message.type,
                titleText: message.title,
                text: message.text ?? message.message
            };
            if (type === "toast") {
                if (options !== undefined) {
                    // Configuração própria do consumidor: mantém o comportamento da 2.x
                    SweetAlert.mixin(options as SweetAlertOptions).fire(swal);
                } else {
                    // Toast no tema da Orange Six: o mesmo card da snackbar (estilos em style/components/sweetalert.css)
                    const kind = snackbarType(message);
                    SweetAlert.fire({
                        toast: true,
                        position: "top-end",
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        html: snackbarHtml(message),
                        customClass: { popup: "os-swal-toast os-swal-" + kind },
                        didOpen: (toast) => {
                            toast.onmouseenter = SweetAlert.stopTimer;
                            toast.onmouseleave = SweetAlert.resumeTimer;
                        }
                    });
                }
            } else {
                SweetAlert.fire({ ...swal, ...options } as SweetAlertOptions);
            }
            break;
        case "snackbar":
            let config: any = options;
            Snackbar.show(config === undefined ? {
                pos: "top-right",
                showAction: false,
                backgroundColor: "transparent",
                textColor: "inherit",
                customClass: "os-snackbar " + (message.type ?? "info"),
                text: snackbarHtml(message),
            } : config);
            break;
    }
}

/**
 * Tipo da mensagem usado no card; desconhecido ou ausente vira "info".
 */
function snackbarType(message: IUtilsResponseMessage): keyof typeof snackbarIcons {
    return message.type && message.type in snackbarIcons ? message.type : "info";
}

/**
 * Monta o card da snackbar (também usado no toast do SweetAlert): ícone, título (opcional) e texto, escapados.
 */
function snackbarHtml(message: IUtilsResponseMessage): string {
    const type = snackbarType(message);
    const styles = snackbarVariants({ type });
    const text = message.message ?? message.text;
    const title = message.title ?? (text ? undefined : "Não foi possível carregar a mensagem.");

    return "<div class=\"" + styles.root() + "\" role=\"status\">"
        + "<i aria-hidden=\"true\" class=\"" + escapeHtml(styles.icon() + " " + (message.icon ?? snackbarIcons[type])) + "\"></i>"
        + "<div class=\"" + styles.content() + "\">"
        + (title ? "<strong class=\"" + styles.title() + "\">" + escapeHtml(title) + "</strong>" : "")
        + (text ? "<span class=\"" + styles.text() + "\">" + escapeHtml(text) + "</span>" : "")
        + "</div></div>";
}

/**
 * Escapa o texto antes de ir para o HTML da snackbar (o node-snackbar usa innerHTML).
 */
function escapeHtml(value: string): string {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}
