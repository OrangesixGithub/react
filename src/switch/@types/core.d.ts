import type { Ref } from "react";
import type { Control, FieldValues } from "react-hook-form";
import type {
    ApiComponentProps,
    ApiFieldModeProps,
    ApiFieldHookFormProps,
    ApiFieldComponentProps,
    ApiFieldControlledProps
} from "../../api";

/** Propriedades compartilhadas do Switch. */
export interface SwitchBaseProps extends ApiComponentProps, ApiFieldComponentProps {
    /** Legenda clicável exibida ao lado do controle. */
    legend?: string;
    /** Valor enviado quando ativado; sem valor utiliza true. */
    valueTrue?: string;
    /** Valor enviado quando desativado; sem valor utiliza false. */
    valueFalse?: string;
    /** Tamanho visual do controle e da legenda; sem valor utiliza o tamanho normal. */
    sizes?: "small" | "large";
}

/** Props conforme o modo de controle, preservando a API 2.x. */
export type SwitchProps<T extends ApiFieldModeProps, TValues extends FieldValues = FieldValues> = T extends "Controlled"
    ? SwitchBaseProps & ApiFieldControlledProps
    : SwitchBaseProps & Omit<ApiFieldHookFormProps, "control"> & { control: Control<TValues> };

/** Propriedades internas do campo compartilhado. */
export type SwitchFieldProps = SwitchBaseProps & {
    /** Valor atual do campo. */
    value: unknown;
    /** Estado visual e acessível de erro. */
    invalid?: boolean;
    /** Referência para foco de validação do HookForm. */
    focusInputRef?: Ref<HTMLInputElement>;
    /** Callback ao sair do controle com seu valor atual. */
    onFieldBlur: (value: boolean | string) => void;
    /** Callback ao alternar o controle com o valor configurado. */
    onValueChange: (value: boolean | string) => void;
};
