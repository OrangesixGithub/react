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
     * Valor atual do filtro, com o operador no final da string. Formatos por tipo:
     * - `text`: `"abc%"`
     * - `number`: `"10>="`
     * - `autocomplete`: ids separados por `;`, como `"1;2;3="`
     * - `date`: `dia/mês/ano`, com `0` nas partes vazias, como `"0/5/2024="`; no intervalo (`{}`), `"1/1/2024{}31/12/2024"`
     *
     * O operador exibido no seletor é guardado pelo componente; para limpar o filtro por fora, remonte o componente (ex.: `key`).
     */
    value?: string

    /**
     * Retorna o valor com o operador no final (mesmo formato de `value`), ou `null` quando o filtro está vazio.
     * Também é chamado na montagem e ao trocar o operador, para manter o valor alinhado ao operador.
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
