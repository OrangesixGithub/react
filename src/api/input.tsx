import type { FieldErrors } from "react-hook-form";
import type { ApiComponentProps, ApiFieldComponentProps } from "./@types";

/**
 * API - `InputLabel`
 *
 * Exibe o rótulo e indica visualmente quando o campo é obrigatório.
 */
export function InputLabel({ id, name, label, icon, iconPrefix = "pi pi-", required }: ApiFieldComponentProps) {
    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return label && (
        <label
            className="mb-1 block text-sm font-medium"
            htmlFor={id ?? name}>
            {icon && <i
                aria-hidden="true"
                className={`${iconPrefix}${icon} mr-1`}/>}
            {label}
            {required && <span
                aria-hidden="true"
                className="ml-1 text-red-600">*</span>}
        </label>
    );
}

/**
 * API - `InputFeedback`
 *
 * Exibe a mensagem de validação informada diretamente ou pelo React Hook Form.
 */
export function InputFeedback({ error, errors, id, name, className }: ApiFieldComponentProps & {
    errors?: FieldErrors
    className?: string
}) {
    const fieldError = name?.split(/[.[\]]+/).filter(Boolean).reduce<unknown>((value, key) => {
        return value && typeof value === "object" ? (value as Record<string, unknown>)[key] : undefined;
    }, errors);
    const message = fieldError && typeof fieldError === "object" && "message" in fieldError
        ? fieldError.message : undefined;
    const feedback = error ?? (typeof message === "string" ? message : undefined);

    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return (
        <div
            aria-live="polite"
            className={feedback ? (className ?? "mt-1 text-red-600 text-xs") : undefined}
            data-name={name}
            id={id || name ? `${id ?? name}-feedback` : undefined}>
            {feedback}
        </div>
    );
}

/**
 * API - `InputProps`
 *
 * Reúne as propriedades comuns encaminhadas ao controle de entrada.
 */
export function InputProps<T extends ApiComponentProps & ApiFieldComponentProps & { ref?: unknown }>(props: T) {
    return {
        ref: props.ref,
        id: props.id,
        name: props.name,
        required: props.required,
        disabled: props.disabled,
        placeholder: props.placeholder,
        className: props.className,
        style: { width: "100%" },
    };
}

InputLabel.displayName = "InputLabel";
InputFeedback.displayName = "InputFeedback";
