import { sendMessage } from "./message";
import * as Document from "./core/document";
import { responseVariants } from "./variants";
import { IUtilsMessageOptions, IUtilsResponseType, IUtilsResponseError, IUtilsResponseField } from ".";

/**
 * Atributo que identifica o que foi marcado pelo `response()`, para limpar só o que foi aplicado aqui.
 */
const MARK = "data-os-response";

/**
 * Classes do padrão 2.x (Bootstrap), mantidas para as telas que ainda não foram migradas.
 */
const LEGACY_CONTROL = ["is-invalid", "is-valid", "p-invalid"];
const LEGACY_FEEDBACK = ["invalid-feedback", "valid-feedback"];

/**
 * Realizei o gerenciamento do objeto de resposta
 */
export function response<Type>(
    response: IUtilsResponseType<Type>,
    form: string = "",
    library: keyof IUtilsMessageOptions = "snackbar"
): void {
    let data: IUtilsResponseType<Type> = response;
    if (!data) {
        return;
    }

    if (data.redirect) {
        // Só http(s) e caminhos relativos: bloqueia "javascript:" e afins
        Document.redirectDocument(data.redirect);
    }

    if (data.errors) {
        messageField(data.errors, form);
    }

    if (data.accept) {
        messageField(data.accept, form, "is-valid");
    }

    if (data.field) {
        messageFieldResponse(data.field, form);
    }

    if (data.message && data?.errors === undefined) {
        // SweetAlert aparece como toast no canto (mesmo card da snackbar)
        sendMessage({
            message: { ...data.message },
            type: library === "sweetAlert" ? "toast" : "message",
            library
        });
    }
}

/**
 * Aplica o retorno `field`: mensagem no campo conforme `messageType` e, se informado, `disabled`.
 */
function messageFieldResponse(
    field: IUtilsResponseField,
    form: string = ""
): void {
    const message = typeof field.message === "string"
        ? { [field.field]: [field.message] }
        : field.message;

    if (message) {
        messageField(message, form, field.messageType === "is-valid" ? "is-valid" : "is-invalid");
    }

    if (typeof field.disabled === "boolean" && form.length > 0) {
        Document.findFormDocument(form).then(formulario => {
            if (formulario !== null) {
                Document.disabledFieldDocument(formulario, field.field, field.disabled as boolean);
            }
        });
    }
}

/**
 * Exibe a mensagem no campo do formulário
 */
export function messageField(
    data: IUtilsResponseError,
    form: string = "",
    type: string = "is-invalid"
): void {
    if (form.length === 0) {
        return;
    }

    Document.findFormDocument(form).then(formulario => {
        if (formulario === null) {
            return;
        }

        const invalid = type === "is-invalid";
        const styles = responseVariants({ type: invalid ? "is-invalid" : "is-valid" });
        const opposite = responseVariants({ type: invalid ? "is-valid" : "is-invalid" });

        Object.entries(data).forEach(([key, value]) => {
            const name = CSS.escape(key);
            const feedbacks = formulario.querySelectorAll<HTMLElement>(
                `#j_feedback[data-name="${name}"], [id$="-feedback"][data-name="${name}"]`
            );

            // Campos do formulário (input, select, textarea) e os controles ligados ao feedback (aria-describedby)
            const controls = new Set<Element>(formulario.querySelectorAll(`[name="${name}"]:not([type="hidden"])`));
            feedbacks.forEach(feedback => {
                if (feedback.id && feedback.id !== "j_feedback") {
                    formulario.querySelectorAll(`[aria-describedby~="${CSS.escape(feedback.id)}"]`)
                        .forEach(control => controls.add(control));
                }
            });

            controls.forEach(control => {
                control.classList.add(type);
                Document.removeClassesDocument(control, opposite.control());
                Document.addClassesDocument(control, styles.control());
                if (invalid) {
                    control.setAttribute("aria-invalid", "true");
                } else {
                    control.removeAttribute("aria-invalid");
                }
                control.setAttribute(MARK, "");
            });

            feedbacks.forEach(feedback => {
                Document.setLinesDocument(feedback, Array.isArray(value) ? value : [String(value)]);
                if (feedback.id === "j_feedback") {
                    feedback.classList.add(type, invalid ? "invalid-feedback" : "valid-feedback");
                    feedback.classList.remove(invalid ? "valid-feedback" : "invalid-feedback");
                } else {
                    Document.addClassesDocument(feedback, styles.feedback());
                    feedback.setAttribute(MARK, "");
                }

                // Destaca a aba (TabView) que contém o campo, quando ela não está selecionada
                if (invalid) {
                    const tab = Document.findTabDocument(formulario, feedback);
                    if (tab) {
                        Document.addClassesDocument(tab, styles.tab());
                        tab.setAttribute(MARK, "");

                        // 2.x: a classe ficava no <li> do cabeçalho
                        const header = tab.closest("li") ?? tab;
                        header.classList.add(type);
                        header.setAttribute(MARK, "");
                    }
                }
            });
        });
    });
}

/**
 * Limpar as mensagens de feedback do formulário
 */
export function messageFieldClear(
    form: string = ""
): void {
    if (form.length === 0) {
        return;
    }

    Document.findFormDocument(form).then(formulario => {
        if (formulario === null) {
            return;
        }

        const styles = [
            responseVariants({ type: "is-invalid" }),
            responseVariants({ type: "is-valid" }),
        ];

        formulario.querySelectorAll("input, select, textarea").forEach(control => {
            control.classList.remove(...LEGACY_CONTROL);
        });

        formulario.querySelectorAll<HTMLElement>("#j_feedback").forEach(feedback => {
            feedback.classList.remove(...LEGACY_CONTROL, ...LEGACY_FEEDBACK);
            feedback.replaceChildren();
        });

        formulario.querySelectorAll<HTMLElement>(`[${MARK}]`).forEach(element => {
            styles.forEach(style => {
                Document.removeClassesDocument(element, style.control());
                Document.removeClassesDocument(element, style.feedback());
                Document.removeClassesDocument(element, style.tab());
            });
            element.classList.remove(...LEGACY_CONTROL);
            if (element.id.endsWith("-feedback")) {
                element.replaceChildren();
            } else {
                element.removeAttribute("aria-invalid");
            }
            element.removeAttribute(MARK);
        });
    });
}
