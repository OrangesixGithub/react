import clsx from "clsx";
import { Box } from "../box";
import { InputLabel } from "../api";
import type { ApiFieldModeProps } from "../api";
import type { TextareaProps } from "./@types";
import type { FieldValues } from "react-hook-form";
import { TextareaHookForm } from "./core/hookForm";
import { TextareaControlled } from "./core/controlled";

/**
 * Componente - `Textarea`
 *
 * Um componente versátil que é utilizado para entrada de texto com múltiplas linhas.
 */
export function Textarea<T extends ApiFieldModeProps = "Controlled", TValues extends FieldValues = FieldValues>(props: TextareaProps<T, TValues> & {
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
            className={clsx("min-w-0 max-w-full", props.className)}
            css={props.css}
            direction="column"
            size={props.size ?? "100"}>
            <InputLabel {...props}/>
            {readOnlyLabel
                ? <p className={"w-full whitespace-pre-wrap " + ("readonlyClassName" in props ? props.readonlyClassName ?? "" : "")}>
                    {String("value" in props ? props.value ?? "" : "")}</p>
                : props.mode === "HookForm"
                    ? <TextareaHookForm {...props as TextareaProps<"HookForm">}/>
                    : <TextareaControlled {...props as TextareaProps<"Controlled">}/>}
        </Box>
    );
}

Textarea.displayName = "Textarea";
