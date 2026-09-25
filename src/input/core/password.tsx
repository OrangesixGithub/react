import { useState } from "react";
import type { InputFieldProps } from "./field";
import { InputText } from "primereact/inputtext";
import type { ChangeEvent, FocusEvent } from "react";
import type { InputPasswordTemplateProps } from "../@types/password";

type PasswordProps = InputFieldProps & {
    className: string;
    value: string;
};

/**
 * Core - `InputPassword`
 * Mantém as opções de visibilidade e feedback da senha na API pública.
 */
export function InputPassword(props: PasswordProps) {
    const [visible, setVisible] = useState(false);
    const strength = props.value.length < 6 ? "Fraca" : props.value.length < 10 ? "Média" : "Forte";
    const templateProps: InputPasswordTemplateProps = { value: props.value };
    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return (
        <div className="w-full">
            <div className="relative">
                <InputText
                    ref={(node: unknown) => {
                        const input = node as HTMLInputElement | null;
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
                    type={visible ? "text" : "password"}
                    value={props.value}
                    onBlur={(event: FocusEvent<HTMLInputElement>) => props.onFieldBlur(event.target.value)}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => props.onValueChange(event.target.value)}/>
                {props.passwordShow
                    && <button
                        aria-label={visible ? "Ocultar senha" : "Mostrar senha"}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 dark:text-slate-300 dark:hover:text-white"
                        disabled={props.disabled}
                        type="button"
                        onClick={() => setVisible(current => !current)}>
                        <i
                            aria-hidden="true"
                            className={visible ? "pi pi-eye-slash" : "pi pi-eye"}/>
                    </button>}
            </div>
            {props.passwordFeedback && !props.readonly &&
                <div
                    aria-live="polite"
                    className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                    {props.passwordHeaderTemplate?.(templateProps)}
                    {props.passwordTemplate?.(templateProps) ?? (props.value ? strength : "Por favor, insira uma senha")}
                    {props.passwordFooterTemplate?.(templateProps)}
                </div>}
        </div>
    );
}
