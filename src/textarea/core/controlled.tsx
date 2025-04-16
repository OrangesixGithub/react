import React from "react";
import { TextareaProps } from "../types";
import { InputFeedback } from "../../api";
import { InputTextarea, InputTextareaProps } from "primereact/inputtextarea";

type Props = {
    core: InputTextareaProps & { ref: React.Ref<HTMLTextAreaElement> | undefined }
};

/**
 * Core - `TextareaControlled`
 * Define o componente controlled
 */
export function TextareaControlled({ core, ...props }: TextareaProps<"Controlled"> & Props) {
    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return (
        <>
            <InputTextarea {...core}
                           ref={props.ref}
                           value={props.value}
                           onBlur={event => {
                               if (props.onBlur) {
                                   props.onBlur(event.target.value);
                               }
                           }}
                           onChange={event => {
                               if (props.onChange) {
                                   props.onChange(event.target.value);
                               }
                           }}/>
            <InputFeedback {...props}/>
        </>
    );
}