import React from "react";
import { SwitchProps } from "../types";
import { InputFeedback } from "../../api";
import { InputSwitch } from "primereact/inputswitch";

/**
 * Core - `SwitchControlled`
 * Define o componente controlled
 */
export function SwitchControlled({ ...props }: SwitchProps<"Controlled">) {
    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return <>
        <div className="w-100 d-flex">
            <InputSwitch checked={props.value}
                         disabled={props.disabled}
                         falseValue={props.valueFalse ?? false}
                         id={props.id}
                         name={props.name}
                         trueValue={props.valueTrue ?? true}
                         onChange={event => {
                             if (props.onChange) {
                                 props.onChange(event.target.value);
                             }
                         }}/>
            {props.legend && <p className="ms-2 p-inputswitch-legend">{props.legend}</p>}
        </div>
        <InputFeedback {...props}/>
    </>;
}