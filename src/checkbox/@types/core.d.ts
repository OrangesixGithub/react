import type { Ref } from "react";
import type { Control, FieldValues } from "react-hook-form";
import type { CheckboxValue, CheckboxOptionsProps } from "./options";
import type { ApiComponentProps, ApiFieldModeProps, ApiFieldHookFormProps, ApiFieldComponentProps, ApiFieldControlledProps } from "../../api";

/** Propriedades compartilhadas do Checkbox. */
export interface CheckboxBaseProps extends ApiComponentProps, ApiFieldComponentProps {
    /** Nome do grupo de opções e do campo no formulário. */
    name: string;
    /** Opções disponíveis para seleção. */
    options: Array<CheckboxOptionsProps>;
    /** Direção das opções; o padrão é horizontal. */
    align?: "row" | "column";
    /** Tamanho visual das opções; sem valor utiliza o tamanho normal. */
    sizes?: "small" | "large";
}

/** Props dos modos públicos; o valor e os callbacks trabalham com a lista de valores marcados, como `[1, 2, 3]`. */
export type CheckboxProps<T extends ApiFieldModeProps, TValues extends FieldValues = FieldValues> = T extends "Controlled"
    ? CheckboxBaseProps & ApiFieldControlledProps
    : CheckboxBaseProps & Omit<ApiFieldHookFormProps, "control"> & { control: Control<TValues> };

/** Propriedades internas do grupo compartilhado. */
export type CheckboxFieldProps = CheckboxBaseProps & {
    /** Lista de valores marcados. */
    value: unknown;
    /** Estado visual e acessível de erro. */
    invalid?: boolean;
    /** Referência para o foco de validação do HookForm. */
    focusInputRef?: Ref<HTMLInputElement>;
    /** Callback ao sair de uma opção, com a lista atual. */
    onFieldBlur: (value: Array<CheckboxValue>) => void;
    /** Callback ao marcar ou desmarcar uma opção, com a nova lista. */
    onValueChange: (value: Array<CheckboxValue>) => void;
};
