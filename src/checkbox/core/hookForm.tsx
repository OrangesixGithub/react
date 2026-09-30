import { CheckboxField } from "./field";
import { InputFeedback } from "../../api";
import { Controller } from "react-hook-form";
import type { CheckboxProps } from "../@types";

/**
 * Core - `CheckboxHookForm`
 * Liga o campo ao React Hook Form e preserva os callbacks públicos.
 */
export function CheckboxHookForm(props: CheckboxProps<"HookForm">) {
    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return (
        <Controller
            render={({ field, fieldState, formState }) => (
                <>
                    <CheckboxField
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
            rules={{ validate: value => !props.required || (Array.isArray(value) && value.length > 0) || "Campo obrigatório" }}/>
    );
}

CheckboxHookForm.displayName = "CheckboxHookForm";
