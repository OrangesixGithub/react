import { autocompleCore } from "./core";
import { InputFeedback } from "../../api";
import { autocompleteEvent } from "./event";
import type { AutocompleteProps } from "../@types";
import { AutoComplete } from "primereact/autocomplete";
/** Core - `AutocompleteControlled`: renderiza o valor controlado pelo consumidor. */
export function AutocompleteControlled(props: AutocompleteProps) {
    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return (
        <>
            <AutoComplete
                {...autocompleCore(props)}
                {...autocompleteEvent(props)}
                delay={props.searchDelay ?? 500}
                maxLength={props.searchMax}
                minLength={props.searchMin ?? 1}
                suggestions={props.data ?? []}
                value={props.value}/>
            <InputFeedback {...props}/>
        </>
    );
}

AutocompleteControlled.displayName = "AutocompleteControlled";
