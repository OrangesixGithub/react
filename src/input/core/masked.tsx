import type { FocusEvent } from "react";
import type { InputFieldProps } from "./field";
import { InputMask } from "primereact/inputmask";

type MaskedProps = InputFieldProps & { className: string; value: string; };

/**
 * Core - `InputMasked`
 * Aplica uma máscara com o InputMask do PrimeReact 10.9.9.
 */
export function InputMasked(props: MaskedProps) {
    const mask = props.mask === "cpf"
        ? "999.999.999-99"
        : props.mask === "cnpj" ? "99.999.999/9999-99"
            : props.mask ?? "";
    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return (
        <InputMask
            unstyled
            ref={node => {
                const input = (node && "getElement" in node ? node.getElement() : node) as unknown as HTMLInputElement | null;
                if (typeof props.inputRef === "function") props.inputRef(input);
                else if (props.inputRef) props.inputRef.current = input;
            }}
            aria-invalid={props.invalid || undefined}
            autoClear={props.maskAutoClear ?? true}
            className={props.className}
            disabled={props.disabled}
            id={props.id ?? props.name}
            mask={mask}
            name={props.name}
            placeholder={props.placeholder}
            readOnly={props.readonly}
            required={props.required}
            size={props.sizes}
            value={props.value}
            onBlur={(event: FocusEvent<HTMLInputElement>) => props.onFieldBlur(event.target.value)}
            onChange={event => props.onValueChange(event.value ?? "")}/>
    );
}
