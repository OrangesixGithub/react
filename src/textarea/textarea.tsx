import React from "react";
import { Box } from "../box";
import { TextareaProps } from "./types";
import { InputLabel, InputProps } from "../api";
import { ApiFieldModeProps } from "../api/types";
import { TextareaHookForm } from "./core/hookForm";
import { TextareaControlled } from "./core/controlled";
import { InputTextareaProps } from "primereact/inputtextarea";

/**
 * Componente - `Textarea`
 *
 * Um componente versátil que é utilizado para entrada de dados simples.
 */
export function Textarea<T extends ApiFieldModeProps = "Controlled">(props: TextareaProps<T> & { mode?: T }) {

    let propsCore = props as any;
    let core: InputTextareaProps & { ref: React.Ref<any> | undefined } = {
        ...InputProps(propsCore),
        autoResize: props.autoResize
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
                ? <TextareaControlled core={core}
                                      {...propsCore}/>
                : <TextareaHookForm core={core}
                                    {...propsCore}/>}
        </Box>
    );
}

Textarea.displayName = "Textarea";