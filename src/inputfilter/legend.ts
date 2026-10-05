import { MES } from "../utils/const";
import { optionsLabel } from "./const";

/**
 * Retorna a legenda de acordo com operador na string
 * @param value - Valor a ser tratado
 */
export function filterLegend(value: string | undefined): string | null {
    if (!value) {
        return null;
    }
    let optsRegex = /(=|!=|<|>|<=|>=|%|!%|\{\})/;
    let optsMatch = value?.match(optsRegex);
    let opts = value.charAt(value.length - 1);
    let option = optsMatch?.[0];

    if (optsMatch?.[0] !== opts && isNaN(parseInt(opts)) && option?.slice(-1) !== opts) {
        option = optsMatch?.[0] + opts;
    }
    return optionsLabel.filter(item => item.options === option)[0]?.label ?? null;
}

/**
 * Realiza o tratamento das informações para retorna a legenda do tipo `Date`
 * @param value - Valor a ser tratado
 */
export function filterLegendData(value: string | undefined): string {
    let legend = filterLegend(value);
    if (legend === null) {
        return "Não encontramos legenda definida.";
    }

    let interval = value?.split("{}");
    let date = value?.split("/");

    const handleLegend = (date: any): string => {
        let dia = parseInt(date[0]);
        let mes = parseInt(date[1], 10);
        let ano = parseInt(date[2]);

        return `
            ${(dia > 0 ? `${mes == 0 ? "dia" : ""} ${dia}` : "")} 
            ${mes > 0 ? `${dia > 0 ? "de" : ""} ${MES[mes - 1]?.name}` : ""} 
            ${ano > 0 ? `${dia > 0 || mes > 0 ? "de" : ""} ${ano}` : ""}
        `.replace(/\s+/g, " ").trim();
    };
    let result = interval?.[1] === undefined
        ? handleLegend(date)
        : handleLegend(interval[0].split("/")) + " à " + handleLegend(interval[1].split("/"));
    return legend + ": " + result;
}

/**
 * Realiza o tratamento das informações para retorna a legenda do tipo `Text`
 * @param value - Valor a ser tratado
 */
export function filterLegendText(value: string | undefined): string {
    let legend = filterLegend(value);
    if (legend === null) {
        return "Não encontramos legenda definida.";
    }
    return legend + ": " + (value?.replace(/(=|!=|<|>|<=|>=|%|!%|\{\})/g, "") ?? "");
}

/**
 * Realiza o tratamento das informações para retorna a legando do tipo `autocomplete`
 * @param value - Valor a ser tratado
 * @param dto - Array de objeto para ser pesquisado a legenda
 * @param word - Limite de palavras para a legenda
 */
export function filterLegendAutocomplete(value: string | undefined, dto: any[] = [], word: number = 30): string {
    let legend = filterLegend(value);
    if (legend === null || dto.length === 0) {
        return "Não encontramos legenda definida.";
    }
    let ids: any[] = value?.split(";").map(item => parseInt(item)) ?? [];
    let values = dto
        .filter(obj => ids.includes(obj.id))
        .map(item => item.label).join(", ");
    let text = values.substring(0, word);
    return legend + ": " + text + (text.length !== values.length ? "..." : "");
}