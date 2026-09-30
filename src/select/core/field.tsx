import { selectVariants } from "../variants";
import type { SelectFieldProps } from "../@types/core";

/**
 * Core - `SelectField`
 * Compartilha o select nativo, opções e estilos entre os modos.
 */
export function SelectField(props: SelectFieldProps) {
    const initLabel = typeof props.init === "string" ? props.init : `Selecione ${props.label?.toLowerCase() ?? ""}`;
    const options = props.options.map(option => ({
        ...option,
        id: String(option.id)
    }));
    if (props.init) {
        options.unshift({ id: "", name: initLabel });
    }
    const value = props.value == null
        ? (props.init ? "" : options.find(option => !option.disabled)?.id ?? "")
        : String(props.value);
    const id = props.id ?? props.name;
    const styles = selectVariants({
        size: props.sizes,
        invalid: props.invalid,
        disabled: props.disabled,
        readonly: props.readonly,
        placeholder: Boolean(props.init && value === ""),
    });
    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return (
        <div className={styles.wrapper()}>
            <select
                ref={node => {
                    if (typeof props.focusInputRef === "function") {
                        props.focusInputRef(node);
                    } else if (props.focusInputRef) {
                        props.focusInputRef.current = node;
                    }
                    if (typeof props.ref === "function") {
                        props.ref(node);
                    } else if (props.ref) {
                        props.ref.current = node;
                    }
                }}
                aria-describedby={id ? `${id}-feedback` : undefined}
                aria-invalid={props.invalid || undefined}
                aria-readonly={props.readonly || undefined}
                className={styles.root()}
                disabled={props.disabled || props.readonly}
                id={id}
                name={props.name}
                required={props.required}
                value={value}
                onChange={event => {
                    const option = event.target.selectedOptions[0];
                    if (!props.disabled && !props.readonly && !option?.disabled) {
                        props.onValueChange(event.target.value);
                    }
                }}
                onBlur={event => props.onFieldBlur(event.target.value)}>
                {options.map(option => (
                    <option
                        className={styles.option()}
                        disabled={option.disabled}
                        key={option.id}
                        value={option.id}>{option.name}</option>
                ))}
            </select>
            <i
                aria-hidden="true"
                className={`${props.iconPrefix ?? "bi bi-"}chevron-down ${styles.icon()}`}/>
            {props.readonly && !props.disabled && props.name
                && <input
                    name={props.name}
                    type="hidden"
                    value={value}/>}
        </div>
    );
}

SelectField.displayName = "SelectField";
