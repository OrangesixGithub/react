import clsx from "clsx";
import { Box } from "../box";
import { Text } from "./core/text";
import { Date } from "./core/date";
import { Number } from "./core/number";
import { inputfilterVariants } from "./variants";
import * as handle from "./function/handle";
import { Autocomplete } from "./core/autocomplete";
import { InputFeedback, InputLabel } from "../api";
import { useState, useEffect } from "react";
import { optionsDefault, optionsLabel } from "./const";
import type { InputFilterOptionsMap, InputFilterProps } from "./@types";

/**
 * Componente - `InputFilter`
 *
 * Um componente utilizado para montar o objeto de pesquisa de dados.
 * Permite alterar o seu tipo através do type: `text`, `date`, `number`, `autocomplete`.
 */
export function InputFilter<T extends keyof InputFilterOptionsMap = "text">({ ...props }: InputFilterProps<T>) {
    const styles = inputfilterVariants({ invalid: Boolean(props.error) });
    const options: any[] = [...(props.options ?? optionsDefault)].sort((a, b) => a.length - b.length);
    const selectOptions = optionsLabel.filter(item => options?.includes(item.options as any));
    const [select, setSelect] = useState<string>(handle.handleGetOption<T>(props.value, options));
    const id = props.id ?? "input-filter";

    useEffect(() => {
        if (!props.type || props.type === "text") {
            const value = handle.handleGetValueText(props.value, options);
            if (value !== null) {
                props.onChange(value + select);
            } else {
                props.onChange(null);
            }
        } else if (props.type === "date") {
            const date = handle.handleGetValueDate(props.value, options, select);
            const setDate = handle.handleSetValueDate("0", null, date);

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
            const value = handle.handleGetValueAutocomplete(props.value, options, props.data);
            props.onChange(handle.handleSetValueAutocomplete(value, select));
        } else if (props.type === "number") {
            const value = handle.handleGetValueNumber(props.value, options);
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
        <Box
            className={clsx(styles.container(), props.className)}
            css={props.css}
            direction="column"
            size={props.size ?? "100"}>
            <InputLabel {...props}/>
            <div
                className={styles.content()}
                id={id}>
                <div className={styles.selectWrapper()}>
                    <select
                        aria-invalid={Boolean(props.error) || undefined}
                        className={styles.select()}
                        disabled={props.disabled || props.readonly}
                        id={id + "-select"}
                        name={(props.name ?? "input-filter") + "-select"}
                        value={select}
                        onChange={event => setSelect(event.target.value)}>
                        {selectOptions?.map(item => (
                            <option
                                className={styles.selectOption()}
                                key={item.options}
                                value={item.options}>{item.label}</option>
                        ))}
                    </select>
                    <i
                        aria-hidden="true"
                        className={`${props.iconPrefix ?? "bi bi-"}chevron-down ${styles.selectIcon()}`}/>
                </div>
                {(!props.type || props.type === "text")
                    && <Text<"text">
                        {...props as InputFilterProps<"text">}
                        options={options}
                        select={select}/>}
                {props.type === "date"
                    && <Date<"date">
                        {...props as InputFilterProps<"date">}
                        options={options}
                        select={select}/>}
                {props.type === "autocomplete"
                    && <Autocomplete
                        {...props as InputFilterProps<"autocomplete">}
                        options={options}
                        select={select}/>}
                {props.type === "number"
                    && <Number<"number">
                        {...props as InputFilterProps<"number">}
                        options={options}
                        select={select}/>}
            </div>
            <InputFeedback {...props}/>
        </Box>
    );
}

InputFilter.displayName = "InputFilter";
