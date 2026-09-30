import { SwitchField } from "./field";
import { InputFeedback } from "../../api";
import type { SwitchProps } from "../@types";

/**
 * Core - `SwitchControlled`
 * Renderiza o valor controlado pelo consumidor.
 */
export function SwitchControlled(props: SwitchProps<"Controlled">) {
    const readonlyLabel = props.readonly && props.readonlyType === "label";
    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return (
        <>
            {readonlyLabel
                ? <p className={props.readonlyClassName}>{String(props.value ?? props.valueFalse ?? false)}</p>
                : <SwitchField
                    {...props}
                    invalid={Boolean(props.error)}
                    onFieldBlur={value => props.onBlur?.(value)}
                    onValueChange={value => props.onChange?.(value)}/>}
            <InputFeedback {...props}/>
        </>
    );
}

SwitchControlled.displayName = "SwitchControlled";
