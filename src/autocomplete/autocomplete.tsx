import { Box } from "../box";
import { InputLabel } from "../api";
import type { ApiFieldModeProps } from "../api";
import type { AutocompleteProps } from "./@types";
import type { FieldValues } from "react-hook-form";
import { AutocompleteHookForm } from "./core/hookForm";
import { AutocompleteControlled } from "./core/controlled";

/**
 * Componente - `Autocomplete`
 * Sugere opções durante a digitação, com controle externo ou React Hook Form.
 */
export function Autocomplete<T extends ApiFieldModeProps = "Controlled", TValues extends FieldValues = FieldValues>(props: AutocompleteProps<T, TValues> & {
    mode?: T
}) {
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
                ? <AutocompleteHookForm {...props as AutocompleteProps<"HookForm">}/>
                : <AutocompleteControlled {...props as AutocompleteProps}/>}
        </Box>
    );
}

Autocomplete.displayName = "Autocomplete";
