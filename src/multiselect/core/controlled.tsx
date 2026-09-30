import { InputFeedback } from "../../api";
import { MultiSelectField } from "./field";
import { ObjectUtils } from "primereact/utils";
import type { MultiSelectProps } from "../@types";

/**
 * Core - `MultiSelectControlled`
 * Renderiza a seleção controlada pelo consumidor.
 */
export function MultiSelectControlled(props: MultiSelectProps<"Controlled">) {
    const values: unknown[] = Array.isArray(props.value) ? props.value : [];
    const labels = values.map(value => {
        const option = props.options.find(item => ObjectUtils.deepEquals(ObjectUtils.resolveFieldData(item, props.optionValue ?? "value"), value));
        return option ? String(ObjectUtils.resolveFieldData(option, props.optionLabel ?? "label") ?? "") : String(value);
    });
    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return (
        <>
            {props.readonly && props.readonlyType === "label"
                ? <p className={props.readonlyClassName}>{labels.join(", ")}</p>
                : <MultiSelectField
                    {...props}
                    invalid={Boolean(props.error)}
                    onFieldBlur={value => props.onBlur?.(value)}
                    onValueChange={value => props.onChange?.(value)}/>}
            <InputFeedback {...props}/>
        </>
    );
}

MultiSelectControlled.displayName = "MultiSelectControlled";
