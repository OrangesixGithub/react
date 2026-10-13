import { fieldName } from "../../../function/fields";
import { tablePivotFieldListVariants } from "../variants";
import type { TablePivotFieldListProps } from "../@types";
import { pivotAggregations, pivotZones } from "../../const";
import type { PivotZone } from "../../../@types/perspective";
import React, { useEffect, useMemo, useRef, useState } from "react";
import type { TablePivotAggregation, TablePivotLayout } from "../../../@types";
import { configDefaultAggregation, configIsNumeric } from "../../../function/config";

const styles = tablePivotFieldListVariants();

// Lista os campos de uma zona na ordem exibida
function fieldsOf(layout: TablePivotLayout, zone: PivotZone): string[] {
    if (zone === "values") {
        return layout.values.map(value => value.field);
    }
    if (zone === "filters") {
        return Object.keys(layout.filters).filter(field => !layout.rows.includes(field) && !layout.columns.includes(field));
    }
    return layout[zone];
}

// Remove o campo das zonas; com all, remove também filtro e ordenação
function without(layout: TablePivotLayout, field: string, all = false): TablePivotLayout {
    const filters = { ...layout.filters };
    const sort = { ...layout.sort };
    if (all || filters[field]?.length === 0) {
        delete filters[field];
    }
    if (all) {
        delete sort[field];
    }
    return {
        rows: layout.rows.filter(item => item !== field),
        columns: layout.columns.filter(item => item !== field),
        values: layout.values.filter(item => item.field !== field),
        filters,
        sort,
    };
}

/**
 * Hook - `useFieldList`
 *
 * Controla a edição do layout, a busca, os filtros e o arraste dos campos entre as zonas.
 */
export function useFieldList(props: TablePivotFieldListProps) {
    // Guarda o layout inicial para restaurá-lo ao cancelar
    const initial = useMemo(() => props.layout, []);
    // Referencia o painel que recebe foco ao abrir
    const panelRef = useRef<HTMLDivElement>(null);
    // Guarda o campo arrastado entre as zonas
    const dragRef = useRef<string | null>(null);
    // Guarda o layout em edição
    const [draft, setDraft] = useState<TablePivotLayout>(initial);
    // Controla se as alterações aguardam o botão Aplicar
    const [defer, setDefer] = useState(true);
    // Guarda o texto da busca de campos
    const [search, setSearch] = useState("");
    // Identifica a zona destacada durante o arraste
    const [dropping, setDropping] = useState<PivotZone | "fields" | null>(null);
    // Identifica o campo destacado durante o arraste
    const [dragging, setDragging] = useState<string | null>(null);
    // Identifica o campo com o filtro de membros aberto
    const [filtering, setFiltering] = useState<string | null>(null);

    // Retorna o rótulo personalizado ou o nome original do campo
    const name = (field: string) => fieldName(field, props.labels);

    // Filtra os campos pelo nome ou rótulo informado na busca
    const visible = Object.keys(props.schema).filter(field => {
        const term = search.trim().toLowerCase();
        return field.toLowerCase().includes(term) || name(field).toLowerCase().includes(term);
    });

    // Coloca o foco no painel ao abrir a lista
    useEffect(() => panelRef.current?.focus(), []);

    // Atualiza o rascunho e aplica imediatamente quando a atualização não está adiada
    function update(next: TablePivotLayout) {
        setDraft(next);
        if (!defer) {
            props.onApply(next);
        }
    }

    // Identifica a zona atual de um campo
    function zoneOf(field: string): PivotZone | null {
        return pivotZones.find(zone => fieldsOf(draft, zone.id).includes(field))?.id ?? null;
    }

    // Move o campo para uma única zona, no fim ou na posição informada
    function move(field: string, to: PivotZone, index?: number) {
        const next = without(draft, field);
        if (to === "filters") {
            next.filters = { ...next.filters, [field]: draft.filters[field] ?? [] };
        } else if (to === "values") {
            const values = [...next.values];
            const aggregation = draft.values.find(value => value.field === field)?.aggregation ?? configDefaultAggregation(props.schema, field);
            values.splice(index ?? values.length, 0, { field, aggregation });
            next.values = values;
        } else {
            const list = [...next[to]];
            list.splice(index ?? list.length, 0, field);
            next[to] = list;
        }
        update(next);
    }

    // Adiciona ou remove o campo ao marcar sua caixa de seleção
    function toggle(field: string, checked: boolean) {
        if (checked) {
            move(field, configIsNumeric(props.schema, field) ? "values" : "rows");
        } else {
            update(without(draft, field, true));
        }
    }

    // Altera a operação aplicada ao valor do campo
    function setAggregation(field: string, aggregation: TablePivotAggregation) {
        update({ ...draft, values: draft.values.map(value => value.field === field ? { ...value, aggregation } : value) });
    }

    // Alterna a ordenação do campo entre crescente e decrescente
    function setSort(field: string) {
        update({ ...draft, sort: { ...draft.sort, [field]: draft.sort[field] === "desc" ? "asc" : "desc" } });
    }

    // Atualiza os valores usados para filtrar o campo
    function setFilter(field: string, members: string[]) {
        const filters = { ...draft.filters, [field]: members };
        // Sem restrição, o filtro só é mantido para o campo que está na zona Filtros.
        if (members.length === 0 && zoneOf(field) !== "filters") {
            delete filters[field];
        }
        update({ ...draft, filters });
    }

    // Aplica o layout em edição e fecha a lista
    function apply() {
        props.onApply(draft);
        props.onClose();
    }

    // Restaura o layout inicial quando necessário e fecha a lista
    function cancel() {
        if (!defer) {
            props.onApply(initial);
        }
        props.onClose();
    }

    // Inicia o arraste e registra o campo transferido
    function startDrag(event: React.DragEvent, field: string) {
        dragRef.current = field;
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData("text/plain", field);
        setDragging(field);
    }

    // Limpa o campo arrastado e os destaques das zonas
    function endDrag() {
        dragRef.current = null;
        setDragging(null);
        setDropping(null);
    }

    // Permite soltar o campo e destaca a zona de destino
    function over(event: React.DragEvent, zone: PivotZone | "fields") {
        if (dragRef.current) {
            event.preventDefault();
            setDropping(zone);
        }
    }

    // Remove o destaque quando o arraste sai da zona
    function leave(event: React.DragEvent) {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
            setDropping(null);
        }
    }

    // Move ou remove o campo ao soltá-lo na zona de destino
    function drop(event: React.DragEvent, zone: PivotZone | "fields") {
        event.preventDefault();
        const field = dragRef.current;
        endDrag();
        if (!field) {
            return;
        }
        if (zone === "fields") {
            update(without(draft, field, true));
            return;
        }
        // Solto sobre um item: entra antes dele; na área vazia: vai para o fim.
        const target = (event.target as HTMLElement).closest<HTMLElement>("[data-field]")?.dataset.field;
        const index = target && target !== field ? fieldsOf(without(draft, field), zone).indexOf(target) : -1;
        move(field, zone, index === -1 ? undefined : index);
    }

    // Fecha o filtro ou cancela a lista ao pressionar Escape
    function keyDown(event: React.KeyboardEvent) {
        if (event.key === "Escape") {
            event.stopPropagation();
            if (filtering) {
                setFiltering(null);
            } else {
                cancel();
            }
        }
    }

    // Renderiza o campo com controles de operação, ordem, filtro e remoção
    function zoneItem(zone: PivotZone, field: string) {
        const numeric = configIsNumeric(props.schema, field);
        const operations = pivotAggregations.filter(option => numeric || !option.numeric);
        const value = draft.values.find(item => item.field === field);
        const filtered = (draft.filters[field]?.length ?? 0) > 0;
        return (
            <div
                draggable
                className={styles.item({ dragging: dragging === field })}
                data-field={field}
                key={`${zone}-${field}`}
                onDragEnd={endDrag}
                onDragStart={event => startDrag(event, field)}>
                <i
                    aria-hidden="true"
                    className={styles.handle()}/>
                <span
                    className={styles.name()}
                    title={field}>
                    {name(field)}
                </span>
                {zone === "values" && value && (
                    <span className={styles.select()}>
                        <select
                            aria-label={`Operação de ${name(field)}`}
                            className={styles.aggregation()}
                            value={value.aggregation}
                            onChange={event => setAggregation(field, event.target.value as TablePivotAggregation)}>
                            {operations.map(option => (
                                <option
                                    className={styles.option()}
                                    key={option.id}
                                    value={option.id}>
                                    {option.name}
                                </option>
                            ))}
                        </select>
                        <i
                            aria-hidden="true"
                            className={styles.selectIcon()}/>
                    </span>
                )}
                {(zone === "rows" || zone === "columns") && (
                    <button
                        aria-label={`Ordenar ${name(field)} (${draft.sort[field] === "desc" ? "decrescente" : "crescente"})`}
                        className={styles.action()}
                        title={draft.sort[field] === "desc" ? "Ordem decrescente" : "Ordem crescente"}
                        type="button"
                        onClick={() => setSort(field)}>
                        <i
                            aria-hidden="true"
                            className={draft.sort[field] === "desc" ? "bi bi-sort-down" : "bi bi-sort-up"}/>
                    </button>
                )}
                {zone !== "values" && (
                    <button
                        aria-label={`Filtrar ${name(field)}`}
                        aria-pressed={filtered}
                        className={styles.action({ active: filtered })}
                        title="Filtrar membros"
                        type="button"
                        onClick={() => setFiltering(field)}>
                        <i
                            aria-hidden="true"
                            className={filtered ? "bi bi-funnel-fill" : "bi bi-funnel"}/>
                    </button>
                )}
                <span
                    className={`${styles.action()} relative`}
                    title="Mover para">
                    <i
                        aria-hidden="true"
                        className="bi bi-arrow-left-right"/>
                    <select
                        aria-label={`Mover ${name(field)} para`}
                        className={styles.move()}
                        value={zone}
                        onChange={event => move(field, event.target.value as PivotZone)}>
                        {pivotZones.map(option => (
                            <option
                                className={styles.option()}
                                key={option.id}
                                value={option.id}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </span>
                <button
                    aria-label={`Remover ${name(field)}`}
                    className={styles.action()}
                    title="Remover"
                    type="button"
                    onClick={() => update(without(draft, field, true))}>
                    <i
                        aria-hidden="true"
                        className="bi bi-x-lg"/>
                </button>
            </div>
        );
    }

    // Aplica o filtro de membros e fecha o cartão
    function applyFilter(members: string[]) {
        if (filtering) {
            setFilter(filtering, members);
            setFiltering(null);
        }
    }

    // Fecha o cartão de filtro sem alterar a seleção
    function closeFilter() {
        setFiltering(null);
    }

    // Aplica o rascunho ao desativar o adiamento das atualizações
    function changeDefer(checked: boolean) {
        setDefer(checked);
        if (!checked) {
            props.onApply(draft);
        }
    }

    return {
        panelRef, draft, defer, search, setSearch, dropping, dragging, filtering,
        name, visible, fieldsOf, zoneOf, toggle, apply, cancel, startDrag, endDrag,
        over, leave, drop, keyDown, zoneItem, applyFilter, closeFilter, changeDefer,
    };
}
