import type { Ref } from "react";
import { CalendarField } from "./field";
import { InputFeedback } from "../../api";
import { Controller } from "react-hook-form";
import type { CalendarProps } from "../@types";

/**
 * Core - `CalendarHookForm`
 * Liga o campo ao React Hook Form e preserva os callbacks públicos.
 */
export function CalendarHookForm(props: CalendarProps<"HookForm">) {
    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return (
        <Controller
            render={({ field, fieldState, formState }) => (
                <>
                    <CalendarField
                        {...props}
                        inputRef={node => {
                            field.ref(node);
                            const inputRef: Ref<HTMLInputElement> | undefined = props.ref;
                            if (typeof inputRef === "function") {
                                inputRef(node);
                            } else if (inputRef) {
                                inputRef.current = node;
                            }
                        }}
                        invalid={Boolean(fieldState.error || props.error)}
                        value={field.value}
                        onFieldBlur={target => {
                            field.onBlur();
                            props.onBlur?.(target.value);
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

CalendarHookForm.displayName = "CalendarHookForm";
