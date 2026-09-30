import { Box } from "../box";
import { InputLabel } from "../api";
import type { RadioProps } from "./@types";
import type { ApiFieldModeProps } from "../api";
import { RadioHookForm } from "./core/hookForm";
import type { FieldValues } from "react-hook-form";
import { RadioControlled } from "./core/controlled";

/**
 * Componente - `Radio`
 *
 * Seleciona uma opção com o input radio nativo do HTML e a API Orange Six.
 */
export function Radio<T extends ApiFieldModeProps = "Controlled", TValues extends FieldValues = FieldValues>(props: RadioProps<T, TValues> & { mode?: T }) {
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
                ? <RadioHookForm {...props as RadioProps<"HookForm">}/>
                : <RadioControlled {...props as RadioProps<"Controlled">}/>}
        </Box>
    );
}

Radio.displayName = "Radio";
