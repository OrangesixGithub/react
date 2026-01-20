import React from "react";
import { CalendarProps } from "..";
import { InputFeedback } from "../../api";
import { Controller } from "react-hook-form";
import { Calendar } from "primereact/calendar";
import { handleResponse, handleValue } from "./handle";

type Props = {
    core: any & { ref: React.Ref<HTMLInputElement> | undefined }
};

/**
 * Core - `CalendarHookForm`
 * Define o componente utilizando o HookForm
 */
export function CalendarHookForm({ core, ...props }: CalendarProps<"HookForm"> & Props) {
    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return (
        <Controller
            render={({ field, formState: { errors } }) => {
                return (
                    <div className="w-100 d-flex flex-column">
                        <Calendar
                            {...core}
                            showButtonBar
                            appendTo={props.appendTo}
                            className="w-100 calendar"
                            dateFormat={props.format ?? "dd/mm/yy"}
                            invalid={!!errors[props.name]}
                            locale="pt-BR"
                            numberOfMonths={props.numberMonths ?? 1}
                            panelClassName="calendar-panel"
                            value={handleValue(field.value)}
                            view={props.view ?? "date"}
                            onChange={e => props.onChange !== undefined
                                ? props.onChange(handleResponse(e.target.value as Date))
                                : field.onChange(handleResponse(e.target.value as Date))}
                            onBlur={e => props.onBlur ? props.onBlur(e.target.value) : field.onBlur()}/>
                        <InputFeedback {...props}
                            errors={errors}/>
                    </div>
                );
            }}
            control={props.control}
            name={props.name}
            rules={{ required: !props.required ? false : "Campo obrigatório" }}/>
    );
}