import type { Ref } from "react";
import type { Control, FieldValues } from "react-hook-form";

import type {
    ApiFieldModeProps,
    ApiComponentProps,
    ApiFieldHookFormProps,
    ApiFieldComponentProps,
    ApiFieldControlledProps,
} from "../../api";

export interface CalendarBaseProps extends ApiComponentProps, ApiFieldComponentProps {
    /** Referência ao campo HTML. */
    ref?: Ref<HTMLInputElement>;

    /** Classe aplicada somente ao campo de entrada. */
    inputClassName?: string;

    /** Data mínima permitida, inclusive. Aceita Date ou string ISO (YYYY-MM-DD). */
    minDate?: Date | string | null;

    /** Data máxima permitida, inclusive. Aceita Date ou string ISO (YYYY-MM-DD). */
    maxDate?: Date | string | null;

    /** Seleção única (padrão) ou de várias datas. No modo multiple, value/onChange usam uma lista ISO. */
    selectionMode?: "single" | "multiple";

    /** Seleciona um intervalo somente em multiple. Retorna [início, fim], com fim null enquanto incompleto. */
    range?: boolean;

    /**
     * Define o formato da exibição da data
     */
    format?: string

    /**
     * Define a quantidade de mês a ser exibido
     */
    numberMonths?: number

    /**
     * Define o local onde vai ser renderizado calendário
     */
    appendTo?: "self" | HTMLElement | undefined | null | (() => HTMLElement)

    /**
     * Define se vai aparecer os botões no footer do calendário
     */
    showButtons?: boolean
}

/** Propriedades internas do campo compartilhado entre os modos. */
export type CalendarFieldProps = CalendarBaseProps & {
    /** Valor recebido antes da conversão para data local. */
    value: unknown;

    /** Aplica o estado de erro ao campo. */
    invalid?: boolean;

    /** Referência ao campo utilizada pelo consumidor e pelo HookForm. */
    inputRef?: Ref<HTMLInputElement>;

    /** Retorna uma data ISO ou null em single; uma lista ISO (vazia ao limpar) em multiple. */
    onValueChange: (value: string | (string | null)[] | null) => void;

    /** Executado ao sair do campo, preservando o elemento HTML recebido. */
    onFieldBlur: (target: HTMLInputElement) => void;
};

export type CalendarProps<T extends ApiFieldModeProps, TValues extends FieldValues = FieldValues> = T extends "Controlled"
    ? CalendarBaseProps & ApiFieldControlledProps
    : CalendarBaseProps & Omit<ApiFieldHookFormProps, "control"> & { control: Control<TValues> };
