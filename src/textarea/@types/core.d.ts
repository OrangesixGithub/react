import type { Ref } from "react";
import type { Control, FieldValues } from "react-hook-form";
import type {
    ApiComponentProps,
    ApiFieldModeProps,
    ApiFieldHookFormProps,
    ApiFieldComponentProps,
    ApiFieldControlledProps
} from "../../api";

/** Propriedades compartilhadas do componente Textarea. */
export interface TextareaBaseProps extends ApiComponentProps, ApiFieldComponentProps {
    /** Referência ao elemento HTML `textarea`. */
    ref?: Ref<HTMLTextAreaElement>;

    /** Ajusta a altura do campo ao conteúdo digitado; desativa o redimensionamento manual. */
    autoResize?: boolean;

    /** Quantidade de linhas visíveis do campo. */
    rows?: number;

    /** Tamanho visual do campo; sem valor utiliza o tamanho normal. */
    sizes?: "small" | "large";

    /** Define a classe somente do campo `textarea`. */
    inputClassName?: string;
}

/** Propriedades internas do campo compartilhado entre os modos. */
export type TextareaFieldProps = TextareaBaseProps & {
    /** Valor atual antes da normalização para string. */
    value: unknown;

    /** Aplica o estado visual e acessível de campo inválido. */
    invalid?: boolean;

    /** Referência utilizada pelo consumidor e pelo HookForm para focar o campo. */
    inputRef?: Ref<HTMLTextAreaElement>;

    /** Callback executado ao sair do campo com o valor atual. */
    onFieldBlur: (value: string) => void;

    /** Callback executado ao alterar o texto do campo. */
    onValueChange: (value: string) => void;
};

/** Props conforme o modo Controlled ou HookForm, preservando os nomes da API 2.x. */
export type TextareaProps<T extends ApiFieldModeProps, TValues extends FieldValues = FieldValues> = T extends "Controlled"
    ? TextareaBaseProps & ApiFieldControlledProps
    : TextareaBaseProps & Omit<ApiFieldHookFormProps, "control"> & { control: Control<TValues> };
