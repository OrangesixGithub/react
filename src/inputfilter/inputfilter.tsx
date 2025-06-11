import { Box } from "../box";
import { Text } from "./core/text";
import { Date } from "./core/date";
import { InputLabel } from "../api";
import { Number } from "./core/number";
import * as handle from "./function/handle";
import { classNames } from "primereact/utils";
import { Autocomplete } from "./core/autocomplete";
import React, { useState, useEffect } from "react";
import { optionsDefault, optionsLabel } from "./const";
import { InputFilterOptionsMap, InputFilterProps } from "./types";

/**
 * Componente - `InputFilter`
 *
 * Um componente utilizado para montar o objeto de pesquisa de dados.
 * Permite alterar o seu tipo através do type: `text`, `date`, `autocomplete`.
 */
export function InputFilter<T extends keyof InputFilterOptionsMap = "text">({ ...props }: InputFilterProps<T>) {

    const options: any[] = (props.options ?? optionsDefault).sort((a, b) => a.length - b.length);
    const selectOptions = optionsLabel.filter(item => options?.includes(item.options as any));
    const [select, setSelect] = useState<string>(handle.handleGetOption<T>(props.value, options));

    useEffect(() => {
        if (!props.type || props.type === "text") {
            let value = handle.handleGetValueText(props.value, options);
            if (value !== null) {
                props.onChange(value + select);
            } else {
                props.onChange(null);
            }
        } else if (props.type === "date") {
            let date = handle.handleGetValueDate(props.value, options, select);
            let setDate = handle.handleSetValueDate("0", null, date);

            if (select === "{}" && setDate === "0/0/0{}0/0/0") {
                props.onChange(null);
            } else {
                if (date[0] == 0 && date[1] == 0 && date[2] == 0) {
                    props.onChange(null);
                } else {
                    props.onChange(setDate);
                }
            }
        } else if (props.type === "autocomplete") {
            let value = handle.handleGetValueAutocomplete(props.value, options, props.data);
            props.onChange(handle.handleSetValueAutocomplete(value, select));
        } else if (props.type === "number") {
            let value = handle.handleGetValueNumber(props.value, options);
            if (value !== "") {
                props.onChange(value + select);
            } else {
                props.onChange(null);
            }
        }
    }, [select]);

    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return (
        <Box {...props}
             className={classNames([props.className, "input-filter-container"])}>
            <InputLabel {...props}/>
            <div className="input-filter-content"
                 id={props.id ?? "input-filter"}>
                <select className="form-select input-filter-select"
                        disabled={props.disabled}
                        id={(props.id ?? "input-filter") + "-select"}
                        name={(props.name ?? "input-filter") + "-select"}
                        value={select}
                        onChange={event => setSelect(event.target.value)}>
                    {selectOptions?.map(item => (
                        <option key={item.options}
                                value={item.options}>{item.label}</option>
                    ))}
                </select>
                {(!props.type || props.type === "text")
                    && <Text<"text"> {...props as InputFilterProps<"text">}
                                     options={options}
                                     select={select}/>}
                {props.type === "date"
                    && <Date<"date"> {...props as InputFilterProps<"date">}
                                     options={options}
                                     select={select}/>}
                {props.type === "autocomplete"
                    && <Autocomplete<"autocomplete"> {...props as InputFilterProps<"autocomplete">}
                                                     options={options}
                                                     select={select}/>}
                {props.type === "number"
                    && <Number<"number"> {...props}
                                         options={options}
                                         select={select}/>}
            </div>
        </Box>
    );
}

InputFilter.displayName = "InputFilter";