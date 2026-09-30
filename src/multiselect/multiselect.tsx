import { Box } from "../box";
import { useId } from "react";
import { InputLabel } from "../api";
import type { ApiFieldModeProps } from "../api";
import type { MultiSelectProps } from "./@types";
import type { FieldValues } from "react-hook-form";
import { MultiSelectHookForm } from "./core/hookForm";
import { MultiSelectControlled } from "./core/controlled";

/**
 * Componente - `MultiSelect`
 *
 * Seleciona múltiplas opções com PrimeReact unstyled e a API Orange Six.
 */
export function MultiSelect<T extends ApiFieldModeProps = "Controlled", TValues extends FieldValues = FieldValues>(props: MultiSelectProps<T, TValues> & { mode?: T }) {
    const generatedId = useId();
    const id = props.id ?? props.name ?? generatedId;
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
                id={id}/>
            {props.mode === "HookForm"
                ? <MultiSelectHookForm
                    {...props as MultiSelectProps<"HookForm">}
                    id={id}/>
                : <MultiSelectControlled
                    {...props as MultiSelectProps<"Controlled">}
                    id={id}/>}
        </Box>
    );
}

MultiSelect.displayName = "MultiSelect";
