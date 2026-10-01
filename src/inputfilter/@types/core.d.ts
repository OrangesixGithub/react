import type { InputFilterAutocompleteProps } from "./autocomplete";
import type { ApiComponentProps, ApiFieldComponentProps } from "../../api";

/** Operadores aceitos pelo filtro. */
export type InputFilterOptionsProps = "=" | "!=" | "<" | ">" | "<=" | ">=" | "{}" | "%" | "!%";

/** Operadores disponíveis para cada tipo de filtro. */
export type InputFilterOptionsMap = {
    text: "=" | "!=" | "%" | "!%"
    date: "=" | "!=" | "<" | ">" | "<=" | ">=" | "{}"
    autocomplete: "=" | "!=" | "%" | "!%"
    number: "=" | "!=" | "<" | ">" | "<=" | ">="
};

/** Propriedades internas recebidas pelos campos de cada tipo de filtro. */
export type InputFilterCoreProps<T extends keyof InputFilterOptionsMap> = InputFilterProps<T> & {
    /** Operadores já ordenados que o filtro aceita. */
    options: any[],

    /** Operador atualmente selecionado. */
    select: string
};

/** Propriedades compartilhadas por todos os tipos de filtro. */
export interface InputFilterBaseProps<T extends keyof InputFilterOptionsMap> extends ApiComponentProps, ApiFieldComponentProps {
    /**
     * Valor inicial do componente
     */
    value?: string

    /**
     * Retorna o valor modificado pelo componente
     */
    onChange(value: string | null): void

    /**
     * Define o tipo do filtro
     */
    type?: T;

    /**
     * Define as opções do filtro
     */
    options?: Array<InputFilterOptionsMap[T]>;
}

/** Props conforme o tipo do filtro; `autocomplete` acrescenta as props de sugestão. */
export type InputFilterProps<T extends keyof InputFilterOptionsMap> = T extends "autocomplete"
    ? InputFilterBaseProps<"autocomplete"> & InputFilterAutocompleteProps
    : InputFilterBaseProps<T>;
