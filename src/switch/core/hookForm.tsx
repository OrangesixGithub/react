import React from "react";
import { SwitchProps } from "..";
import { InputFeedback } from "../../api";
import { Controller } from "react-hook-form";
import { InputSwitch } from "primereact/inputswitch";

/**
 * Core - `SwitchHookForm`
 * Define o componente utilizando o HookForm
 */
export function SwitchHookForm({ ...props }: SwitchProps<"HookForm">) {
    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return (
        <Controller render={({ field, formState: { errors } }) => {
            return <>
                <div className="w-100 d-flex">
                    <InputSwitch checked={field.value}
                                 disabled={props.disabled}
                                 falseValue={props.valueFalse ?? false}
                                 id={props.id}
                                 name={field.name}
                                 trueValue={props.valueTrue ?? true}
                                 onChange={event => field.onChange(event)}/>
                    {props.legend && <p className="ms-2 p-inputswitch-legend">{props.legend}</p>}
                </div>
                <InputFeedback {...props}
                               errors={errors}/>
            </>;
        }}
                    control={props.control}
                    name={props.name}/>
    );
}