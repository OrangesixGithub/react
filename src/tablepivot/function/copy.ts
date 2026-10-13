import { formattingMatches, formattingStyle } from "./formatting";
import type { HTMLPerspectiveViewerElement } from "../@types/perspective";
import type { TablePivotConditionalRule, TablePivotLayout } from "../@types";

/**
 * Cores fixas da cópia: o Excel recebe estilos inline e não conhece os tokens do tema.
 */
export const COPY_COLORS = {
    border: "#d4d4d4",
    header: "#f1f5f9",
    total: "#f8fafc",
    text: "#171717",
};

/**
 * Célula da tabela copiada. Além do texto e do estilo HTML, guarda os dados usados pela exportação em Excel.
 */
export interface CopyCell {
    text: string
    style?: string
    colspan?: number
    rowspan?: number
    header?: boolean
    /** Nível da hierarquia: vira recuo no HTML e espaços à esquerda no texto e no CSV. */
    indent?: number
    /** Valor bruto da célula de dados (número sem formatação). */
    value?: unknown
    /** Tipo da coluna no Perspective (`float` ou `integer`), que define as casas decimais. */
    type?: string
    /** Linha do total geral. */
    total?: boolean
    /** Regra de formatação condicional aplicada à célula. */
    rule?: TablePivotConditionalRule
}

/**
 * Copy - `copyPlace`
 *
 * Posiciona as células em linhas e colunas (0-based), respeitando as mesclagens (`rowspan` e `colspan`).
 */
export function copyPlace(rows: CopyCell[][]) {
    const taken: boolean[][] = rows.map(() => []);
    const placed: Array<{ cell: CopyCell, row: number, column: number }> = [];
    rows.forEach((row, line) => {
        let column = 0;
        row.forEach(cell => {
            while (taken[line][column]) {
                column++;
            }
            for (let y = 0; y < (cell.rowspan ?? 1); y++) {
                for (let x = 0; x < (cell.colspan ?? 1); x++) {
                    if (taken[line + y]) {
                        taken[line + y][column + x] = true;
                    }
                }
            }
            placed.push({ cell, row: line, column });
            column += cell.colspan ?? 1;
        });
    });
    return placed;
}

/**
 * Escapa o texto para uso seguro no HTML copiado.
 */
function copyEscape(text: string) {
    return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

/**
 * Formata o número como na grade: duas casas para `float` e nenhuma para `integer`, no padrão pt-BR.
 */
function copyNumber(value: unknown, type: string | undefined) {
    if (typeof value !== "number" || !Number.isFinite(value)) {
        return value === null || value === undefined ? "" : String(value);
    }
    const digits = type === "float" ? 2 : 0;
    return value.toLocaleString("pt-BR", { minimumFractionDigits: digits, maximumFractionDigits: digits });
}

/**
 * Regra de formatação condicional da célula: a última regra correspondente tem prioridade.
 */
function copyRule(value: unknown, measure: string, total: boolean, rules: TablePivotConditionalRule[], labels: Record<string, string>) {
    if (typeof value !== "number" || !Number.isFinite(value)) {
        return undefined;
    }
    for (let index = rules.length - 1; index >= 0; index--) {
        const rule = rules[index];
        const field = !rule.field || measure === (labels[rule.field]?.trim() || rule.field) || measure === rule.field;
        if (field && !(total && rule.includeTotals === false) && formattingMatches(value, rule)) {
            return rule;
        }
    }
    return undefined;
}

/**
 * Estilo CSS da regra, com valores validados pelo navegador.
 */
function copyFormatting(document: Document, rule: TablePivotConditionalRule | undefined) {
    if (!rule) {
        return "";
    }
    const format = formattingStyle(rule.style);
    const style = document.createElement("span").style;
    style.color = format.color ?? "";
    style.backgroundColor = format.backgroundColor ?? "";
    style.fontWeight = String(format.fontWeight ?? "");
    style.fontStyle = format.fontStyle ?? "";
    style.textDecoration = String(format.textDecoration ?? "");
    return style.cssText;
}

/**
 * Monta o HTML (com estilos inline, como o Excel espera) e o texto separado por tabulação.
 */
function copyRender(rows: CopyCell[][]) {
    const html = rows.map(row => "<tr>" + row.map(cell => {
        const tag = cell.header ? "th" : "td";
        const span = (cell.colspan && cell.colspan > 1 ? ` colspan="${cell.colspan}"` : "")
            + (cell.rowspan && cell.rowspan > 1 ? ` rowspan="${cell.rowspan}"` : "");
        return `<${tag}${span} style="${cell.style ?? ""}">${copyEscape(cell.text)}</${tag}>`;
    }).join("") + "</tr>").join("");

    // No texto, cada célula mesclada ocupa a primeira posição e as demais posições (colunas e linhas) ficam vazias.
    const width = Math.max(0, ...copyPlace(rows).map(({ cell, column }) => column + (cell.colspan ?? 1)));
    const filled: string[][] = rows.map(() => Array(width).fill(""));
    copyPlace(rows).forEach(({ cell, row, column }) => {
        filled[row][column] = "    ".repeat(cell.indent ?? 0) + cell.text;
    });
    const text = filled.map(row => row.join("\t")).join("\n");

    return {
        html: `<table style="border-collapse:collapse;font-family:Calibri,Arial,sans-serif;font-size:11pt;color:${COPY_COLORS.text}">`
            + html + "</table>",
        text,
        grid: filled,
    };
}

/**
 * Copy - `copyBuild`
 *
 * Monta a tabela exibida (linhas expandidas ou recolhidas, cabeçalhos agrupados, totais e formatação condicional)
 * em HTML, texto, grade de textos e células estruturadas. Usado pela cópia e pelas exportações em CSV e Excel.
 */
export async function copyBuild(
    viewer: HTMLPerspectiveViewerElement,
    layout: TablePivotLayout,
    rules: TablePivotConditionalRule[],
    labels: Record<string, string> = {},
) {
    const document = viewer.ownerDocument;
    const view = await viewer.getView();
    const [columns, schema] = await Promise.all([
        view.to_columns() as Promise<Record<string, unknown[]>>,
        view.schema() as Promise<Record<string, string>>,
    ]);
    const paths = (columns.__ROW_PATH__ ?? [[]]) as unknown[][];
    const keys = Object.keys(columns).filter(key => !key.startsWith("__"));
    const levels = layout.columns.length;
    const grouped = layout.rows.length > 0;
    const border = `border:1px solid ${COPY_COLORS.border};padding:2px 6px;`;
    const headerStyle = border + `background:${COPY_COLORS.header};font-weight:700;text-align:center;`;
    const split = keys.map(key => {
        const parts = key.split("|");
        return { key, measure: parts[parts.length - 1], path: parts.slice(0, -1) };
    });

    // Cabeçalho: um nível por campo de Colunas (células iguais e vizinhas mescladas) e a linha dos valores.
    const header: CopyCell[][] = [];
    for (let level = 0; level < levels; level++) {
        const row: CopyCell[] = level === 0
            ? [{ text: "", header: true, rowspan: levels + 1, style: headerStyle }]
            : [];
        split.forEach((column, index) => {
            const prefix = column.path.slice(0, level + 1).join("|");
            const previous = split[index - 1]?.path.slice(0, level + 1).join("|");
            if (index > 0 && prefix === previous && row.length > 0) {
                row[row.length - 1].colspan = (row[row.length - 1].colspan ?? 1) + 1;
                return;
            }
            row.push({ text: column.path[level] ?? "", header: true, style: headerStyle });
        });
        header.push(row);
    }
    header.push([
        ...(levels === 0 ? [{ text: "", header: true, style: headerStyle }] : []),
        ...split.map(column => ({ text: column.measure, header: true, style: headerStyle })),
    ]);

    // Corpo: rótulo com recuo da hierarquia; o total geral é a primeira linha quando há campos em Linhas.
    const body = paths.map((path, row) => {
        const total = grouped && path.length === 0;
        const rowStyle = total ? `font-weight:700;background:${COPY_COLORS.total};` : "";
        const label = path.length === 0 ? "Total" : String(path[path.length - 1] ?? "");
        const indent = Math.max(0, path.length - 1);
        const cells: CopyCell[] = [{
            text: label,
            indent,
            total,
            style: border + rowStyle + `text-align:left;padding-left:${6 + indent * 14}px;mso-char-indent-count:${indent};`,
        }];
        split.forEach(column => {
            const value = columns[column.key]?.[row];
            const totalColumn = levels > 0 && column.path.length === 0;
            const rule = copyRule(value, column.measure, total || totalColumn, rules, labels);
            cells.push({
                text: copyNumber(value, schema[column.measure]),
                value,
                type: schema[column.measure],
                total,
                rule,
                style: border + rowStyle + "text-align:right;" + copyFormatting(document, rule),
            });
        });
        return cells;
    });

    const rows = [...header, ...body];
    return { ...copyRender(rows), rows };
}

/**
 * Copy - `copyTable`
 *
 * Copia a tabela exibida para a área de transferência em HTML e texto, prontos para colar no Excel.
 * A gravação começa no mesmo instante do clique (exigência do navegador) e recebe o conteúdo quando ele fica pronto.
 */
export function copyTable(
    viewer: HTMLPerspectiveViewerElement,
    layout: TablePivotLayout,
    rules: TablePivotConditionalRule[],
    labels: Record<string, string> = {},
) {
    return copyWrite(viewer.ownerDocument, copyBuild(viewer, layout, rules, labels));
}

/**
 * Grava HTML e texto na área de transferência da janela do pivot. Sem a API de clipboard (ex.: iframe sem
 * permissão), copia uma seleção temporária com `execCommand`.
 */
async function copyWrite(
    document: Document,
    content: Promise<{ html: string, text: string }>
) {
    const window = document.defaultView;
    try {
        if (!window?.navigator.clipboard?.write || !window.ClipboardItem) {
            throw new Error("Clipboard indisponível");
        }
        await window.navigator.clipboard.write([new window.ClipboardItem({
            "text/html": content.then(({ html }) => new window.Blob([html], { type: "text/html" })),
            "text/plain": content.then(({ text }) => new window.Blob([text], { type: "text/plain" })),
        })]);
    } catch {
        const { html } = await content;
        const container = document.createElement("div");
        container.style.cssText = "position:fixed;left:-9999px;top:0;opacity:0;";
        container.innerHTML = html;
        document.body.appendChild(container);
        const range = document.createRange();
        range.selectNodeContents(container);
        const selection = window?.getSelection();
        selection?.removeAllRanges();
        selection?.addRange(range);
        const copied = document.execCommand("copy");
        selection?.removeAllRanges();
        container.remove();
        if (!copied) {
            throw new Error("Não foi possível copiar a tabela");
        }
    }
}
