import React from "react";
import { CalendarProps } from "..";
import { InputFeedback } from "../../api";
import { Calendar } from "primereact/calendar";
import { handleResponse, handleValue } from "./handle";

type Props = {
    core: any & { ref: React.Ref<HTMLInputElement> | undefined },
};

/**
 * Core - `CalendarControlled`
 * Define o componente controlled
 */
export function CalendarControlled({ core, ...props }: CalendarProps<"Controlled"> & Props) {
    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return <>
        <div className="w-100 d-flex flex-column">
            <Calendar
                {...core}
                showButtonBar
                appendTo={props.appendTo}
                className="w-100 calendar"
                dateFormat={props.format ?? "dd/mm/yy"}
                locale="pt-BR"
                numberOfMonths={props.numberMonths ?? 1}
                panelClassName="calendar-panel"
                value={handleValue(props.value)}
                view={props.view ?? "date"}
                onBlur={event => {
                    if (props.onBlur) {
                        props.onBlur(event.target);
                    }
                }}
                onChange={event => {
                    if (props.onChange) {
                        props.onChange(handleResponse(event.target.value as Date));
                    }
                }}/>
            <InputFeedback {...props}/>
        </div>
        <InputFeedback {...props}/>
    </>;
}