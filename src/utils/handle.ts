import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

/**
 * Formata um valor numérico para o formato decimal ou monetário.
 *
 * @param valor - O valor a ser formatado.
 * @param format - O formato desejado: "money" para monetário ou "decimal" para decimal.
 * @param decimals - Quantidade de casa decimal
 * @returns O valor formatado como string.
 */
export function handleNumber(
    valor: string,
    format: "money" | "decimal" = "decimal",
    decimals: number = 2
): string {
    let value = valor.replace(/[^0-9.,]/g, "");
    if (format === "decimal") {
        if (value.length > 0) {
            return parseFloat(value.replace(",", ".").replace(/(\..*)\./g, "$1")).toFixed(decimals);
        }
        return "";
    }
    return parseFloat(value.replace(",", "."))
        .toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        }).replace(".", " ");
}

/**
 * Formata um valor de string para o formato de horas (HH:MM).
 *
 * @param valor - O valor a ser formatado.
 * @returns O valor formatado como string no formato de horas.
 */
export function handleHours(valor: string): string {
    let value = valor.replace(/[^\d.]/g, "");
    const parts = value.split(".");
    if (parts.length > 1) {
        parts[1] = parts[1].substring(0, 2);
    }
    value = parts.join(".");
    if (value.length > 2) {
        value = value.substring(0, value.length - 2) + ":" + value.substring(value.length - 2);
    } else {
        value = value + ":00";
    }
    let hours = value.replace(".", "");
    let hoursParts = hours.split(":");
    hoursParts[0] = hoursParts[0].padStart(2, "0");
    return `${hoursParts[0]}:${hoursParts[1]}`;
}

/**
 * Retonar a data do dia no formato (Y-m-d) para ser utilizado
 * em input do tipo Date.
 *
 * @return Data
 */
export function handleDateNow(): string {
    const hoje = new Date();
    const ano = hoje.getFullYear();
    const mes = String(hoje.getMonth() + 1).padStart(2, "0");
    const dia = String(hoje.getDate()).padStart(2, "0");
    return `${ano}-${mes}-${dia}`;
}

/**
 * Realiza formatação de data em vários formatos
 * @param date
 * @param pattern
 */
export function handleDateFormat(
    date: string,
    pattern: string = "dd/MM/yyyy"
): string {
    try {
        let formattedDate: Date;

        if (pattern.includes("HH") || pattern.includes("mm") || pattern.includes("ss")) {
            const [datePart, timePart] = date.split(/[T ]/);
            const [year, month, day] = datePart.split("-").map(Number);
            const [hour, minute, second] = timePart ? timePart.split(":").map(Number) : [0, 0];

            formattedDate = new Date(year, month - 1, day, hour, minute, second);
        } else {
            const [datePart] = date.split(/[T ]/);
            const [year, month, day] = datePart.split("-").map(Number);

            formattedDate = new Date(year, month - 1, day);
        }

        return format(formattedDate, pattern, { locale: ptBR });
    } catch (error) {
        return "-";
    }
}