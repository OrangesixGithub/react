import { inputfilterVariants } from "../variants";
import { handleGetValueText } from "../function/handle";
import type { InputFilterCoreProps, InputFilterOptionsMap } from "../@types";

/**
 * Core - `TextField`
 * Campo do filtro tipo texto
 */
export function TextField<T extends keyof InputFilterOptionsMap>(props: InputFilterCoreProps<T>) {
    const styles = inputfilterVariants({ invalid: Boolean(props.error) });
    const id = (props.id ?? "input-filter") + "-text";
    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return (
        <input
            aria-invalid={Boolean(props.error) || undefined}
            className={styles.field()}
            disabled={props.disabled}
            id={id}
            name={(props.name ?? "input-filter") + "-text"}
            placeholder={props.placeholder}
            readOnly={props.readonly}
            required={props.required}
            value={handleGetValueText(props.value, props.options) ?? ""}
            onChange={event => props.onChange(event.target.value + props.select)}/>
    );
}

TextField.displayName = "TextField";
