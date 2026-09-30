import { RadioField } from "./field";
import { InputFeedback } from "../../api";
import type { RadioProps } from "../@types";
import { Controller } from "react-hook-form";

/**
 * Core - `RadioHookForm`
 * Liga o campo ao React Hook Form e preserva os callbacks públicos.
 */
export function RadioHookForm(props: RadioProps<"HookForm">) {
    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return (
        <Controller
            render={({ field, fieldState, formState }) => (
                <>
                    <RadioField
                        {...props}
                        focusInputRef={field.ref}
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

RadioHookForm.displayName = "RadioHookForm";
