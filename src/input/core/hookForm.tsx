import React from "react";
import { InputProps } from "../types";
import { InputFeedback } from "../../api";
import { Controller } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { Password, PasswordProps } from "primereact/password";
import { InputMask, InputMaskProps } from "primereact/inputmask";

type Props = {
    masker: InputMaskProps
    password: PasswordProps
    core: any & { ref: React.Ref<HTMLInputElement> | undefined }
};

/**
 * Core - `InputHookForm`
 * Define o componente utilizando o HookForm
 */
export function InputHookForm({ core, password, masker, ...props }: InputProps<"HookForm"> & Props) {
    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return (
        <Controller render={({ field, formState: { errors } }) => {
            return (
                <>
                    {props.mask !== undefined
                        ? <InputMask {...core}
                                     {...field}
                                     {...masker}
                                     invalid={!!errors[props.name]}
                                     readOnly={props.readonly}
                                     required={props.required}
                                     onBlur={e => props.onBlur ? props.onBlur(e.target.value) : field.onBlur()}
                                     onChange={e => props.onChange !== undefined ? props.onChange(e.target.value) : field.onChange(e)}/>
                        : (props.type === "password"
                            ? <Password {...core}
                                        {...field}
                                        {...password}
                                        autoComplete="current-password"
                                        invalid={!!errors[props.name]}
                                        readOnly={props.readonly}
                                        required={props.required}
                                        onBlur={e => props.onBlur ? props.onBlur(e.target.value) : field.onBlur()}
                                        onChange={e => props.onChange !== undefined ? props.onChange(e.target.value) : field.onChange(e)}/>
                            : <InputText {...core}
                                         {...field}
                                         invalid={!!errors[props.name]}
                                         readOnly={props.readonly}
                                         ref={props.ref}
                                         required={props.required}
                                         onBlur={e => props.onBlur ? props.onBlur(e.target.value) : field.onBlur()}
                                         onChange={e => props.onChange !== undefined ? props.onChange(e.target.value) : field.onChange(e)}/>)}
                    <InputFeedback {...props}
                                   errors={errors}/>
                </>
            );
        }}
                    control={props.control}
                    name={props.name}
                    rules={{ required: !props.required ? false : "Campo obrigatório" }}/>

    );
}