import type { Ref } from "react";
import { TextareaField } from "./field";
import { InputFeedback } from "../../api";
import { Controller } from "react-hook-form";
import type { TextareaProps } from "../@types";

/**
 * Core - `TextareaHookForm`
 * Liga o campo ao React Hook Form e preserva os callbacks públicos.
 */
export function TextareaHookForm(props: TextareaProps<"HookForm">) {
    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return (
        <Controller
            render={({ field, fieldState, formState }) => (
                <>
                    <TextareaField
                        {...props}
                        inputRef={node => {
                            field.ref(node);
                            const inputRef: Ref<HTMLTextAreaElement> | undefined = props.ref;
                            if (typeof inputRef === "function") {
                                inputRef(node);
                            } else if (inputRef) {
                                inputRef.current = node;
                            }
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
                        errors={formState.errors}/>
                </>
            )}
            control={props.control}
            name={props.name}
            rules={{ required: props.required ? "Campo obrigatório" : false }}/>
    );
}

TextareaHookForm.displayName = "TextareaHookForm";
