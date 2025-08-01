import $ from "jquery";
import { sendMessage } from "./message";
import { getElementDOM } from "./helper";
import { IUtilsResponseType, IUtilsResponseError } from ".";

/**
 * Realizei o gerenciamento do objeto de resposta
 */
export function response<Type>(
    response: IUtilsResponseType<Type>,
    form: string = ""
): void {
    let data: IUtilsResponseType<Type> = response;
    if (!data) {
        return;
    }

    if (data.redirect) {
        window.location.href = data.redirect;
    }

    if (data.errors) {
        messageField(data.errors, form.length === 0 ? "" : form);
    }

    if (data.accept) {
        messageField(data.accept, form.length === 0 ? "" : form, "is-valid");
    }

    if (data.message && data?.errors === undefined) {
        sendMessage<"snackbar">({
            message: { ...data.message },
            type: "message",
            library: "snackbar"
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
    if (form.length > 0) {
        getElementDOM<HTMLFormElement>("#" + form)
            .then(formulario => {
                if (formulario === null) {
                    return;
                }

                let form = $(formulario);
                let validationFeedbackClass: string = type === "is-invalid" ? "invalid-feedback" : "valid-feedback";
                let removeValidationFeedbackClass: string = type === "is-invalid" ? "is-valid" : "is-invalid";

                $.each(data, (key: string, value) => {
                    let text = "";
                    value.forEach(value => text += value + "<br>");

                    form.find("input[name='" + key + "']")
                        .addClass(type)
                        .parent()
                        .find("#j_feedback[data-name='" + key + "']")
                        .addClass(validationFeedbackClass)
                        .removeClass(removeValidationFeedbackClass)
                        .html(text);

                    form.find("input[name='" + key + "']")
                        .addClass(type)
                        .parent()
                        .parent()
                        .find("#j_feedback[data-name='" + key + "']")
                        .addClass(validationFeedbackClass)
                        .removeClass(removeValidationFeedbackClass)
                        .html(text);

                    form.find("input[name='" + key + "']")
                        .addClass(type)
                        .parent()
                        .parent()
                        .parent()
                        .find("#j_feedback[data-name='" + key + "']")
                        .addClass(validationFeedbackClass)
                        .removeClass(removeValidationFeedbackClass)
                        .html(text);

                    form.find("select[name='" + key + "']")
                        .addClass(type)
                        .parent()
                        .find("#j_feedback[data-name='" + key + "']")
                        .addClass(validationFeedbackClass)
                        .removeClass(removeValidationFeedbackClass)
                        .html(text);

                    form.find("textarea[name='" + key + "']")
                        .addClass(type)
                        .parent()
                        .find("#j_feedback[data-name='" + key + "']")
                        .addClass(validationFeedbackClass)
                        .removeClass(removeValidationFeedbackClass)
                        .html(text);

                    form.find("#j_feedback[data-name='" + key + "']")
                        .addClass(type)
                        .html(text);
                });
            });
    }
}

/**
 * Limpar as mensagens de feedback do formulário
 */
export function messageFieldClear(
    form: string = ""
): void {
    if (form.length > 0) {
        getElementDOM<HTMLFormElement>("#" + form)
            .then(formulario => {
                if (formulario === null) {
                    return;
                }

                let form = $(formulario);
                let validationClass: string[] = ["is-invalid", "is-valid", "p-invalid"];
                let validationFeedbackClass: string[] = ["invalid-feedback", "valid-feedback"];

                $.each(form.find("input"), function () {
                    $(this)
                        .removeClass(validationClass)
                        .parent()
                        .find("#j_feedback")
                        .removeClass(validationFeedbackClass)
                        .html("");

                    $(this)
                        .removeClass(validationClass)
                        .parent()
                        .parent()
                        .find("#j_feedback")
                        .removeClass(validationFeedbackClass)
                        .html("");

                    $(this)
                        .removeClass(validationClass)
                        .parent()
                        .parent()
                        .parent()
                        .find("#j_feedback")
                        .removeClass(validationFeedbackClass)
                        .html("");
                });

                $.each(form.find("select"), function () {
                    $(this)
                        .removeClass(validationClass)
                        .parent()
                        .find("#j_feedback")
                        .removeClass(validationFeedbackClass)
                        .html("");
                });

                $.each(form.find("textarea"), function () {
                    $(this)
                        .removeClass(validationClass)
                        .parent()
                        .find("#j_feedback")
                        .removeClass(validationFeedbackClass)
                        .html("");
                });

                $.each(form.find("#j_feedback"), function () {
                    $(this).removeClass(validationClass).html("");
                });
            });
    }
}