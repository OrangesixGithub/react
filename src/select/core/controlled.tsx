import React from "react";
import { SelectProps } from "..";
import { InputFeedback } from "../../api";

/**
 * Core - `SelectControlled`
 * Define o componente controlled
 */
export function SelectControlled(props: SelectProps<"Controlled"> & { mode?: any }) {
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
        <>
            <select className={`form-select ${sizes}`}
                    disabled={props.disabled}
                    id={props.id}
                    name={props.name}
                    ref={props.ref}
                    required={props.required}
                    value={props.value}
                    onChange={event => {
                        if (props.onChange) {
                            props.onChange(event.target.value);
                        }
                    }}>
                {init}
                {props.options.map((item) => (
                    <option disabled={item.disabled}
                            key={item.id}
                            value={item.id}>{item.name}</option>
                ))}
            </select>
            <InputFeedback {...props}/>
        </>
    );
}