import React from "react";
import { Box } from "../box";
import { CalendarProps } from ".";
import { InputFeedback } from "../api";
import { localePT_BR } from "./core/locale";
import { InputLabel, InputProps } from "../api";
import { addLocale, locale } from "primereact/api";
import { Calendar as CalendarPrimeReact } from "primereact/calendar";

addLocale("pt-BR", localePT_BR);
locale("pt-BR");

/**
 * Componente - `Calendar`
 *
 * Um componente versátil que é utilizado para entrada de dados do formator de data.
 */
export function Calendar(props: CalendarProps) {
    let propsCore = props as any;
    let core = { ...InputProps(propsCore) };

    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return (
        <Box className={props.className}
            css={props.css}
            size={props.size ?? "100"}>
            <InputLabel {...props}/>
            <div className="w-100 d-flex flex-column">
                <CalendarPrimeReact
                    {...core}
                    showButtonBar
                    appendTo={props.appendTo}
                    className="w-100 calendar"
                    dateFormat={props.format ?? "dd/mm/yy"}
                    locale="pt-BR"
                    numberOfMonths={props.numberMonths ?? 1}
                    panelClassName="calendar-panel"
                    value={props.value}
                    view={props.view ?? "date"}
                    onChange={event => {
                        if (props.onChange) {
                            props.onChange(event.target.value as any);
                        }
                    }}/>
                <InputFeedback {...props}/>
            </div>
        </Box>
    );
}

Calendar.displayName = "Calendar";