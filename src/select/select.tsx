import { Box } from "../box";
import { InputLabel } from "../api";
import type { SelectProps } from "./@types";
import type { ApiFieldModeProps } from "../api";
import { SelectHookForm } from "./core/hookForm";
import type { FieldValues } from "react-hook-form";
import { SelectControlled } from "./core/controlled";

/**
 * Componente - `Select`
 *
 * Seleciona uma opção com o select nativo do HTML e a API Orange Six.
 */
export function Select<T extends ApiFieldModeProps = "Controlled", TValues extends FieldValues = FieldValues>(props: SelectProps<T, TValues> & { mode?: T }) {
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
            <InputLabel {...props}/>
            {props.mode === "HookForm"
                ? <SelectHookForm {...props as SelectProps<"HookForm">}/>
                : <SelectControlled {...props as SelectProps<"Controlled">}/>}
        </Box>
    );
}

Select.displayName = "Select";
