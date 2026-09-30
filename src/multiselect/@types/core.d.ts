import type { Ref } from "react";
import type { SelectItem } from "primereact/selectitem";
import type { MultiSelectFilterProps } from "./filter";
import type { MultiSelectTemplateProps } from "./template";
import type { Control, FieldValues } from "react-hook-form";
import type {
    ApiComponentProps,
    ApiFieldModeProps,
    ApiFieldHookFormProps,
    ApiFieldComponentProps,
    ApiFieldControlledProps
} from "../../api";

/** Propriedades compartilhadas do MultiSelect. */
export interface MultiSelectBaseProps extends ApiComponentProps, ApiFieldComponentProps {
    /** Opções disponíveis; utiliza label e value por padrão. */
    options: SelectItem[];
    /** Nome da propriedade usada como texto da opção. */
    optionLabel?: string;
    /** Nome da propriedade usada como valor da opção. */
    optionValue?: string;
    /** Exibe o indicador de carregamento e impede alterações. */
    loading?: boolean;
    /** Exibição dos valores selecionados; o padrão é chip. */
    display?: "comma" | "chip";
    /** Número máximo de opções selecionadas. */
    selectionLimit?: number;
    /** Destino do painel; sem valor é renderizado junto ao campo para herdar o tema. */
    appendTo?: null | "self" | HTMLElement | Function;
    /** Altura máxima da lista antes de habilitar rolagem. */
    scrollHeight?: string;
    /** Templates para as opções, cabeçalho e rodapé. */
    template?: MultiSelectTemplateProps;
    /** Habilita e configura a busca quando informado, inclusive como objeto vazio. */
    filter?: MultiSelectFilterProps;
    /** Tamanho visual; sem valor utiliza o tamanho normal. */
    sizes?: "small" | "large";
    /** Callback executado ao fechar o painel. */
    onHide?: () => void;
    /** Callback executado ao abrir o painel. */
    onShow?: () => void;
}

/** Props conforme o modo de controle, preservando os nomes da API 2.x. */
export type MultiSelectProps<T extends ApiFieldModeProps, TValues extends FieldValues = FieldValues> = T extends "Controlled"
    ? MultiSelectBaseProps & ApiFieldControlledProps
    : MultiSelectBaseProps & Omit<ApiFieldHookFormProps, "control"> & { control: Control<TValues> };

/** Propriedades internas do campo compartilhado. */
export type MultiSelectFieldProps = MultiSelectBaseProps & {
    /** Valores selecionados antes da normalização para lista. */
    value: unknown;
    /** Estado visual e acessível de erro. */
    invalid?: boolean;
    /** Referência para foco de validação do HookForm. */
    focusInputRef?: Ref<HTMLInputElement>;
    /** Callback ao sair do campo com os valores atuais. */
    onFieldBlur: (value: unknown[]) => void;
    /** Callback ao alterar a seleção. */
    onValueChange: (value: unknown[]) => void;
};
