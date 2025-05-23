import React from "react";
import { Box } from "../box";
import { InputProps } from "./types";
import { InputHookForm } from "./core/hookForm";
import { ApiFieldModeProps } from "../api/types";
import { PasswordProps } from "primereact/password";
import { InputControlled } from "./core/controlled";
import { InputTextProps } from "primereact/inputtext";
import { InputMaskProps } from "primereact/inputmask";
import { InputLabel, InputProps as getInputProps } from "../api";

/**
 * Componente - `Input`
 *
 * Um componente versátil que é utilizado para entrada de dados simples.
 */
export function Input<T extends ApiFieldModeProps = "Controlled">(props: InputProps<T> & { mode?: T }) {

    let propsCore = props as any;
    let sizes = props.sizes === "small" ? "p-inputtext-sm" : props.sizes === "large" ? "p-inputtext-lg" : "";

    let core: InputTextProps & { ref: React.Ref<HTMLInputElement> | undefined } = {
        ...getInputProps(propsCore),
        className: sizes,
        type: props.type ?? "text",
    };
    let password: PasswordProps = {
        appendTo: "self",
        feedback: props.passwordFeedback,
        footer: props.passwordFooterTemplate,
        header: props.passwordHeaderTemplate,
        mediumLabel: "Média",
        promptLabel: "Por favor, insira uma senha",
        pt: { input: { className: "w-100" } },
        strongLabel: "Forte",
        toggleMask: props.passwordShow,
        weakLabel: "Fraca",
        content: props.passwordTemplate
    };
    let mask: InputMaskProps = {
        mask: props.mask === "cpf"
            ? "999.999.999-99"
            : props.mask === "cnpj"
                ? "99.999.999/9999-99"
                : props.mask,
        autoClear: props.maskAutoClear
    };

    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return (
        <Box className={props.className}
             css={props.css}
             size={props.size ?? "100"}>
            <InputLabel {...props}/>
            {!props.mode || props.mode === "Controlled"
                ? <InputControlled core={core}
                                   masker={mask}
                                   password={password}
                                   {...propsCore}/>
                : <InputHookForm core={core}
                                 masker={mask}
                                 password={password}
                                 {...propsCore}/>}
        </Box>
    );
}