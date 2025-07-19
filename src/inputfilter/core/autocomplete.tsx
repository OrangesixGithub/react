import React from "react";
import { InputFilterCoreProps, InputFilterOptionsMap } from "..";
import * as AutocompletePrimeReact from "primereact/autocomplete";
import { handleGetValueAutocomplete, handleSetValueAutocomplete } from "../function/handle";

/**
 * Core - `Autocomplete`
 * Campo do filtro tipo autocomplete
 */
export function Autocomplete<T extends keyof InputFilterOptionsMap>(props: InputFilterCoreProps<"autocomplete">) {
    const value = handleGetValueAutocomplete(props.value, props.options, props.data);

    return (
        <AutocompletePrimeReact.AutoComplete
            multiple
            completeMethod={event => {
                let ids = value.map(item => item.id);
                props.onSearch(event.query, ids);
            }}
            appendTo="self"
            className="w-100"
            disabled={props.disabled}
            emptyMessage="Não encontramos dados."
            field="label"
            id={(props.id ?? "input-filter") + "-" + "autocomplete"}
            inputClassName="form-control"
            name={(props.name ?? "input-filter") + "-" + "autocomplete"}
            panelClassName="input-filter-autocomplete-panel"
            placeholder={props.placeholder}
            required={props.required}
            scrollHeight={props.autocompleteScrollHeight}
            selectionLimit={props.autocompleteSelectLimit}
            suggestions={props.data}
            value={value}
            onChange={event => props.onChange(handleSetValueAutocomplete(event.value, props.select))}/>
    );
}