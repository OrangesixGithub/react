import type { TablePivotView } from "../@types";

/**
 * Chave do `localStorage` das visões de um pivot.
 */
export function viewsKey(storageKey: string) {
    return `orangesix:tablepivot:views:${storageKey}`;
}

/**
 * Lê as visões salvas. Retorna lista vazia quando o armazenamento estiver indisponível ou com conteúdo inválido.
 */
export function viewsRead(storageKey: string): TablePivotView[] {
    try {
        const stored = JSON.parse(window.localStorage.getItem(viewsKey(storageKey)) ?? "[]");
        return Array.isArray(stored)
            ? stored.filter(view => typeof view?.name === "string" && view.layout && Array.isArray(view.layout.rows))
            : [];
    } catch {
        return [];
    }
}

/**
 * Grava as visões. Retorna `false` quando o navegador bloqueia o armazenamento (ex.: modo privado ou cota cheia).
 */
export function viewsWrite(storageKey: string, views: TablePivotView[]) {
    try {
        window.localStorage.setItem(viewsKey(storageKey), JSON.stringify(views));
        return true;
    } catch {
        return false;
    }
}
