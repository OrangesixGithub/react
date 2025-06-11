import React from "react";
import { Box } from "../box";
import { InputLabel } from "../api";
import { SwitchProps } from "./types";
import { ApiFieldModeProps } from "../api/types";
import { SwitchHookForm } from "./core/hookForm";
import { SwitchControlled } from "./core/controlled";

/**
 * Componente - `Switch`
 *
 * Um componente versátil que é utilizado para entrada de dados do tipo booleano.
 */
export function Switch<T extends ApiFieldModeProps = "Controlled">(props: SwitchProps<T> & { mode?: T }) {
    let propsCore = props as any;

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
                ? <SwitchControlled {...propsCore}/>
                : <SwitchHookForm {...propsCore}/>}
        </Box>
    );
}

Switch.displayName = "Switch";