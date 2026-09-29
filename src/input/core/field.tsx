import clsx from "clsx";
import { InputMasked } from "./masked";
import { InputNumber } from "./number";
import { InputPassword } from "./password";
import { inputVariants } from "../variants";
import { InputText } from "primereact/inputtext";
import type { InputBaseProps } from "../@types/core";
import type { ChangeEvent, FocusEvent, Ref } from "react";
import type { InputMaskProps, InputNumberProps, InputPasswordProps } from "../@types";

export type InputFieldProps = InputBaseProps & InputMaskProps & InputNumberProps & InputPasswordProps & {
    type?: "text" | "date" | "email" | "time" | "number" | "password";
    value: unknown;
    invalid?: boolean;
    inputRef?: Ref<HTMLInputElement>;
    onFieldBlur: (value: string) => void;
    onValueChange: (value: string | number | null) => void;
};

/**
 * Core - `InputField`
 * Seleciona a implementação do PrimeReact 10.9.9 para cada tipo de campo.
 */
export function InputField(props: InputFieldProps) {
    const classes = inputVariants(props.invalid, props.sizes);
    const textValue = props.value == null ? "" : String(props.value);
    const numberValue = typeof props.value === "number" ? props.value : null;
    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return props.mask !== undefined
        ? <InputMasked
            {...props}
            className={classes}
            value={textValue}/>
        : props.type === "password"
            ? <InputPassword
                {...props}
                className={classes}
                value={textValue}/>
            : props.type === "number"
                ? <InputNumber
                    {...props}
                    value={numberValue}/>
                : <InputText
                    unstyled
                    ref={(node: unknown) => {
                        const input = node as HTMLInputElement | null;
                        if (typeof props.inputRef === "function") props.inputRef(input);
                        else if (props.inputRef) props.inputRef.current = input;
                    }}
                    aria-invalid={props.invalid || undefined}
                    className={clsx(classes, props.inputClassName)}
                    disabled={props.disabled}
                    id={props.id ?? props.name}
                    name={props.name}
                    placeholder={props.placeholder}
                    readOnly={props.readonly}
                    required={props.required}
                    size={props.sizes}
                    type={props.type ?? "text"}
                    value={textValue}
                    onBlur={(event: FocusEvent<HTMLInputElement>) => props.onFieldBlur(event.target.value)}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => props.onValueChange(event.target.value)}/>;
}
