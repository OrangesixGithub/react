import { checkboxVariants } from "../variants";
import type { CheckboxValue } from "../@types";
import type { CheckboxFieldProps } from "../@types/core";

/**
 * Core - `CheckboxField`
 * Compartilha opções, acessibilidade e estilos entre os modos.
 */
export function CheckboxField(props: CheckboxFieldProps) {
    const id = props.id ?? props.name;
    const values: Array<CheckboxValue> = Array.isArray(props.value) ? props.value : [];
    const groupStyles = checkboxVariants({ align: props.align });
    const focusOption = props.options.findIndex(option => !option.disabled);
    /**
     * Monta a nova lista, marcando ou desmarcando a opção e mantendo a ordem das `options`.
     */
    const toggle = (value: CheckboxValue, checked: boolean) => props.options
        .map(option => option.value)
        .filter(optionValue => optionValue === value ? checked : values.includes(optionValue));
    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return (
        <div
            aria-describedby={`${id}-feedback`}
            aria-invalid={props.invalid || undefined}
            aria-label={props.label ?? props.name}
            aria-readonly={props.readonly || undefined}
            aria-required={props.required || undefined}
            className={groupStyles.group()}
            role="group">
            {props.options.map((option, index) => {
                const checked = values.includes(option.value);
                const disabled = Boolean(props.disabled || option.disabled);
                const styles = checkboxVariants({
                    size: props.sizes,
                    disabled,
                    readonly: props.readonly,
                    invalid: props.invalid,
                    checked
                });
                const inputId = `${id}-${option.value}`;
                return (
                    <div
                        className={styles.option()}
                        key={option.value}>
                        <input
                            ref={node => {
                                if (index === focusOption) {
                                    if (typeof props.focusInputRef === "function") {
                                        props.focusInputRef(node);
                                    } else if (props.focusInputRef) {
                                        props.focusInputRef.current = node;
                                    }
                                }
                            }}
                            aria-describedby={`${id}-feedback`}
                            aria-invalid={props.invalid || undefined}
                            aria-readonly={props.readonly || undefined}
                            checked={checked}
                            className={styles.input()}
                            disabled={disabled || props.readonly}
                            id={inputId}
                            name={props.name}
                            type="checkbox"
                            value={String(option.value)}
                            onChange={event => {
                                if (!disabled && !props.readonly) {
                                    props.onValueChange(toggle(option.value, event.target.checked));
                                }
                            }}
                            onBlur={() => props.onFieldBlur(values)}/>
                        <label
                            className={styles.label()}
                            htmlFor={inputId}>{option.label}</label>
                    </div>
                );
            })}
            {props.readonly && !props.disabled && values.map(value => <input
                key={value}
                name={props.name}
                type="hidden"
                value={String(value)}/>)}
        </div>
    );
}

CheckboxField.displayName = "CheckboxField";
