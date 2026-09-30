import { RadioField } from "./field";
import { InputFeedback } from "../../api";
import type { RadioProps } from "../@types";

/**
 * Core - `RadioControlled`
 * Renderiza a seleção controlada pelo consumidor.
 */
export function RadioControlled(props: RadioProps<"Controlled">) {
    const readonlyLabel = props.readonly && props.readonlyType === "label";
    const selected = props.options.find(option => option.value === props.value);
    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return (
        <>
            {readonlyLabel
                ? <p className={props.readonlyClassName}>{selected?.label ?? String(props.value ?? "")}</p>
                : <RadioField
                    {...props}
                    invalid={Boolean(props.error)}
                    onFieldBlur={value => props.onBlur?.(value)}
                    onValueChange={value => props.onChange?.(value)}/>}
            <InputFeedback {...props}/>
        </>
    );
}

RadioControlled.displayName = "RadioControlled";
