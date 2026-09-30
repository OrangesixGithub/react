import clsx from "clsx";
import { textareaVariants } from "../variants";
import type { ChangeEvent, FocusEvent } from "react";
import { InputTextarea } from "primereact/inputtextarea";
import type { TextareaFieldProps } from "../@types/core";

/**
 * Core - `TextareaField`
 * Compartilha o `textarea` do PrimeReact 10.9.9 e os estilos entre os modos.
 */
export function TextareaField(props: TextareaFieldProps) {
    const classes = textareaVariants({
        invalid: props.invalid,
        autoResize: props.autoResize,
        size: props.sizes,
    });
    const id = props.id ?? props.name;
    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return (
        <InputTextarea
            unstyled
            ref={(node: unknown) => {
                const textarea = node as HTMLTextAreaElement | null;
                if (typeof props.inputRef === "function") props.inputRef(textarea);
                else if (props.inputRef) props.inputRef.current = textarea;
            }}
            aria-describedby={id ? `${id}-feedback` : undefined}
            aria-invalid={props.invalid || undefined}
            autoResize={props.autoResize}
            className={clsx(classes, props.inputClassName)}
            disabled={props.disabled}
            id={id}
            name={props.name}
            placeholder={props.placeholder}
            readOnly={props.readonly}
            required={props.required}
            rows={props.rows}
            value={props.value == null ? "" : String(props.value)}
            onBlur={(event: FocusEvent<HTMLTextAreaElement>) => props.onFieldBlur(event.target.value)}
            onChange={(event: ChangeEvent<HTMLTextAreaElement>) => props.onValueChange(event.target.value)}/>
    );
}

TextareaField.displayName = "TextareaField";
