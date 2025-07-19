import React from "react";
import { InputFilterCoreProps, InputFilterOptionsMap } from "..";
import { handleGetValueDate, handleSetValueDate } from "../function/handle";

/**
 * Core - `Date`
 * Campo do filtro tipo data
 */
export function Date<T extends keyof InputFilterOptionsMap>(props: InputFilterCoreProps<T>) {
    let date = handleGetValueDate(props.value, props.options, props.select);

    function handleChangeValue(value: string) {
        if (props.select === "{}" && value === "0/0/0{}0/0/0") {
            props.onChange(null);
        } else {
            if ((date[0] == 0 || isNaN(date[0] as number)) &&
                (date[1] == 0 || isNaN(date[1] as number)) &&
                (date[2] == 0 || isNaN(date[2] as number))) {
                props.onChange(null);
            } else {
                props.onChange(value);
            }
        }
    }

    return (
        <div className="d-flex w-100 flex-column">
            <div className="w-100 d-flex gap-2">
                {date.map((item, index) => {
                    if (index <= 2) {
                        return (
                            <input className={"form-control input-filter-field-date" + (index == 2 ? " year" : "")}
                                   disabled={props.disabled}
                                   id={(props.id ?? "input-filter") + "-" + index}
                                   key={index}
                                   name={(props.name ?? "input-filter") + "-" + index}
                                   placeholder={props.placeholder}
                                   value={item === 0 ? "" : item}
                                   onChange={event => handleChangeValue(handleSetValueDate(event.target.value, index, date))}/>
                        );
                    }
                })}
            </div>
            {props.select === "{}" && date.length > 4
                && <div className="w-100 d-flex gap-2 mt-2">
                    {date.map((item, index) => {
                        if (index >= 4) {
                            return (
                                <input className={"form-control input-filter-field-date" + (index == 6 ? " year" : "")}
                                       disabled={props.disabled}
                                       id={(props.id ?? "input-filter") + "-" + index}
                                       key={index}
                                       name={(props.name ?? "input-filter") + "-" + index}
                                       placeholder={props.placeholder}
                                       value={item === 0 ? "" : item}
                                       onChange={event => handleChangeValue(handleSetValueDate(event.target.value, index, date))}/>
                            );
                        }
                    })}
                </div>}
        </div>
    );
}