import { CheckboxField } from "./field";
import { InputFeedback } from "../../api";
import type { CheckboxProps } from "../@types";

/**
 * Core - `CheckboxControlled`
 * Renderiza a seleção controlada pelo consumidor.
 */
export function CheckboxControlled(props: CheckboxProps<"Controlled">) {
    const readonlyLabel = props.readonly && props.readonlyType === "label";
    const values: Array<unknown> = Array.isArray(props.value) ? props.value : [];
    const selected = props.options
        .filter(option => values.includes(option.value))
        .map(option => option.label);
    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return (
        <>
            {readonlyLabel
                ? <p className={props.readonlyClassName}>{selected.join(", ")}</p>
                : <CheckboxField
                    {...props}
                    invalid={Boolean(props.error)}
                    onFieldBlur={value => props.onBlur?.(value)}
                    onValueChange={value => props.onChange?.(value)}/>}
            <InputFeedback {...props}/>
        </>
    );
}

CheckboxControlled.displayName = "CheckboxControlled";
