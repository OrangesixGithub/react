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
    const number = parseNumber(valor);
    if (number === null) {
        return "";
    }
    if (format === "decimal") {
        return number.toFixed(decimals);
    }
    return number.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

/**
 * Converte o texto em número aceitando o formato BR ("1.234,56") e o do banco ("1234.56").
 * - Com vírgula: os pontos são separadores de milhar e a última vírgula é a decimal.
 * - Sem vírgula: um único ponto é decimal; vários pontos são separadores de milhar ("1.234.567").
 * Retorna `null` quando não há número.
 */
function parseNumber(valor: string): number | null {
    const text = String(valor ?? "").trim();
    const negative = text.startsWith("-");
    let value = text.replace(/[^0-9.,]/g, "");

    if (value.includes(",")) {
        const last = value.lastIndexOf(",");
        value = value.slice(0, last).replace(/[.,]/g, "") + "." + value.slice(last + 1).replace(/[.,]/g, "");
    } else if ((value.match(/\./g) ?? []).length > 1) {
        value = value.replace(/\./g, "");
    }

    const number = parseFloat(value);
    if (Number.isNaN(number)) {
        return null;
    }
    return negative ? -number : number;
}

/**
 * Formata um valor de string para o formato de horas (HH:MM).
 *
 * @param valor - O valor a ser formatado.
 * @returns O valor formatado como string no formato de horas.
 */
export function handleHours(valor: string): string {
    const [whole, fraction] = String(valor ?? "").replace(/[^\d.]/g, "").split(".");

    // "8.30" / "8.3": o ponto separa horas e minutos (minutos sempre com 2 dígitos)
    if (fraction !== undefined) {
        return `${(whole || "0").padStart(2, "0")}:${fraction.substring(0, 2).padEnd(2, "0")}`;
    }
    // "830" -> 08:30; "8" -> 08:00
    if (whole.length > 2) {
        return `${whole.slice(0, -2).padStart(2, "0")}:${whole.slice(-2)}`;
    }
    return `${whole.padStart(2, "0")}:00`;
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
    date: string | Date,
    pattern: string = "dd/MM/yyyy"
): string {
    try {
        if (date instanceof Date) {
            return format(date, pattern, { locale: ptBR });
        }

        let formattedDate: Date;

        if (pattern.includes("HH") || pattern.includes("mm") || pattern.includes("ss")) {
            const [datePart, timePart] = date.split(/[T ]/);
            const [year, month, day] = datePart.split("-").map(Number);
            // parseInt aceita "00.000000Z" (timestamps do Laravel); sem hora, usa 00:00:00
            const [hour = 0, minute = 0, second = 0] = timePart ? timePart.split(":").map(part => parseInt(part, 10) || 0) : [];

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