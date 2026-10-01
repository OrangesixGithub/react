import { CalendarField } from "./field";
import { InputFeedback } from "../../api";
import type { CalendarProps } from "../@types";

/**
 * Core - `CalendarControlled`
 * Renderiza o campo com valor controlado pelo consumidor.
 */
export function CalendarControlled(props: CalendarProps<"Controlled">) {
    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return (
        <>
            {props.readonly && props.readonlyType === "label"
                ? <p className={props.readonlyClassName}>{String(props.value ?? "")}</p>
                : <CalendarField
                    {...props}
                    inputRef={props.ref}
                    invalid={Boolean(props.error)}
                    onFieldBlur={target => props.onBlur?.(target)}
                    onValueChange={value => props.onChange?.(value)}/>}
            <InputFeedback {...props}/>
        </>
    );
}

CalendarControlled.displayName = "CalendarControlled";
