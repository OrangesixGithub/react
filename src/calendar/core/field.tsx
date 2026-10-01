import clsx from "clsx";
import { localePT_BR } from "./locale";
import { addLocale } from "primereact/api";
import { Calendar } from "primereact/calendar";
import type { CalendarFieldProps } from "../@types/core";
import { calendarInputVariants, calendarPassThrough, calendarFooterButtonClassName } from "../variants";
import {
    handleValue,
    handleResponse,
    handleMultipleValue,
    handleMultipleResponse,
    handleRangeValue,
    handleRangeResponse
} from "./handle";

addLocale("pt-BR", localePT_BR);

/**
 * Core - `CalendarField`
 * Compartilha o Calendar unstyled entre os modos.
 */
export function CalendarField(props: CalendarFieldProps) {
    const id = props.id ?? props.name;
    const multiple = props.selectionMode === "multiple";
    const range = multiple && props.range === true;
    const value = range ? handleRangeValue(props.value) : multiple ? handleMultipleValue(props.value) : handleValue(props.value);
    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return (
        <Calendar
            unstyled
            appendTo={props.appendTo === undefined ? "self" : typeof props.appendTo === "function" ? props.appendTo() : props.appendTo}
            aria-describedby={id ? `${id}-feedback` : undefined}
            className="relative inline-flex w-full min-w-0"
            clearButtonClassName={calendarFooterButtonClassName}
            dateFormat={props.format ?? "dd/mm/yy"}
            disabled={props.disabled}
            inputClassName={clsx(calendarInputVariants({ invalid: props.invalid }), props.inputClassName)}
            inputId={id}
            inputRef={props.inputRef}
            invalid={props.invalid}
            locale="pt-BR"
            maxDate={handleValue(props.maxDate) ?? undefined}
            minDate={handleValue(props.minDate) ?? undefined}
            name={props.name}
            numberOfMonths={props.numberMonths ?? 1}
            placeholder={props.placeholder}
            pt={{ ...calendarPassThrough, input: { "aria-invalid": props.invalid || undefined } }}
            readOnlyInput={props.readonly}
            required={props.required}
            selectionMode={range ? "range" : multiple ? "multiple" : "single"}
            showButtonBar={props.showButtons ?? true}
            showOnFocus={!props.readonly}
            todayButtonClassName={calendarFooterButtonClassName}
            value={value}
            view="date"
            onChange={event => {
                if (!props.readonly && !props.disabled) {
                    if (range) {
                        props.onValueChange(handleRangeResponse(event.value));
                    } else if (multiple) {
                        props.onValueChange(handleMultipleResponse(event.value));
                    } else {
                        props.onValueChange(handleResponse(event.value instanceof Date ? event.value : null));
                    }
                }
            }}
            onBlur={event => props.onFieldBlur(event.target)}/>
    );
}

CalendarField.displayName = "CalendarField";
