import { validateDate } from "./validate";
import { handleNumber } from "../../utils";
import { InputFilterOptionsMap } from "..";

/**
 * Obtém a opção de filtro correspondente ao valor fornecido.
 *
 * @param value - O valor para buscar uma opção correspondente.
 * @param options - Um array de opções de filtro disponíveis.
 * @returns A opção de filtro correspondente ou a primeira opção se nenhuma correspondência for encontrada.
 */
export function handleGetOption<T extends keyof InputFilterOptionsMap>(
    value: string | undefined,
    options: Array<InputFilterOptionsMap[T]>
): string {
    let exists = options.filter(option => value?.includes(option));
    return exists[exists.length - 1] ?? options[0];
}

/**
 * Retorna apenas o valor sem os operadores filtro tipo `Text`.
 *
 * @param value - O valor completo, incluindo a opção de filtro.
 * @param options - Um array de opções de filtro disponíveis.
 * @returns O valor sem as opções de filtro.
 */
export function handleGetValueText(
    value: string | undefined,
    options: Array<InputFilterOptionsMap["text"]>
): string | null {
    let str = value;
    let exists = options
        .slice()
        .reverse()
        .find(item => str?.endsWith(item));
    if (exists && str !== undefined) {
        return str.slice(0, -exists.length);
    }
    return str ?? null;
}

/**
 * Retorna apenas o valor sem os operadores filtro tipo `Date`.
 *
 * @param value - O valor completo, incluindo a opção de filtro.
 * @param options - Um array de opções de filtro disponíveis.
 * @param select - Seletor do tipo de filtro
 * @returns O valor sem as opções de filtro.
 */
export function handleGetValueDate(
    value: string | undefined,
    options: Array<InputFilterOptionsMap["date"]>,
    select: null | string = null
): Array<number | string> {
    let str = value;
    let optsRegex = /(=|!=|<|>|<=|>=|\{\})/;
    let optsMatch = value?.match(optsRegex);
    let opts = optsMatch ? optsMatch[0].trim() : options[0];

    let parts: any[] = [];
    let interval = str?.split("{}") ?? [];

    interval.forEach((value, index) => {
        let clean = value.replace(optsRegex, "").trim();

        if (clean.includes("/")) {
            parts[index] = clean.split("/").map(item => parseInt(item));
        } else {
            let number = parseInt(clean);
            parts[index] = [isNaN(number) ? 0 : number];
        }

        while (parts[index].length < 3) {
            parts[index].unshift(0);
        }
    });

    if (parts[1] && opts === "{}") {
        return [...validateDate(parts[0]), select ?? opts].concat(...validateDate(parts[1]));
    }
    return parts.length === 0
        ? [0, 0, 0, opts]
        : [...validateDate(parts[0]), select ?? opts];
}

/**
 * Atualiza um valor de data em uma posição específica e retorna a data formatada.
 *
 * @param value - O novo valor a ser inserido na data
 * @param position - A posição do valor a ser atualizado (0 para dia, 1 para mês, 2 para ano)
 * @param date - O array da data atual, incluindo as opções
 * @returns A data atualizada e formatada como string
 */
export function handleSetValueDate(
    value: string,
    position: number | null,
    date: (number | string)[]
): string {
    if (position !== null) {
        date[position] = parseInt(value);
    }

    let opts = date[3];
    let firstDate = date.slice(0, 3);
    firstDate = validateDate(firstDate as number[]);

    if (opts !== "{}") {
        return `${firstDate[0]}/${firstDate[1]}/${firstDate[2]}${opts}`;
    }

    let lastDate = isNaN(parseInt(date[date.length - 1] as string)) && position === null
        ? [0, 0, 0]
        : date.slice(-3);
    lastDate = validateDate(lastDate as number[]);
    return `${firstDate[0]}/${firstDate[1]}/${firstDate[2]}${opts}${lastDate[0]}/${lastDate[1]}/${lastDate[2]}`;
}

/**
 * Obtém os valores selecionados do autocomplete a partir da string de valor e dos dados disponíveis.
 *
 * @param value - String contendo os IDs dos itens selecionados, separados por ponto e vírgula.
 * @param options - Array de opções de filtro disponíveis para o autocomplete.
 * @param data - Array de objetos contendo os dados disponíveis para seleção.
 * @returns Array de objetos correspondentes aos IDs selecionados.
 */
export function handleGetValueAutocomplete(
    value: string | undefined,
    options: Array<InputFilterOptionsMap["autocomplete"]>,
    data: Array<{ id: number, label: string }>
) {
    let values: any[] = value?.split(";").map(item => parseInt(item)) ?? [];
    return data.filter(item => values.includes(item.id));
}

/**
 * Converte os valores selecionados do autocomplete em uma string formatada para o filtro.
 *
 * @param value - Array de objetos selecionados no autocomplete.
 * @param select - String representando a opção de filtro selecionada.
 * @returns String formatada com os IDs dos itens selecionados e a opção de filtro.
 */
export function handleSetValueAutocomplete(
    value: Array<{ id: number, label: string }>,
    select: string,
): string | null {
    let ids = value.map(item => item.id);
    return ids.length === 0 ? null : ids.join(";") + select;
}

/**
 * Retorna apenas o valor sem os operadores filtro tipo `Number`.
 *
 * @param value - O valor completo, incluindo a opção de filtro.
 * @param options - Um array de opções de filtro disponíveis.
 * @returns O valor sem as opções de filtro.
 */
export function handleGetValueNumber(
    value: string | undefined,
    options: Array<InputFilterOptionsMap["text"]>
): string {
    let str = value;
    let exists = options
        .slice()
        .reverse()
        .find(item => str?.endsWith(item));
    if (exists && str !== undefined) {
        return handleNumber(str.slice(0, -exists.length), "decimal", 0);
    }
    return handleNumber(str ?? "", "decimal", 0);
}