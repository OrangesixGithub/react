/**
 * Formata o retorno para component
 * @param date
 */
export function handleResponse(date: Date | null): string | null {
    if (date instanceof Date && !Number.isNaN(date.getTime())) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    }
    return null;
}

/**
 * Retorna o valor para ser inserido no component
 * @param date
 */
export function handleValue(value: unknown): Date | null {
    if (value instanceof Date) {
        return Number.isNaN(value.getTime()) ? null : new Date(value.getTime());
    }
    if (typeof value !== "string") {
        return null;
    }
    const match = /^(\d{4})-(\d{2})-(\d{2})(?:[T ](\d{2}):(\d{2})(?::(\d{2}))?(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})?)?$/.exec(value.trim());
    if (!match) {
        return null;
    }

    const [, year, month, day, hour = "0", minute = "0", second = "0"] = match;
    const date = new Date(0);
    date.setFullYear(Number(year), Number(month) - 1, Number(day));
    date.setHours(Number(hour), Number(minute), Number(second), 0);
    if (date.getFullYear() !== Number(year) || date.getMonth() !== Number(month) - 1 || date.getDate() !== Number(day)
        || Number(hour) > 23 || Number(minute) > 59 || Number(second) > 59) {
        return null;
    }
    return date;
}

/** Converte a lista recebida para datas locais válidas, sem alterar o valor original. */
export function handleMultipleValue(value: unknown): Date[] {
    if (!Array.isArray(value)) {
        return [];
    }
    return value.map(handleValue).filter((date): date is Date => date !== null);
}

/** Retorna a seleção múltipla em ISO local; limpar produz uma lista vazia. */
export function handleMultipleResponse(value: unknown): string[] {
    return handleMultipleValue(value).map(handleResponse).filter((date): date is string => date !== null);
}

/** Preserva as posições do início e do fim, inclusive durante a seleção incompleta. */
export function handleRangeValue(value: unknown): (Date | null)[] {
    if (!Array.isArray(value) || value.length === 0) {
        return [];
    }
    const start = handleValue(value[0]);
    if (!start) {
        return [];
    }
    return [start, handleValue(value[1])];
}

/** Retorna os extremos ISO do intervalo; limpar retorna []. */
export function handleRangeResponse(value: unknown): (string | null)[] {
    return handleRangeValue(value).map(handleResponse);
}
