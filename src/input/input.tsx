import { Box } from "../box";
import { InputLabel } from "../api";
import { InputHookForm } from "./core/hookForm";
import { InputControlled } from "./core/controlled";
import type { ApiFieldModeProps } from "../api";
import type { InputProps } from "./@types";
import type { FieldValues } from "react-hook-form";

/**
 * Componente - `Input`
 *
 * Reúne campos de texto, número, senha e máscara com a API da Orange Six.
 */
export function Input<T extends ApiFieldModeProps = "Controlled", TValues extends FieldValues = FieldValues>(props: InputProps<T, TValues> & {
    mode?: T
}) {
    const readOnlyLabel = props.readonly && "readonlyType" in props && props.readonlyType === "label";
    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return (
        <Box
            className={`text-neutral-700 dark:text-neutral-300 ${props.className ?? ""}`}
            css={props.css}
            direction="column"
            size={props.size ?? "100"}>
            <InputLabel {...props}/>
            {readOnlyLabel
                ? <p className={"w-full " + ("readonlyClassName" in props ? props.readonlyClassName ?? "" : "")}>
                    {String("value" in props ? props.value ?? "" : "")}</p>
                : props.mode === "HookForm"
                    ? <InputHookForm {...props as InputProps<"HookForm">}/>
                    : <InputControlled {...props as InputProps<"Controlled">}/>}
        </Box>
    );
}

Input.displayName = "Input";
