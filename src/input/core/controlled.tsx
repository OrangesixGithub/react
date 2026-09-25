import { InputField } from "./field";
import { InputFeedback } from "../../api";
import type { InputProps } from "../@types";

/**
 * Core - `InputControlled`
 * Renderiza o campo com valor controlado pelo consumidor.
 */
export function InputControlled(props: InputProps<"Controlled">) {
    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return (
        <>
            <InputField
                {...props}
                inputRef={props.ref}
                invalid={Boolean(props.error)}
                onFieldBlur={value => props.onBlur?.(value)}
                onValueChange={value => props.onChange?.(value)}/>
            <InputFeedback
                {...props}
                className="mt-1 text-xs text-red-600 dark:text-red-400"/>
        </>
    );
}
