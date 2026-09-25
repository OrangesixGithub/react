import type { FocusEvent } from "react";
import type { InputFieldProps } from "./field";
import { InputText } from "primereact/inputtext";
import { useMask } from "@primereact/hooks/use-mask";

type MaskedProps = InputFieldProps & { className: string; value: string; };

/**
 * Core - `InputMasked`
 * Aplica uma máscara ao InputText do PrimeReact 11.
 */
export function InputMasked(props: MaskedProps) {
    const mask = props.mask === "cpf"
        ? "999.999.999-99"
        : props.mask === "cnpj" ? "99.999.999/9999-99"
            : props.mask ?? "";
    const masked = useMask({
        mask,
        value: props.value,
        autoClear: props.maskAutoClear ?? true,
        readOnly: props.readonly,
        onValueChange: event => props.onValueChange(event.value),
    });
    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return (
        <InputText
            ref={(node: unknown) => {
                const input = node as HTMLInputElement | null;
                masked.ref(input);
                if (typeof props.inputRef === "function") props.inputRef(input);
                else if (props.inputRef) props.inputRef.current = input;
            }}
            aria-invalid={props.invalid || undefined}
            className={props.className}
            disabled={props.disabled}
            id={props.id ?? props.name}
            name={props.name}
            placeholder={props.placeholder}
            readOnly={props.readonly}
            required={props.required}
            size={props.sizes}
            value={props.value}
            onBlur={(event: FocusEvent<HTMLInputElement>) => props.onFieldBlur(event.target.value)}/>
    );
}
