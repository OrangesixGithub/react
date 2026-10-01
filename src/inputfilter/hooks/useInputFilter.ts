import { useState, useEffect } from "react";
import * as handle from "../function/handle";
import type { InputFilterOptionsMap, InputFilterProps } from "../@types";

/**
 * Hook - `useInputFilter`
 *
 * Controla o operador selecionado e sincroniza o valor do filtro com `onChange` na montagem e quando o operador muda.
 * O operador fica em estado local, inicializado a partir do `value`; mudanças externas de `value` não o alteram.
 */
export function useInputFilter<T extends keyof InputFilterOptionsMap>(props: InputFilterProps<T>, options: any[]) {
    const [select, setSelect] = useState<string>(handle.handleGetOption<T>(props.value, options));

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
            const ids = handle.handleGetIdsAutocomplete(props.value).map(id => ({ id }));
            props.onChange(handle.handleSetValueAutocomplete(ids, select));
        } else if (props.type === "number") {
            const value = handle.handleGetValueNumber(props.value, options);
            if (value !== "") {
                props.onChange(value + select);
            } else {
                props.onChange(null);
            }
        }
    }, [select]);

    return [select, setSelect] as const;
}
