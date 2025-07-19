import React from "react";
import { SelectProps } from "..";
import { InputFeedback } from "../../api";
import { Controller } from "react-hook-form";

/**
 * Core - `SelectHookForm`
 * Define o componente controlled
 */
export function SelectHookForm(props: SelectProps<"HookForm"> & { mode?: any }) {
    let init = !props.init
        ? null
        : (typeof props.init === "boolean"
            ? <option value=''>Selecione {props.label?.toLowerCase() ?? ""}</option>
            : <option value=''>{props.init}</option>);
    let sizes = props.sizes === "small" ? "form-select-sm" : props.sizes === "large" ? "form-select-lg" : "";

    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return (
        <Controller render={({ field, formState: { errors } }) => {
            return (
                <>
                    <select {...field}
                            className={`form-select ${sizes}`}
                            disabled={props.disabled}
                            id={props.id}
                            ref={props.ref}
                            onChange={event => props.onChange ? props.onChange(event.target.value) : field.onChange(event)}>
                        {init}
                        {props.options.map((item) => (
                            <option disabled={item.disabled}
                                    key={item.id}
                                    value={item.id}>{item.name}</option>
                        ))}
                    </select>
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