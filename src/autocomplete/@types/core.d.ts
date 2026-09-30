import type { ReactNode, Ref } from "react";
import type { Control, FieldValues } from "react-hook-form";
import type {
    ApiComponentProps,
    ApiFieldComponentProps,
    ApiFieldModeProps,
    ApiFieldControlledProps,
    ApiFieldHookFormProps
} from "../../api";

export interface AutocompleteDataProps {
    /**
     * Define o identificador do objeto.
     */
    id?: any;

    /**
     * Define o identificador legado do objeto.
     * @deprecated Utilize `id`. Mantido para compatibilidade com a API 2.x.
     */
    code?: any;

    /**
     * Define o label do objeto
     */
    name: string;
}

export interface AutocompleteBaseProps extends ApiComponentProps, ApiFieldComponentProps {
    /** Referência ao campo HTML, inclusive para foco na validação. */
    ref?: Ref<HTMLInputElement>;

    /**
     * Dados a ser sugerido
     */
    data: AutocompleteDataProps[]

    /**
     * Define o template para cada item do autocomplete
     */
    dataTemplate?: (value: AutocompleteDataProps) => ReactNode;

    /**
     * A propriedade `appendTo` determina onde a instância do painel de sobreposição deve ser montado.
     */
    appendTo?: "self" | HTMLElement;

    /**
     * Determina se é obrigatório a seleção do elemento
     */
    forceSelect?: boolean

    /**
     * Define o tempo para realizar a pesquisa da sugestão de dados.
     */
    searchDelay?: number

    /**
     * Define a quantidade minima de caracter para realizar a pesquisa da sugestão de dados.
     */
    searchMin?: number

    /**
     * Define a quantidade máxima de caracter para realizar a pesquisa da sugestão de dados.
     */
    searchMax?: number

    /**
     * Executa após a seleção do objeto do autocomplete.
     */
    onSelect?: (value: any) => void;

    /**
     * Retorno de chamada para invocar a busca por sugestões.
     */
    onSearch(query: string): void;
}

export type AutocompleteProps<T extends ApiFieldModeProps = "Controlled", TValues extends FieldValues = FieldValues> =
    AutocompleteBaseProps
    & (T extends "Controlled" ? ApiFieldControlledProps : Omit<ApiFieldHookFormProps, "control"> & {
        control: Control<TValues>
    });
