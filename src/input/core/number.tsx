import clsx from "clsx";
import type { FocusEvent } from "react";
import type { InputFieldProps } from "./field";
import { inputNumberVariants } from "../variants";
import { InputNumber as PrimeInputNumber } from "primereact/inputnumber";

type NumberProps = InputFieldProps & { value: number | null; };

/**
 * Core - `InputNumber`
 * Renderiza o campo numérico com as opções e os layouts da Orange Six.
 */
export function InputNumber(props: NumberProps) {
    const numberClasses = inputNumberVariants(props);
    const numberLayout = props.numberButtonLayout ?? "stacked";
    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return (
        <PrimeInputNumber
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
            inputClassName={clsx(numberClasses.input, props.inputClassName)}
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
            value={props.value}
            onBlur={(event: FocusEvent<HTMLInputElement>) => props.onFieldBlur(event.target.value)}
            onValueChange={event => props.onValueChange(event.value ?? null)}/>
    );
}

InputNumber.displayName = "InputNumber";
