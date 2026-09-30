import { radioVariants } from "../variants";
import type { RadioFieldProps } from "../@types/core";

/**
 * Core - `RadioField`
 * Compartilha opções, acessibilidade e estilos entre os modos.
 */
export function RadioField(props: RadioFieldProps) {
    const id = props.id ?? props.name;
    const groupStyles = radioVariants({ align: props.align });
    const focusOption = props.options.findIndex(option => !option.disabled);
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
            role="radiogroup">
            {props.options.map((option, index) => {
                const disabled = Boolean(props.disabled || option.disabled);
                const styles = radioVariants({
                    size: props.sizes,
                    disabled,
                    readonly: props.readonly,
                    invalid: props.invalid,
                    checked: option.value === props.value
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
                            checked={option.value === props.value}
                            className={styles.input()}
                            disabled={disabled || props.readonly}
                            id={inputId}
                            name={props.name}
                            required={props.required}
                            type="radio"
                            value={option.value}
                            onChange={event => {
                                if (!disabled && !props.readonly) {
                                    props.onValueChange(event.target.value);
                                }
                            }}
                            onBlur={event => props.onFieldBlur(event.target.value)}/>
                        <label
                            className={styles.label()}
                            htmlFor={inputId}>{option.label}</label>
                    </div>
                );
            })}
            {props.readonly && !props.disabled && props.value != null
                && <input
                    name={props.name}
                    type="hidden"
                    value={String(props.value)}/>}
        </div>
    );
}

RadioField.displayName = "RadioField";
