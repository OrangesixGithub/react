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
    tabViewActiveError(form, data);
    getElementDOM("#" + form)
        .then(formulario => {
            if (formulario === null) {
                return;
            }

            let validationFeedbackClass: string = type === "is-invalid" ? "invalid-feedback" : "valid-feedback";
            let removeValidationFeedbackClass: string = type === "is-invalid" ? "is-valid" : "is-invalid";

            $.each(data, (key: string, value) => {
                let text = "";
                value.forEach(value => text += value + "<br>");

                formulario.find("input[name='" + key + "']")
                    .addClass(type)
                    .parent()
                    .find("#j_feedback[data-name='" + key + "']")
                    .addClass(validationFeedbackClass)
                    .removeClass(removeValidationFeedbackClass)
                    .html(text);

                formulario.find("input[name='" + key + "']")
                    .addClass(type)
                    .parent()
                    .parent()
                    .find("#j_feedback[data-name='" + key + "']")
                    .addClass(validationFeedbackClass)
                    .removeClass(removeValidationFeedbackClass)
                    .html(text);

                formulario.find("input[name='" + key + "']")
                    .addClass(type)
                    .parent()
                    .parent()
                    .parent()
                    .find("#j_feedback[data-name='" + key + "']")
                    .addClass(validationFeedbackClass)
                    .removeClass(removeValidationFeedbackClass)
                    .html(text);

                formulario.find("select[name='" + key + "']")
                    .addClass(type)
                    .parent()
                    .find("#j_feedback[data-name='" + key + "']")
                    .addClass(validationFeedbackClass)
                    .removeClass(removeValidationFeedbackClass)
                    .html(text);

                formulario.find("textarea[name='" + key + "']")
                    .addClass(type)
                    .parent()
                    .find("#j_feedback[data-name='" + key + "']")
                    .addClass(validationFeedbackClass)
                    .removeClass(removeValidationFeedbackClass)
                    .html(text);

                formulario.find("#j_feedback[data-name='" + key + "']")
                    .addClass(type)
                    .html(text);
            });
        });
}

/**
 * Limpar as mensagens de feedback do formulário
 */
export function messageFieldClear(
    form: string = ""
): void {
    getElementDOM("#" + form)
        .then(formulario => {
            if (formulario === null) {
                return;
            }

            let validationClass: string[] = ["is-invalid", "is-valid", "p-invalid"];
            let validationFeedbackClass: string[] = ["invalid-feedback", "valid-feedback"];

            $.each(formulario.find("input"), function () {
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

            $.each(formulario.find("select"), function () {
                $(this)
                    .removeClass(validationClass)
                    .parent()
                    .find("#j_feedback")
                    .removeClass(validationFeedbackClass)
                    .html("");
            });

            $.each(formulario.find("textarea"), function () {
                $(this)
                    .removeClass(validationClass)
                    .parent()
                    .find("#j_feedback")
                    .removeClass(validationFeedbackClass)
                    .html("");
            });

            $.each(formulario.find("#j_feedback"), function () {
                $(this).removeClass(validationClass).html("");
            });
        });
}

/**
 * Ativa o TabView quando o campo apresenta erro
 */
export function tabViewActiveError(
    form: string = "",
    errors: IUtilsResponseError
): void {
    getElementDOM("#" + form)
        .then(TabView => {
            if (TabView === null) {
                return;
            }

            let fieldError = Object.keys(errors)[0];

            let TabViewSelected = TabView.find("*[id='" + fieldError + "']").closest(".tab-pane");
            let TabViewSelectedId = TabViewSelected.attr("id");
            let TabViewNav = TabViewSelected.parent().parent().find(".nav");

            TabViewSelected.parent(".tab-content").children(".tab-pane").each(function (_, value) {
                if (typeof value !== "undefined") {
                    if ($(value).attr("id") === TabViewSelectedId) {
                        $(value).addClass("show active");
                        TabViewNav.find("button[data-bs-target='#" + TabViewSelectedId + "']").addClass("active show");
                    } else {
                        $(value).removeClass("show active");
                        TabViewNav.find("button[data-bs-target='#" + $(value).attr("id") + "']").removeClass("active");
                    }
                }
            });
        });
}