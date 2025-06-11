import React from "react";
import { Box } from "../box";
import { RadioProps } from "./types";
import { InputLabel, InputProps } from "../api";
import { RadioHookForm } from "./core/hookForm";
import { ApiFieldModeProps } from "../api/types";
import { RadioControlled } from "./core/controlled";

/**
 * Componente - `Radio`
 *
 * Um componente versátil que é utilizado para entrada de dados de multipla escolha.
 */
export function Radio<T extends ApiFieldModeProps = "Controlled">(props: RadioProps<T> & { mode?: T }) {
    let propsCore = props as any;
    let core = {
        ...InputProps(propsCore)
    };

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
                ? <RadioControlled core={core}
                                   {...propsCore}/>
                : <RadioHookForm core={core}
                                 {...propsCore}/>}
        </Box>
    );
}

Radio.displayName = "Radio";