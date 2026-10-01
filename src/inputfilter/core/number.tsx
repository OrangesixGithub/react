import { inputfilterVariants } from "../variants";
import { handleDigits, handleGetValueNumber } from "../function/handle";
import type { InputFilterCoreProps, InputFilterOptionsMap } from "../@types";

/**
 * Core - `NumberField`
 * Campo do filtro tipo numero
 */
export function NumberField<T extends keyof InputFilterOptionsMap>(props: InputFilterCoreProps<T>) {
    const styles = inputfilterVariants({ invalid: Boolean(props.error) });
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
            id={(props.id ?? "input-filter") + "-number"}
            inputMode="decimal"
            name={(props.name ?? "input-filter") + "-number"}
            placeholder={props.placeholder}
            readOnly={props.readonly}
            required={props.required}
            value={handleGetValueNumber(props.value, props.options ?? "")}
            onChange={event => props.onChange(handleDigits(event.target.value) + props.select)}/>
    );
}

NumberField.displayName = "NumberField";
