import { AutocompleteProps } from "..";
import * as AutoCompletePrimeReact from "primereact/autocomplete";

/**
 * Componente - `Autocomplete`
 *
 * Define as configuração de evento do componente
 */
export function autocompleteEvent(props: AutocompleteProps): Partial<AutoCompletePrimeReact.AutoCompleteProps> {
    return {
        onChange(event: AutoCompletePrimeReact.AutoCompleteChangeEvent) {
            props.onChange(event.value);
        },
        onSelect(event: AutoCompletePrimeReact.AutoCompleteSelectEvent) {
            if (props.onSelect) {
                props.onSelect(event.value);
            }
        },
        completeMethod(event: AutoCompletePrimeReact.AutoCompleteCompleteEvent) {
            props.onSearch(event.query);
        },
    };
}