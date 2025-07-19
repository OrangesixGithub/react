import React from "react";
import { handleNumber } from "../../utils";
import { handleGetValueNumber } from "../function/handle";
import { InputFilterCoreProps, InputFilterOptionsMap } from "..";

/**
 * Core - `Number`
 * Campo do filtro tipo numero
 */
export function Number<T extends keyof InputFilterOptionsMap>(props: InputFilterCoreProps<T>) {
    return (
        <input className="form-control input-filter-field"
               disabled={props.disabled}
               id={(props.id ?? "input-filter") + "-number"}
               name={(props.name ?? "input-filter") + "-number"}
               placeholder={props.placeholder}
               value={handleGetValueNumber(props.value, props.options ?? "")}
               onChange={event => props.onChange(handleNumber(event.target.value, "decimal", 0) + props.select)}/>
    );
}