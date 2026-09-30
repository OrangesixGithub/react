import type { Ref } from "react";
import type { RadioOptionsProps } from "./options";
import type { Control, FieldValues } from "react-hook-form";
import type { ApiComponentProps, ApiFieldModeProps, ApiFieldHookFormProps, ApiFieldComponentProps, ApiFieldControlledProps } from "../../api";

/** Propriedades compartilhadas do Radio. */
export interface RadioBaseProps extends ApiComponentProps, ApiFieldComponentProps {
    /** Nome do grupo de opções e do campo no formulário. */
    name: string;
    /** Opções disponíveis para seleção. */
    options: Array<RadioOptionsProps>;
    /** Direção das opções; o padrão é horizontal. */
    align?: "row" | "column";
    /** Tamanho visual das opções; sem valor utiliza o tamanho normal. */
    sizes?: "small" | "large";
}

/** Props dos modos públicos, preservando a API 2.x. */
export type RadioProps<T extends ApiFieldModeProps, TValues extends FieldValues = FieldValues> = T extends "Controlled"
    ? RadioBaseProps & ApiFieldControlledProps
    : RadioBaseProps & Omit<ApiFieldHookFormProps, "control"> & { control: Control<TValues> };

/** Propriedades internas do grupo compartilhado. */
export type RadioFieldProps = RadioBaseProps & {
    /** Valor selecionado. */
    value: unknown;
    /** Estado visual e acessível de erro. */
    invalid?: boolean;
    /** Referência para o foco de validação do HookForm. */
    focusInputRef?: Ref<HTMLInputElement>;
    /** Callback ao sair de uma opção. */
    onFieldBlur: (value: string) => void;
    /** Callback ao selecionar uma opção. */
    onValueChange: (value: string) => void;
};
