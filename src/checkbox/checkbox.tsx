import { Box } from "../box";
import { InputLabel } from "../api";
import type { CheckboxProps } from "./@types";
import type { ApiFieldModeProps } from "../api";
import type { FieldValues } from "react-hook-form";
import { CheckboxHookForm } from "./core/hookForm";
import { CheckboxControlled } from "./core/controlled";

/**
 * Componente - `Checkbox`
 *
 * Seleciona várias opções com o checkbox nativo do HTML; o valor é uma lista, como `[1, 2, 3]`, e marca as opções
 * cujo valor esteja nela.
 */
export function Checkbox<T extends ApiFieldModeProps = "Controlled", TValues extends FieldValues = FieldValues>(props: CheckboxProps<T, TValues> & { mode?: T }) {
    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return (
        <Box
            className={props.className}
            css={props.css}
            direction="column"
            size={props.size ?? "100"}>
            <InputLabel
                {...props}
                id={`${props.id ?? props.name}-${props.options[0]?.value ?? ""}`}/>
            {props.mode === "HookForm"
                ? <CheckboxHookForm {...props as CheckboxProps<"HookForm">}/>
                : <CheckboxControlled {...props as CheckboxProps<"Controlled">}/>}
        </Box>
    );
}

Checkbox.displayName = "Checkbox";
