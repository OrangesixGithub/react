import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { InputMasked } from "./masked";
import { InputPassword } from "./password";
import { inputVariants } from "../variants";
import type { ChangeEvent, FocusEvent, Ref } from "react";
import type { InputBaseProps } from "../@types/core";

export type InputFieldProps = InputBaseProps & {
    value: unknown;
    invalid?: boolean;
    inputRef?: Ref<HTMLInputElement>;
    onValueChange: (value: string | number | null) => void;
    onFieldBlur: (value: string) => void;
};

/**
 * Core - `InputField`
 * Seleciona a implementação do PrimeReact 11 para cada tipo de campo.
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
                ? <InputNumber.Root
                    currency={props.numberCurrency ?? "BRL"}
                    disabled={props.disabled}
                    invalid={props.invalid}
                    locale="pt-BR"
                    max={props.numberMax}
                    maxFractionDigits={props.numberMaxFractionDigits}
                    min={props.numberMin}
                    minFractionDigits={props.numberMinFractionDigits}
                    mode={props.numberMode}
                    name={props.name}
                    prefix={props.numberPrefix}
                    readOnly={props.readonly}
                    suffix={props.numberSuffix}
                    useGrouping={props.numberDecimalSeparator ?? false}
                    value={numberValue}
                    onValueChange={(event: { value: number }) => props.onValueChange(event.value)}>
                    <InputNumber.Input
                        ref={(node: unknown) => {
                            const input = node as HTMLInputElement | null;
                            if (typeof props.inputRef === "function") props.inputRef(input);
                            else if (props.inputRef) props.inputRef.current = input;
                        }}
                        aria-invalid={props.invalid || undefined}
                        className={classes}
                        id={props.id ?? props.name}
                        name={props.name}
                        placeholder={props.placeholder}
                        required={props.required}
                        onBlur={(event: FocusEvent<HTMLInputElement>) => props.onFieldBlur(event.target.value)}/>
                </InputNumber.Root>
                : <InputText
                    ref={(node: unknown) => {
                        const input = node as HTMLInputElement | null;
                        if (typeof props.inputRef === "function") props.inputRef(input);
                        else if (props.inputRef) props.inputRef.current = input;
                    }}
                    aria-invalid={props.invalid || undefined}
                    className={classes}
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
