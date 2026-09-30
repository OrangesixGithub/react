import { SwitchField } from "./field";
import { InputFeedback } from "../../api";
import type { SwitchProps } from "../@types";
import { Controller } from "react-hook-form";

/**
 * Core - `SwitchHookForm`
 * Liga o campo ao React Hook Form e preserva os callbacks públicos.
 */
export function SwitchHookForm(props: SwitchProps<"HookForm">) {
    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return (
        <Controller
            render={({ field, fieldState, formState }) => (
                <>
                    <SwitchField
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
            rules={{ validate: value => !props.required || value === (props.valueTrue ?? true) || "Campo obrigatório" }}/>
    );
}

SwitchHookForm.displayName = "SwitchHookForm";
