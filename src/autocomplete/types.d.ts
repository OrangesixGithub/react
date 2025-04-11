import React from "react";
import { ApiComponentProps, ApiFieldComponentProps } from "../api/types";

export interface AutocompleteDataProps {
    /**
     * Define o identificador do objeto
     */
    code: any;

    /**
     * Define o label do objeto
     */
    name: string;
}

export interface AutocompleteProps extends ApiComponentProps, ApiFieldComponentProps {

    /**
     * Valor padrão
     */
    value: any;

    /**
     * Dados a ser sugerido
     */
    data: AutocompleteDataProps[]

    /**
     * Define o template para cada item do autocomplete
     */
    dataTemplate?: (value: AutocompleteDataProps) => React.ReactNode;

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
     * Retorno de chamada a ser invocado quando o valor de preenchimento automático for alterado.
     */
    onChange(value: any): void;

    /**
     * Retorno de chamada para invocar a busca por sugestões.
     */
    onSearch(query: string): void;

    /**
     * Executa após a seleção do objeto do autocomplete.
     */
    onSelect?: (value: any) => void;
}