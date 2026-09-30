import { TextareaField } from "./field";
import { InputFeedback } from "../../api";
import type { TextareaProps } from "../@types";

/**
 * Core - `TextareaControlled`
 * Renderiza o campo com valor controlado pelo consumidor.
 */
export function TextareaControlled(props: TextareaProps<"Controlled">) {
    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return (
        <>
            <TextareaField
                {...props}
                inputRef={props.ref}
                invalid={Boolean(props.error)}
                onFieldBlur={value => props.onBlur?.(value)}
                onValueChange={value => props.onChange?.(value)}/>
            <InputFeedback {...props}/>
        </>
    );
}

TextareaControlled.displayName = "TextareaControlled";
