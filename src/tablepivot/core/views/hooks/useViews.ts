import type { KeyboardEvent } from "react";
import type { TablePivotViewsProps } from "../@types";
import type { TablePivotView } from "../../../@types";
import { useEffect, useId, useRef, useState } from "react";
import { fieldAggregationName, fieldName } from "../../../function/fields";

/**
 * Hook - `useViews`
 *
 * Controla o nome da nova visão, o foco do painel e o resumo de cada visão salva.
 */
export function useViews(props: TablePivotViewsProps) {
    const titleId = useId();
    const panelRef = useRef<HTMLDivElement>(null);
    // Nome digitado para salvar a visão atual
    const [name, setName] = useState("");
    // Indica se o nome já existe e a gravação vai substituir a visão
    const replacing = props.views.some(view => view.name === name.trim());

    // Foca o campo de nome ao abrir e devolve o foco ao botão ao fechar
    useEffect(() => {
        const panel = panelRef.current;
        const previous = panel?.ownerDocument.activeElement as HTMLElement | null;
        panel?.querySelector("input")?.focus();
        return () => {
            if (previous?.isConnected) {
                previous.focus();
            }
        };
    }, []);

    // Salva a visão atual com o nome informado
    function save() {
        const trimmed = name.trim();
        if (trimmed) {
            props.onSave(trimmed);
            setName("");
        }
    }

    // Fecha com Escape (Enter no campo de nome salva pelo envio do formulário)
    function keyDown(event: KeyboardEvent) {
        if (event.key === "Escape") {
            event.stopPropagation();
            props.onClose();
        }
    }

    // Descreve a visão em uma linha: linhas, colunas e valores
    function summary(view: TablePivotView) {
        const label = (field: string) => fieldName(field, props.labels);
        const parts = [
            view.layout.rows.length ? "Linhas: " + view.layout.rows.map(label).join(", ") : "",
            view.layout.columns.length ? "Colunas: " + view.layout.columns.map(label).join(", ") : "",
            view.layout.values.length
                ? "Valores: " + view.layout.values.map(value => `${fieldAggregationName(value.aggregation)} de ${label(value.field)}`).join(", ")
                : "",
        ];
        return parts.filter(Boolean).join(" · ");
    }

    // Formata a data de gravação no padrão pt-BR
    function savedAt(view: TablePivotView) {
        const date = new Date(view.savedAt);
        return Number.isNaN(date.getTime())
            ? ""
            : date.toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" });
    }

    return { titleId, panelRef, name, setName, replacing, save, keyDown, summary, savedAt };
}
