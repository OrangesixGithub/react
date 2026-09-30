import type { Ref } from "react";
import type { SelectOptionsProps } from "./options";
import type { Control, FieldValues } from "react-hook-form";
import type {
    ApiComponentProps,
    ApiFieldModeProps,
    ApiFieldHookFormProps,
    ApiFieldComponentProps,
    ApiFieldControlledProps
} from "../../api";

/** Propriedades compartilhadas do componente Select. */
export interface SelectBaseProps extends ApiComponentProps, ApiFieldComponentProps {
    /** Referência ao select nativo usado para envio do formulário. */
    ref?: Ref<HTMLSelectElement>;

    /** Opções disponíveis para seleção. */
    options: Array<SelectOptionsProps>;

    /** Inclui uma opção vazia; true usa "Selecione" e o rótulo, string usa o texto informado. */
    init?: boolean | string;

    /** Tamanho visual do campo; sem valor utiliza o tamanho normal. */
    sizes?: "small" | "large";
}

/** Propriedades internas do campo select compartilhado entre os modos. */
export type SelectFieldProps = SelectBaseProps & {
    /** Valor selecionado antes da normalização para string. */
    value: unknown;

    /** Aplica o estado visual e acessível de campo inválido. */
    invalid?: boolean;

    /** Referência utilizada pelo HookForm para focar o select nativo. */
    focusInputRef?: Ref<HTMLSelectElement>;

    /** Callback executado ao sair do campo com o valor atual. */
    onFieldBlur: (value: string) => void;

    /** Callback executado ao selecionar uma opção habilitada. */
    onValueChange: (value: string) => void;
};

/** Props conforme o modo Controlled ou HookForm, preservando os nomes da API 2.x. */
export type SelectProps<T extends ApiFieldModeProps, TValues extends FieldValues = FieldValues> = T extends "Controlled"
    ? SelectBaseProps & ApiFieldControlledProps
    : SelectBaseProps & Omit<ApiFieldHookFormProps, "control"> & { control: Control<TValues> };
