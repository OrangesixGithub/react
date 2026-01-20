import React from "react";
import { Box } from "../box";
import { CalendarProps } from ".";
import { ApiFieldModeProps } from "../api";
import { localePT_BR } from "./core/locale";
import { InputLabel, InputProps } from "../api";
import { addLocale, locale } from "primereact/api";
import { CalendarHookForm } from "./core/hookForm";
import { CalendarControlled } from "./core/controlled";

addLocale("pt-BR", localePT_BR);
locale("pt-BR");

/**
 * Componente - `Calendar`
 *
 * Um componente versátil que é utilizado para entrada de dados do formator de data.
 */
export function Calendar<T extends ApiFieldModeProps = "Controlled">(props: CalendarProps<T> & { mode?: T }) {
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
            {!props.mode || props.mode === "Controlled"
                ? <CalendarControlled
                    core={core}
                    {...propsCore}/>
                : <CalendarHookForm
                    core={core}
                    {...propsCore}/>
            }
        </Box>
    );
}

Calendar.displayName = "Calendar";