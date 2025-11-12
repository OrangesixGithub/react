/**
 * Formata o retorno para component
 * @param date
 */
export function handleResponse(date: Date | null): string | null {
    if (date instanceof Date) {
        let year = date.getFullYear();
        let month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    }
    return null;
}

/**
 * Retorna o valor para ser inserido no component
 * @param date
 */
export function handleValue(date: string): Date | null {
    if (typeof date === "object" || typeof date === "undefined") {
        return null;
    }

    const [datePart, timePart] = date.trim().split(/[T ]/);
    const [y, m, d] = datePart.split("-").map(Number);

    if (timePart && /^\d{2}:\d{2}(:\d{2})?$/.test(timePart)) {
        const [hh, mm, ss = "0"] = timePart.split(":");
        return new Date(y, (m ?? 1) - 1, d ?? 1, Number(hh), Number(mm), Number(ss));
    }

    return new Date(y, (m ?? 1) - 1, d ?? 1, 0, 0, 0);
}