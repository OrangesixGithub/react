import type { Workbook } from "exceljs";
import { COPY_COLORS, copyBuild, copyPlace } from "./copy";
import type { HTMLPerspectiveViewerElement } from "../@types/perspective";
import type { TablePivotConditionalRule, TablePivotLayout } from "../@types";

/**
 * Escapa a célula para CSV: valores com separador, aspas ou quebra de linha ficam entre aspas.
 */
function exportCell(value: string) {
    return /[";\r\n]/.test(value) ? `"${value.replace(/"/g, "\"\"")}"` : value;
}

/**
 * Nome do arquivo a partir do título, sem caracteres inválidos.
 */
function exportFileName(title: string | undefined, extension: string) {
    const name = (title ?? "").trim().replace(/[\\/:*?"<>|]+/g, "").replace(/\s+/g, " ");
    return (name || "tabela-dinamica") + "." + extension;
}

/**
 * Baixa o arquivo na janela do pivot (que pode ser a janela principal, quando renderizado a partir de um iframe).
 */
function exportDownload(document: Document, content: BlobPart, type: string, fileName: string) {
    const window = document.defaultView ?? globalThis.window;
    const url = window.URL.createObjectURL(new window.Blob([content], { type }));
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => window.URL.revokeObjectURL(url), 1000);
}

/**
 * Converte uma cor CSS (nome, hex, rgb) para ARGB do Excel, usando o navegador para interpretar o valor.
 */
function exportColor(document: Document, color: string | undefined) {
    if (!color) {
        return undefined;
    }
    const context = document.createElement("canvas").getContext("2d");
    if (!context) {
        return undefined;
    }
    context.fillStyle = "#000000";
    context.fillStyle = color;
    const value = String(context.fillStyle);
    const hex = value.match(/^#([0-9a-f]{6})$/i)?.[1];
    if (hex) {
        return "FF" + hex.toUpperCase();
    }
    const rgba = value.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)$/i);
    if (!rgba) {
        return undefined;
    }
    const alpha = Math.round(Number(rgba[4] ?? 1) * 255);
    return [alpha, Number(rgba[1]), Number(rgba[2]), Number(rgba[3])]
        .map(part => part.toString(16).padStart(2, "0")).join("").toUpperCase();
}

/**
 * Export - `exportTableCsv`
 *
 * Baixa a tabela exibida em CSV com a mesma estrutura e formatação dos dados da cópia: hierarquia com recuo,
 * cabeçalhos por nível, totais e números no padrão pt-BR. Usa `;` como separador e UTF-8 com BOM, para abrir
 * corretamente no Excel em português. A formatação condicional não cabe em CSV (texto puro).
 */
export async function exportTableCsv(
    viewer: HTMLPerspectiveViewerElement,
    layout: TablePivotLayout,
    rules: TablePivotConditionalRule[],
    labels: Record<string, string> = {},
    title?: string,
) {
    const { grid } = await copyBuild(viewer, layout, rules, labels);
    const csv = String.fromCharCode(0xfeff) + grid.map(row => row.map(exportCell).join(";")).join("\r\n");
    exportDownload(viewer.ownerDocument, csv, "text/csv;charset=utf-8", exportFileName(title, "csv"));
}

/**
 * Export - `exportTableXlsx`
 *
 * Baixa a tabela exibida em Excel (.xlsx): números como números (formatos `#,##0.00` e `#,##0`), cabeçalhos
 * mesclados, hierarquia com recuo, total destacado, formatação condicional, bordas, larguras pelo conteúdo e
 * cabeçalho/rótulos congelados. A biblioteca ExcelJS é carregada só no momento da exportação.
 */
export async function exportTableXlsx(
    viewer: HTMLPerspectiveViewerElement,
    layout: TablePivotLayout,
    rules: TablePivotConditionalRule[],
    labels: Record<string, string> = {},
    title?: string,
) {
    const [{ rows }, module] = await Promise.all([copyBuild(viewer, layout, rules, labels), import("exceljs")]);
    // O pacote para navegador expõe a biblioteca como `default`; o tipado, como exportações nomeadas.
    const excel = (module as unknown as { default?: typeof module }).default ?? module;
    const document = viewer.ownerDocument;
    const workbook: Workbook = new excel.Workbook();
    const headerRows = rows.findIndex(row => !row[0]?.header);
    const sheet = workbook.addWorksheet((title?.trim() || "Tabela dinâmica").replace(/[\\/?*[\]:]/g, "").slice(0, 31), {
        views: [{ state: "frozen", xSplit: 1, ySplit: Math.max(0, headerRows) }],
    });
    const border = { style: "thin" as const, color: { argb: "FF" + COPY_COLORS.border.slice(1).toUpperCase() } };
    const widths: number[] = [];

    copyPlace(rows).forEach(({ cell, row, column }) => {
        const target = sheet.getCell(row + 1, column + 1);
        const numeric = typeof cell.value === "number" && Number.isFinite(cell.value);
        target.value = numeric ? cell.value as number : cell.text;
        target.border = { top: border, left: border, bottom: border, right: border };

        const style = cell.rule?.style;
        const fill = exportColor(document, style?.backgroundColor)
            ?? (cell.header ? "FF" + COPY_COLORS.header.slice(1).toUpperCase() : cell.total ? "FF" + COPY_COLORS.total.slice(1).toUpperCase() : undefined);
        if (fill) {
            target.fill = { type: "pattern", pattern: "solid", fgColor: { argb: fill } };
        }
        target.font = {
            name: "Calibri",
            size: 11,
            bold: style?.bold ?? (cell.header || cell.total),
            italic: style?.italic,
            underline: style?.underline,
            color: { argb: exportColor(document, style?.color) ?? "FF" + COPY_COLORS.text.slice(1).toUpperCase() },
        };
        if (numeric) {
            target.numFmt = cell.type === "float" ? "#,##0.00" : "#,##0";
        }
        target.alignment = cell.header
            ? { horizontal: "center", vertical: "middle" }
            : { horizontal: numeric ? "right" : "left", vertical: "middle", indent: cell.indent || undefined };

        if ((cell.colspan ?? 1) > 1 || (cell.rowspan ?? 1) > 1) {
            sheet.mergeCells(row + 1, column + 1, row + (cell.rowspan ?? 1), column + (cell.colspan ?? 1));
        } else {
            const length = cell.text.length + (cell.indent ?? 0) * 2;
            widths[column] = Math.max(widths[column] ?? 0, length);
        }
    });

    widths.forEach((width, index) => {
        sheet.getColumn(index + 1).width = Math.min(60, Math.max(10, width + 3));
    });

    const buffer = await workbook.xlsx.writeBuffer();
    exportDownload(
        document,
        buffer as ArrayBuffer,
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        exportFileName(title, "xlsx"),
    );
}
