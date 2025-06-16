import React from "react";
import { TextareaProps } from "../types";
import { InputFeedback } from "../../api";
import { Controller } from "react-hook-form";
import { InputTextarea, InputTextareaProps } from "primereact/inputtextarea";

type Props = {
    core: InputTextareaProps & { ref: React.Ref<HTMLInputElement> | undefined }
};

/**
 * Core - `TextareaHookForm`
 * Define o componente utilizando o HookForm
 */
export function TextareaHookForm({ core, ...props }: TextareaProps<"HookForm"> & Props) {
    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return (
        <Controller render={({ field, formState: { errors } }) => {
            return <>
                <InputTextarea {...core}
                               {...field}
                               invalid={!!errors[props.name]}
                               ref={props.ref}
                               required={props.required}
                               value={field.value ?? ""}
                               onBlur={e => props.onBlur ? props.onBlur(e.target.value) : field.onBlur()}
                               onChange={e => props.onChange !== undefined ? props.onChange(e.target.value) : field.onChange(e)}/>
                <InputFeedback {...props}
                               errors={errors}/>
            </>;
        }}
                    control={props.control}
                    name={props.name}
                    rules={{ required: !props.required ? false : "Campo obrigatório" }}/>

    );
}