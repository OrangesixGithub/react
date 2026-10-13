import { Tooltip } from "../../../../tooltip";
import type { TablePivotToolbarProps } from "../@types";
import { tablePivotToolbarVariants } from "../variants";
import React, { useLayoutEffect, useRef, useState } from "react";
import { fieldAggregationName, fieldName } from "../../../function/fields";

const styles = tablePivotToolbarVariants();

/**
 * Hook - `useToolbar`
 *
 * Prepara o resumo dos campos e as funções de renderização dos grupos e ações da barra do TablePivot.
 */
export function useToolbar(props: TablePivotToolbarProps) {
    // Referenciam o resumo e as ações para detectar a quebra de linha da barra
    const summaryRef = useRef<HTMLDivElement>(null);
    const actionsRef = useRef<HTMLDivElement>(null);
    // Indica se as ações foram para uma linha própria
    const [wrapped, setWrapped] = useState(false);

    // Observa a largura da barra e compara com a largura natural do conteúdo (título, resumo e ações em uma linha).
    // A medida não depende da posição atual das ações, que ocupam a linha toda quando estão quebradas.
    useLayoutEffect(() => {
        const summary = summaryRef.current;
        const actions = actionsRef.current;
        const bar = actions?.parentElement;
        const view = actions?.ownerDocument.defaultView;
        if (!summary || !actions || !bar || !view?.ResizeObserver) {
            return;
        }
        // Soma a largura dos filhos, os espaçamentos e o recuo horizontal do elemento
        const natural = (element: HTMLElement) => {
            const style = view.getComputedStyle(element);
            const children = [...element.children] as HTMLElement[];
            const gap = parseFloat(style.columnGap) || 0;
            return children.reduce((total, child) => total + child.getBoundingClientRect().width, 0)
                + Math.max(0, children.length - 1) * gap
                + (parseFloat(style.paddingLeft) || 0) + (parseFloat(style.paddingRight) || 0);
        };
        const measure = () => {
            const style = view.getComputedStyle(bar);
            const available = bar.clientWidth - (parseFloat(style.paddingLeft) || 0) - (parseFloat(style.paddingRight) || 0);
            const gap = parseFloat(style.columnGap) || 0;
            const others = [...bar.children]
                .filter(child => child !== summary && child !== actions)
                .reduce((total, child) => total + child.getBoundingClientRect().width + gap, 0);
            setWrapped(others + natural(summary) + gap + natural(actions) > available + 1);
        };
        const observer = new view.ResizeObserver(measure);
        observer.observe(bar);
        observer.observe(summary);
        measure();
        return () => observer.disconnect();
    }, []);

    // Retorna o rótulo personalizado ou o nome original do campo
    const name = (field: string) => fieldName(field, props.labels);

    // Lista os campos filtrados que não estão nas linhas ou colunas
    const filters = Object.keys(props.layout.filters)
        .filter(field => !props.layout.rows.includes(field) && !props.layout.columns.includes(field));

    // Renderiza um grupo do resumo com ícone, rótulo e campos.
    function group(label: string, icon: string, items: string[]) {
        return (
            <span className={styles.group()}>
                <Tooltip
                    content={label}
                    position="bottom">
                    <span className={styles.label()}>
                        <i
                            aria-hidden="true"
                            className={icon}/>
                        <span className="sr-only">{label}</span>
                    </span>
                </Tooltip>
                {items.length === 0 && <span className={styles.none()}>Nenhum</span>}
                {items.map((item, index) => (
                    <span
                        className={styles.chip()}
                        key={`${item}-${index}`}>
                        {item}
                    </span>
                ))}
            </span>
        );
    }

    // Renderiza uma ação com ícone e tooltip; bloqueia o clique quando houver um motivo de desabilitação
    function action(label: string, icon: string, onClick: () => void, color: "primary" | "secondary" = "secondary", hint?: string, active?: boolean) {
        return (
            <Tooltip
                content={hint ?? (active ? label + " aplicada" : label)}
                event="both"
                position="bottom">
                <button
                    aria-disabled={hint ? true : undefined}
                    aria-label={label}
                    aria-pressed={active}
                    className={styles.icon({ color, disabled: !!hint })}
                    type="button"
                    onClick={() => !hint && onClick()}>
                    <i
                        aria-hidden="true"
                        className={`bi bi-${icon}`}/>
                </button>
            </Tooltip>
        );
    }

    // Explica por que expandir e recolher estão desabilitados quando há menos de dois campos em Linhas
    const levelsHint = props.expandable ? undefined : "Adicione dois ou mais campos em Linhas para expandir ou recolher";

    // Desabilita Expandir quando a hierarquia já está expandida
    const expandHint = levelsHint ?? (props.expanded ? "As linhas já estão expandidas" : undefined);

    // Desabilita Recolher quando a hierarquia já está recolhida
    const collapseHint = levelsHint ?? (!props.expanded ? "As linhas já estão recolhidas" : undefined);

    return {
        summaryRef,
        actionsRef,
        wrapped,
        group,
        action,
        filters: filters.map(name),
        columns: props.layout.columns.map(name),
        rows: props.layout.rows.map(name),
        values: props.layout.values.map(value => `${fieldAggregationName(value.aggregation)} de ${name(value.field)}`),
        expandHint,
        collapseHint,
    };
}
