import type { AutocompleteProps } from "../@types";
import type { AutoCompleteProps } from "primereact/autocomplete";

/** Core - `autocompleteEvent`: mantém os callbacks baseados em valor e consulta. */
export function autocompleteEvent(props: AutocompleteProps): Partial<AutoCompleteProps> {
    return {
        onChange: event => {
            if (!props.disabled && !props.readonly) {
                props.onChange?.(event.value);
            }
        },
        onSelect: event => {
            if (!props.disabled && !props.readonly) {
                props.onSelect?.(event.value);
            }
        },
        completeMethod: event => {
            if (!props.disabled && !props.readonly) {
                props.onSearch(event.query);
            }
        },
        onBlur: () => props.onBlur?.(props.value),
    };
}
