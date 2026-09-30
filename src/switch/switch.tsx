import { Box } from "../box";
import { useId } from "react";
import { InputLabel } from "../api";
import type { SwitchProps } from "./@types";
import type { ApiFieldModeProps } from "../api";
import { SwitchHookForm } from "./core/hookForm";
import type { FieldValues } from "react-hook-form";
import { SwitchControlled } from "./core/controlled";

/**
 * Componente - `Switch`
 *
 * Alterna um valor com o checkbox nativo do HTML e a API Orange Six.
 */
export function Switch<T extends ApiFieldModeProps = "Controlled", TValues extends FieldValues = FieldValues>(props: SwitchProps<T, TValues> & { mode?: T }) {
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
                ? <SwitchHookForm
                    {...props as SwitchProps<"HookForm">}
                    id={id}/>
                : <SwitchControlled
                    {...props as SwitchProps<"Controlled">}
                    id={id}/>}
        </Box>
    );
}

Switch.displayName = "Switch";
