import React from "react";
import { ApiComponentProps, ApiFieldComponentProps } from ".";

/**
 * API - `InputLabel`
 *
 * Um componente utilizado como label em todos os componente de entrada de dados do pacote.
 * Permite personalizar o estilo e o conteúdo através de propriedades.
 */
export const InputLabel = ({ iconPrefix = "bi bi-", ...props }: ApiFieldComponentProps) => {
    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return props.label
        && <p className='form-label'>
            {props.icon && <i className={iconPrefix + props.icon + " me-1"}/>}
            {props.label}
            {props.required && <span className="text-danger">*</span>}
        </p>;
};

/**
 * API - `InputFeedback`
 *
 * Um componente utilizado como container de feedback em todos os componente de entrada de dados do pacote.
 * Permite personalizar o estilo e o conteúdo através de propriedades.
 */
export const InputFeedback = ({ errors, name, ...props }: ApiFieldComponentProps & { errors?: any }) => {
    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return !props.mode || props.mode === "Controlled"
        ? <div data-name={name}
               id="j_feedback"/>
        : <div className={(!errors[name ?? ""] ? "" : "invalid-feedback is-invalid")}
               data-name={name ?? ""}
               id="j_feedback"
               style={{ display: errors[name ?? ""] ? "block" : "none" }}>{!errors[name ?? ""] ? "" : errors[name ?? ""].message}</div>;
};

/**
 * API - `InputProps`
 *
 * Retorna o objeto com as `Props` do core dos componentes de entrada de dados
 */
export function InputProps<T extends ApiComponentProps & ApiFieldComponentProps & { ref: any }>(props: T) {
    return {
        ref: props.ref,

        id: props.id,
        name: props.name,
        required: props.required,
        disabled: props.disabled,
        placeholder: props.placeholder,

        className: props.className,
        style: { width: "100%" },

        keyfilter: props.keyfilter,
    };
}