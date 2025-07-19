import React from "react";
import { handleGetValueText } from "../function/handle";
import { InputFilterCoreProps, InputFilterOptionsMap } from "..";

/**
 * Core - `Text`
 * Campo do filtro tipo texto
 */
export function Text<T extends keyof InputFilterOptionsMap>(props: InputFilterCoreProps<T>) {
    return (
        <input className="form-control input-filter-field"
               disabled={props.disabled}
               id={(props.id ?? "input-filter") + "-text"}
               name={(props.name ?? "input-filter") + "-text"}
               placeholder={props.placeholder}
               value={handleGetValueText(props.value, props.options) ?? ""}
               onChange={event => props.onChange(event.target.value + props.select)}/>
    );
}