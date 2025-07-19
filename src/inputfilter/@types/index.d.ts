import { InputFilterAutocompleteProps } from "./autocomplete";
import { ApiComponentProps, ApiFieldComponentProps } from "../../api";

export type InputFilterOptionsProps = "=" | "!=" | "<" | ">" | "<=" | ">=" | "{}" | "%" | "!%";

export type InputFilterOptionsMap = {
    text: "=" | "!=" | "%" | "!%"
    date: "=" | "!=" | "<" | ">" | "<=" | ">=" | "{}"
    autocomplete: "=" | "!=" | "%" | "!%"
    number: "=" | "!=" | "<" | ">" | "<=" | ">="
};

export type InputFilterCoreProps<T extends keyof InputFilterOptionsMap> = InputFilterProps<T> & {
    options: any[],
    select: string
};

interface InputFilterBaseProps<T extends keyof InputFilterOptionsMap> extends ApiComponentProps, ApiFieldComponentProps {
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

export type InputFilterProps<T extends keyof InputFilterOptionsMap> = T extends "autocomplete"
    ? InputFilterBaseProps<"autocomplete"> & InputFilterAutocompleteProps
    : InputFilterBaseProps<T>;

export * from "./autocomplete";