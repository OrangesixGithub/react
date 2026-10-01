import clsx from "clsx";
import { Box } from "../box";
import { InputLabel } from "../api";
import type { CalendarProps } from "./@types";
import type { ApiFieldModeProps } from "../api";
import type { FieldValues } from "react-hook-form";
import { CalendarHookForm } from "./core/hookForm";
import { CalendarControlled } from "./core/controlled";

/**
 * Componente - `Calendar`
 *
 * Um componente versátil que é utilizado para entrada de texto com múltiplas linhas.
 */
export function Calendar<T extends ApiFieldModeProps = "Controlled", TValues extends FieldValues = FieldValues>(props: CalendarProps<T, TValues> & {
    mode?: T
}) {
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
            {props.mode === "HookForm"
                ? <CalendarHookForm {...props as CalendarProps<"HookForm">}/>
                : <CalendarControlled {...props as CalendarProps<"Controlled">}/>}
        </Box>
    );
}

Calendar.displayName = "Calendar";
