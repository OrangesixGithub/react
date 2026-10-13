import type { KeyboardEvent } from "react";
import { useEffect, useId, useRef, useState } from "react";
import type { PivotFormattingDraft, TablePivotFormattingProps } from "../@types";
import { formattingIsRange, formattingIsValid } from "../../../function/formatting";
import type { TablePivotConditionalRule, TablePivotConditionalStyle } from "../../../@types";

/**
 * Hook - `useFormatting`
 *
 * Controla o rascunho, a validação e a aplicação das regras de formatação.
 */
export function useFormatting(props: TablePivotFormattingProps) {
    const titleId = useId();
    const panelRef = useRef<HTMLDivElement>(null);
    const sequence = useRef(0);
    // Guarda as regras em edição sem alterar a grade antes de aplicar
    const [draft, setDraft] = useState<PivotFormattingDraft[]>(() => props.rules.map(rule => ({
        ...rule, style: { ...rule.style }, key: String(++sequence.current),
        value: String(rule.value), valueTo: String(rule.valueTo ?? ""),
    })));
    // Indica se todas as regras podem ser aplicadas
    const valid = draft.every(formattingIsValid);

    // Foca o painel ao abrir e devolve o foco ao botão ao fechar
    useEffect(() => {
        const panel = panelRef.current;
        const previous = panel?.ownerDocument.activeElement as HTMLElement | null;
        panel?.focus();
        return () => {
            if (previous?.isConnected) {
                previous.focus();
            }
        };
    }, []);

    // Adiciona uma condição com valores e cor iniciais
    function add() {
        setDraft(current => [...current, {
            key: String(++sequence.current), operator: "lt", value: "0", valueTo: "",
            includeTotals: true, style: { color: "#dc2626" },
        }]);
    }

    // Remove uma condição do rascunho
    function remove(key: string) {
        setDraft(current => current.filter(rule => rule.key !== key));
    }

    // Atualiza uma propriedade da condição selecionada
    function update(key: string, patch: Partial<PivotFormattingDraft>) {
        setDraft(current => current.map(rule => rule.key === key ? { ...rule, ...patch } : rule));
    }

    // Atualiza apenas as propriedades de aparência da condição
    function updateStyle(key: string, patch: Partial<TablePivotConditionalStyle>) {
        setDraft(current => current.map(rule => rule.key === key ? { ...rule, style: { ...rule.style, ...patch } } : rule));
    }

    // Converte os números e aplica as regras; lista vazia remove a formatação
    function apply() {
        if (!valid) {
            return;
        }
        const rules: TablePivotConditionalRule[] = draft.map(rule => ({
            field: rule.field, operator: rule.operator, value: Number(rule.value),
            valueTo: formattingIsRange(rule.operator) ? Number(rule.valueTo) : undefined,
            includeTotals: rule.includeTotals, style: { ...rule.style },
        }));
        props.onApply(rules);
        props.onClose();
    }

    // Fecha por Escape e mantém a navegação por Tab dentro do painel
    function keyDown(event: KeyboardEvent) {
        if (event.key === "Escape") {
            event.stopPropagation();
            props.onClose();
        } else if (event.key === "Tab") {
            const panel = panelRef.current;
            const elements = panel?.querySelectorAll<HTMLElement>("button:not(:disabled), input:not(:disabled), select:not(:disabled), [tabindex=\"0\"]");
            if (!elements?.length) {
                return;
            }
            const first = elements[0];
            const last = elements[elements.length - 1];
            const active = panel?.ownerDocument.activeElement;
            if (event.shiftKey && (active === first || active === panel)) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && (active === last || active === panel)) {
                event.preventDefault();
                first.focus();
            }
        }
    }

    return { titleId, panelRef, draft, valid, add, remove, update, updateStyle, apply, keyDown };
}
