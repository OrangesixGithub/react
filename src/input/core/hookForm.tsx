import { Controller } from "react-hook-form";
import { InputField } from "./field";
import { InputFeedback } from "../../api";
import type { Ref } from "react";
import type { InputProps } from "../@types";

/**
 * Core - `InputHookForm`
 * Liga o campo ao React Hook Form e preserva os callbacks públicos.
 */
export function InputHookForm(props: InputProps<"HookForm">) {
    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return (
        <Controller
            render={({ field, fieldState, formState }) => (
                <>
                    <InputField
                        {...props}
                        inputRef={node => {
                            field.ref(node);
                            const inputRef: Ref<HTMLInputElement> | undefined = props.ref;
                            if (typeof inputRef === "function") inputRef(node);
                            else if (inputRef) inputRef.current = node;
                        }}
                        invalid={Boolean(fieldState.error || props.error)}
                        value={field.value}
                        onFieldBlur={value => {
                            field.onBlur();
                            props.onBlur?.(value);
                        }}
                        onValueChange={value => {
                            field.onChange(value);
                            props.onChange?.(value);
                        }}/>
                    <InputFeedback
                        {...props}
                        className="mt-1 text-xs text-red-600 dark:text-red-400"
                        errors={formState.errors}/>
                </>
            )}
            control={props.control}
            name={props.name}
            rules={{ required: props.required ? "Campo obrigatório" : false }}/>
    );
}
