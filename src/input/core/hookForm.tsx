import React from "react";
import { InputProps } from "..";
import { InputFeedback } from "../../api";
import { Controller } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
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
    const { type, ...coreNumber } = core;
    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return (
        <Controller
            render={({ field, formState: { errors } }) => {
                return (
                    <>
                        {props.mask !== undefined
                            ? <InputMask
                                {...core}
                                {...field}
                                {...masker}
                                invalid={!!errors[props.name]}
                                readOnly={props.readonly}
                                ref={props.ref}
                                required={props.required}
                                value={field.value ?? ""}
                                onBlur={e => props.onBlur ? props.onBlur(e.target.value) : field.onBlur()}
                                onChange={e => props.onChange !== undefined ? props.onChange(e.target.value) : field.onChange(e)}/>
                            : (props.type === "password"
                                ? <Password
                                    {...core}
                                    {...field}
                                    {...password}
                                    autoComplete="current-password"
                                    invalid={!!errors[props.name]}
                                    readOnly={props.readonly}
                                    ref={props.ref}
                                    required={props.required}
                                    value={field.value ?? ""}
                                    onBlur={e => props.onBlur ? props.onBlur(e.target.value) : field.onBlur()}
                                    onChange={e => props.onChange !== undefined ? props.onChange(e.target.value) : field.onChange(e)}/>
                                : (props.type === "number"
                                    ? <InputNumber
                                        {...coreNumber}
                                        {...field}
                                        currency={props.numberCurrency ?? "BRL"}
                                        invalid={!!errors[props.name]}
                                        locale="pt-BR"
                                        max={props.numberMax}
                                        maxFractionDigits={props.numberMaxFractionDigits}
                                        min={props.numberMin}
                                        minFractionDigits={props.numberMinFractionDigits}
                                        mode={props.numberMode}
                                        prefix={props.numberPrefix}
                                        pt={{ input: { root: { className: "w-100" } } }}
                                        readOnly={props.readonly}
                                        ref={props.ref}
                                        suffix={props.numberSuffix}
                                        useGrouping={props.numberDecimalSeparator ?? false}
                                        value={field.value ?? ""}
                                        onBlur={e => props.onBlur ? props.onBlur(e.target.value) : field.onBlur()}
                                        onChange={e => props.onChange !== undefined ? props.onChange(e.value) : field.onChange(e.value)}/>
                                    : <InputText
                                        {...core}
                                        {...field}
                                        invalid={!!errors[props.name]}
                                        readOnly={props.readonly}
                                        ref={props.ref}
                                        required={props.required}
                                        value={field.value ?? ""}
                                        onBlur={e => props.onBlur ? props.onBlur(e.target.value) : field.onBlur()}
                                        onChange={e => props.onChange !== undefined ? props.onChange(e.target.value) : field.onChange(e)}/>
                                ))}
                        <InputFeedback
                            {...props}
                            errors={errors}/>
                    </>
                );
            }}
            control={props.control}
            name={props.name}
            rules={{ required: !props.required ? false : "Campo obrigatório" }}/>
    );
}