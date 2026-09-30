import type { AutocompleteProps } from "../@types";
import { autocompleteVariants } from "../variants";
import type { AutoCompleteProps } from "primereact/autocomplete";
/** Core - `autocompleCore`: configura o campo preservando o helper existente. */
export function autocompleCore(props: AutocompleteProps<"Controlled"> | AutocompleteProps<"HookForm">): Partial<AutoCompleteProps> {
    const styles = autocompleteVariants({ invalid: Boolean(props.error) });
    const id = props.id ?? props.name;
    return {
        unstyled: true,
        field: "name",
        inputId: id,
        inputRef: props.ref,
        name: props.name,
        forceSelection: props.forceSelect ?? true,
        disabled: props.disabled,
        readOnly: props.readonly,
        required: props.required,
        placeholder: props.placeholder,
        appendTo: props.appendTo ?? "self",
        itemTemplate: props.dataTemplate,
        className: styles.root(),
        inputClassName: styles.input(),
        "aria-describedby": id ? `${id}-feedback` : undefined,
        "aria-invalid": Boolean(props.error) || undefined,
        pt: {
            panel: { className: styles.panel() },
            list: { className: styles.list() },
            item: { className: styles.item() },
            emptyMessage: { className: styles.emptyMessage() },
            loadingIcon: { className: styles.loadingIcon() },
        },
    };
}
