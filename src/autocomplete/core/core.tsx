import { AutocompleteProps } from "../types";
import { AutoCompleteProps as AutoCompletePropsPrimeReact } from "primereact/autocomplete";

/**
 * Componente - `Autocomplete`
 *
 * Define as configurações do modo principal do autocomplete.
 */
export function autocompleCore(
    props: AutocompleteProps
): Partial<AutoCompletePropsPrimeReact> {

    const itemTemplate: Partial<AutoCompletePropsPrimeReact> = props.dataTemplate
        ? { itemTemplate: props.dataTemplate }
        : {};
    return {
        id: props.id,
        field: "name",
        name: props.name,
        forceSelection: props.forceSelect ?? true,
        style: props.css ?? {},
        disabled: props.disabled,
        required: props.required,
        placeholder: props.placeholder,
        inputClassName: "form-control",
        appendTo: props.appendTo ?? "self",
        className: "autocomplete-primereact w-100",
        ...itemTemplate
    };
}