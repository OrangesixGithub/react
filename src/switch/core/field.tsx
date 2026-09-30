import { switchVariants } from "../variants";
import type { SwitchFieldProps } from "../@types/core";

/**
 * Core - `SwitchField`
 * Compartilha o checkbox nativo, os valores e os estilos entre os modos.
 */
export function SwitchField(props: SwitchFieldProps) {
    const trueValue = props.valueTrue ?? true;
    const falseValue = props.valueFalse ?? false;
    const checked = props.value === trueValue;
    const styles = switchVariants({
        checked,
        size: props.sizes,
        invalid: props.invalid,
        disabled: props.disabled,
        readonly: props.readonly
    });
    const id = props.id ?? props.name;
    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return (
        <div className={styles.wrapper()}>
            <input
                ref={node => {
                    if (typeof props.focusInputRef === "function") {
                        props.focusInputRef(node);
                    } else if (props.focusInputRef) {
                        props.focusInputRef.current = node;
                    }
                }}
                aria-checked={checked}
                aria-describedby={id ? `${id}-feedback` : undefined}
                aria-invalid={props.invalid || undefined}
                aria-label={props.legend ?? props.label ?? props.name ?? "Alternar"}
                aria-readonly={props.readonly || undefined}
                checked={checked}
                className={styles.input()}
                disabled={props.disabled || props.readonly}
                id={id}
                name={props.name}
                required={props.required}
                role="switch"
                type="checkbox"
                value={String(trueValue)}
                onChange={event => {
                    if (!props.disabled && !props.readonly) {
                        props.onValueChange(event.target.checked ? trueValue : falseValue);
                    }
                }}
                onBlur={() => props.onFieldBlur(checked ? trueValue : falseValue)}/>
            {props.legend && <label
                className={styles.legend()}
                htmlFor={id}>{props.legend}</label>}
            {props.readonly && !props.disabled && props.name
                && <input
                    name={props.name}
                    type="hidden"
                    value={String(checked ? trueValue : falseValue)}/>}
        </div>
    );
}

SwitchField.displayName = "SwitchField";
