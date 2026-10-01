import { AutoComplete } from "primereact/autocomplete";
import { inputfilterVariants } from "../variants";
import type { InputFilterCoreProps } from "../@types";
import { handleGetValueAutocomplete, handleSetValueAutocomplete } from "../function/handle";

/**
 * Core - `Autocomplete`
 * Campo do filtro tipo autocomplete
 */
export function Autocomplete(props: InputFilterCoreProps<"autocomplete">) {
    const styles = inputfilterVariants({ invalid: Boolean(props.error) });
    const value = handleGetValueAutocomplete(props.value, props.options, props.data);
    const id = (props.id ?? "input-filter") + "-autocomplete";
    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return (
        <AutoComplete
            multiple
            unstyled
            pt={{
                container: { className: styles.autocompleteContainer() },
                token: { className: styles.autocompleteToken() },
                removeTokenIcon: { className: styles.autocompleteRemove() },
                inputToken: { className: styles.autocompleteInputToken() },
                panel: { className: styles.panel() },
                list: { className: styles.list() },
                item: { className: styles.item() },
                emptyMessage: { className: styles.emptyMessage() },
                loadingIcon: { className: styles.loadingIcon() },
            }}
            appendTo="self"
            aria-invalid={Boolean(props.error) || undefined}
            className={styles.autocomplete()}
            completeMethod={event => props.onSearch(event.query, value.map(item => item.id))}
            disabled={props.disabled}
            emptyMessage="Não encontramos dados."
            field="label"
            id={id}
            inputClassName={styles.autocompleteInput()}
            inputId={id + "-input"}
            name={(props.name ?? "input-filter") + "-autocomplete"}
            placeholder={props.placeholder}
            readOnly={props.readonly}
            required={props.required}
            scrollHeight={props.autocompleteScrollHeight}
            selectionLimit={props.autocompleteSelectLimit}
            suggestions={props.data}
            value={value}
            onChange={event => props.onChange(handleSetValueAutocomplete(event.value, props.select))}/>
    );
}

Autocomplete.displayName = "Autocomplete";
