import { Controller } from "react-hook-form";
import type { AutocompleteProps } from "../@types";
import { AutocompleteControlled } from "./controlled";
/** Core - `AutocompleteHookForm`: integra sugestões e validação ao formulário. */
export function AutocompleteHookForm(props: AutocompleteProps<"HookForm">) {
    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return (
        <Controller
            render={({ field, fieldState }) => (
                <AutocompleteControlled
                    {...props}
                    ref={node => {
                        field.ref(node);
                        if (typeof props.ref === "function") props.ref(node);
                        else if (props.ref) props.ref.current = node;
                    }}
                    error={props.error ?? fieldState.error?.message}
                    mode="Controlled"
                    value={field.value}
                    onBlur={value => {
                        field.onBlur();
                        props.onBlur?.(value);
                    }}
                    onChange={value => {
                        field.onChange(value);
                        props.onChange?.(value);
                    }}/>
            )}
            control={props.control}
            name={props.name}
            rules={{ required: props.required ? "Campo obrigatório" : false }}/>
    );
}

AutocompleteHookForm.displayName = "AutocompleteHookForm";
