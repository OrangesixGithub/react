import { InputMasked } from "./masked";
import { InputPassword } from "./password";
import { InputText } from "primereact/inputtext";
import type { InputBaseProps } from "../@types/core";
import { InputNumber } from "primereact/inputnumber";
import type { ChangeEvent, FocusEvent, Ref } from "react";
import { inputVariants, inputNumberVariants } from "../variants";
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
    const numberClasses = inputNumberVariants(props);
    const numberLayout = props.numberButtonLayout ?? "stacked";
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
                    unstyled
                    pt={{
                        buttonGroup: { className: numberClasses.buttonGroup },
                        incrementButton: { disabled: props.disabled || props.readonly },
                        decrementButton: { disabled: props.disabled || props.readonly },
                    }}
                    buttonLayout={numberLayout}
                    className={numberClasses.root}
                    currency={props.numberCurrency ?? "BRL"}
                    decrementButtonClassName={numberClasses.decrementButton}
                    decrementButtonIcon={`pi ${numberLayout === "stacked" ? "pi-angle-down" : "pi-minus"} ${numberClasses.icon}`}
                    disabled={props.disabled}
                    incrementButtonClassName={numberClasses.incrementButton}
                    incrementButtonIcon={`pi ${numberLayout === "stacked" ? "pi-angle-up" : "pi-plus"} ${numberClasses.icon}`}
                    inputClassName={numberClasses.input}
                    inputId={props.id ?? props.name}
                    inputRef={props.inputRef}
                    invalid={props.invalid}
                    locale="pt-BR"
                    max={props.numberMax}
                    maxFractionDigits={props.numberMaxFractionDigits}
                    min={props.numberMin}
                    minFractionDigits={props.numberMinFractionDigits}
                    mode={props.numberMode}
                    name={props.name}
                    placeholder={props.placeholder}
                    prefix={props.numberPrefix}
                    readOnly={props.readonly}
                    required={props.required}
                    showButtons={props.numberButton ?? false}
                    suffix={props.numberSuffix}
                    useGrouping={props.numberDecimalSeparator ?? false}
                    value={numberValue}
                    onBlur={(event: FocusEvent<HTMLInputElement>) => props.onFieldBlur(event.target.value)}
                    onValueChange={event => props.onValueChange(event.value ?? null)}/>
                : <InputText
                    unstyled
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
