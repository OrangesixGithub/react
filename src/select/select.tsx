import React from "react";
import { Box } from "../box";
import { InputLabel } from "../api";
import { SelectProps } from ".";
import { ApiFieldModeProps } from "../api";
import { SelectHookForm } from "./core/hookForm";
import { SelectControlled } from "./core/controlled";

/**
 * Componente - `Select`
 *
 * Um componente versátil que é utilizado para entrada de dados do tipo lista de seleção.
 */
export function Select<T extends ApiFieldModeProps = "Controlled">(props: SelectProps<T> & { mode?: T }) {
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
                ? <SelectControlled {...propsCore}/>
                : <SelectHookForm {...propsCore}/>}
        </Box>
    );
}

Select.displayName = "Select";