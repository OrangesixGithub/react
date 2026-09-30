import { SelectField } from "./field";
import { InputFeedback } from "../../api";
import type { SelectProps } from "../@types";

/**
 * Core - `SelectControlled`
 * Renderiza a seleção controlada pelo consumidor.
 */
export function SelectControlled(props: SelectProps<"Controlled">) {
    const readonlyLabel = props.readonly && props.readonlyType === "label";
    const selected = props.options.find(option => String(option.id) === String(props.value));
    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return (
        <>
            {readonlyLabel
                ? <p className={props.readonlyClassName}>{selected?.name ?? String(props.value ?? "")}</p>
                : <SelectField
                    {...props}
                    invalid={Boolean(props.error)}
                    onFieldBlur={value => props.onBlur?.(value)}
                    onValueChange={value => props.onChange?.(value)}/>}
            <InputFeedback {...props}/>
        </>
    );
}

SelectControlled.displayName = "SelectControlled";
