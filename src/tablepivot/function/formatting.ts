import type { CSSProperties } from "react";
import type { PivotFormattingCellMeta, PivotFormattingDraft } from "../core/formatting/@types";
import type { TablePivotConditionalRule, TablePivotConditionalStyle, TablePivotLayout } from "../@types";

// Indica se a comparação usa dois limites
export function formattingIsRange(operator: TablePivotConditionalRule["operator"]) {
    return operator === "between" || operator === "notBetween";
}

// Confere os números e a ordem dos limites antes de aplicar a regra
export function formattingIsValid(rule: TablePivotConditionalRule | PivotFormattingDraft) {
    const first = Number(rule.value);
    const last = Number(rule.valueTo);
    return String(rule.value).trim() !== "" && Number.isFinite(first)
        && (!formattingIsRange(rule.operator) || (rule.valueTo !== undefined
            && String(rule.valueTo).trim() !== "" && Number.isFinite(last) && first <= last));
}

// Compara o valor bruto da célula com a condição da regra
export function formattingMatches(value: number, rule: TablePivotConditionalRule) {
    if (!formattingIsValid(rule)) {
        return false;
    }
    switch (rule.operator) {
        case "lt": return value < rule.value;
        case "lte": return value <= rule.value;
        case "gt": return value > rule.value;
        case "gte": return value >= rule.value;
        case "eq": return value === rule.value;
        case "neq": return value !== rule.value;
        case "between": return value >= rule.value && value <= rule.valueTo!;
        case "notBetween": return value < rule.value || value > rule.valueTo!;
        default: return false;
    }
}

// Converte o estilo da regra para a prévia e para a grade
export function formattingStyle(style: TablePivotConditionalStyle): CSSProperties {
    return {
        color: style.color,
        backgroundColor: style.backgroundColor,
        fontWeight: style.bold === undefined ? undefined : style.bold ? 700 : 400,
        fontStyle: style.italic === undefined ? undefined : style.italic ? "italic" : "normal",
        textDecoration: style.underline === undefined ? undefined : style.underline ? "underline" : "none",
    };
}

// Cria CSS com propriedades permitidas, usando o parser do navegador para os valores
export function formattingCss(rules: TablePivotConditionalRule[], document: Document) {
    return rules.map((rule, index) => {
        const style = document.createElement("span").style;
        const format = formattingStyle(rule.style);
        style.color = format.color ?? "";
        style.backgroundColor = format.backgroundColor ?? "";
        style.fontWeight = String(format.fontWeight ?? "");
        style.fontStyle = format.fontStyle ?? "";
        style.textDecoration = String(format.textDecoration ?? "");
        return `regular-table table tbody td.os-pivot-format-${index} { ${style.cssText} }`;
    }).join("\n");
}

// Remove a regra anterior da célula reciclada e aplica a última condição correspondente
export function formattingCell(cell: HTMLTableCellElement, meta: PivotFormattingCellMeta, rules: TablePivotConditionalRule[], layout: TablePivotLayout | null, labels: Record<string, string> = {}) {
    const previous = cell.dataset.pivotFormatting;
    if (previous !== undefined) {
        cell.classList.remove("os-pivot-format-" + previous);
        delete cell.dataset.pivotFormatting;
    }
    const value = meta.user === undefined ? meta.value : meta.user;
    if (cell.tagName !== "TD" || typeof value !== "number" || !Number.isFinite(value)) {
        return;
    }
    const column = meta.column_header?.[meta.column_header.length - 1];
    const total = ((layout?.rows.length ?? 0) > 0 && meta.y === 0) || cell.classList.contains("psp-split-total");
    for (let index = rules.length - 1; index >= 0; index--) {
        const rule = rules[index];
        const fieldMatches = !rule.field || column === (labels[rule.field]?.trim() || rule.field) || column === rule.field;
        if (fieldMatches && !(total && rule.includeTotals === false) && formattingMatches(value, rule)) {
            cell.dataset.pivotFormatting = String(index);
            cell.classList.add("os-pivot-format-" + index);
            return;
        }
    }
}
