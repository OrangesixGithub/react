import React from "react";
import { pivotZones } from "../const";
import { Button } from "../../../button";
import { TablePivotMembers } from "../members";
import { useFieldList } from "./hooks/useFieldList";
import { fieldTypeName } from "../../function/fields";
import { tablePivotFieldListVariants } from "./variants";
import type { TablePivotFieldListProps } from "./@types";

const styles = tablePivotFieldListVariants();

/**
 * Core - `TablePivotFieldList`
 *
 * Lista de campos do TablePivot: o usuário marca os campos e os distribui entre Filtros, Colunas, Linhas e Valores,
 * arrastando ou pelo seletor "Mover para".
 */
export function TablePivotFieldList(props: TablePivotFieldListProps) {
    const {
        panelRef, draft, defer, search, setSearch, dropping, dragging, filtering,
        name, visible, fieldsOf, zoneOf, toggle, apply, cancel, startDrag, endDrag,
        over, leave, drop, keyDown, zoneItem, applyFilter, closeFilter, changeDefer,
    } = useFieldList(props);

    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return (
        <div
            className={styles.backdrop()}
            onKeyDown={keyDown}
            onMouseDown={event => event.target === event.currentTarget && cancel()}>
            <div
                aria-labelledby="os-pivot-fieldlist-title"
                aria-modal="true"
                className={styles.panel()}
                ref={panelRef}
                role="dialog"
                tabIndex={-1}>
                <div className={styles.header()}>
                    <div>
                        <h2
                            className={styles.title()}
                            id="os-pivot-fieldlist-title">
                            Lista de campos
                        </h2>
                        <p className={styles.hint()}>Marque os campos e arraste-os entre as áreas abaixo.</p>
                    </div>
                    <button
                        aria-label="Fechar"
                        className={styles.close()}
                        type="button"
                        onClick={cancel}>
                        <i
                            aria-hidden="true"
                            className="bi bi-x-lg"/>
                    </button>
                </div>
                <div className="flex min-h-0 flex-1 flex-col">
                    <div className={styles.body()}>
                        <section
                            aria-label="Todos os campos"
                            className={styles.box({ dropping: dropping === "fields", className: styles.fields() })}
                            onDragLeave={leave}
                            onDragOver={event => over(event, "fields")}
                            onDrop={event => drop(event, "fields")}>
                            <div className={styles.boxHeader()}>Todos os campos</div>
                            <input
                                aria-label="Buscar campo"
                                className={styles.search()}
                                placeholder="Buscar"
                                type="search"
                                value={search}
                                onChange={event => setSearch(event.target.value)}/>
                            <div className={styles.boxBody()}>
                                {visible.map(field => {
                                    const used = zoneOf(field) !== null;
                                    return (
                                        <label
                                            draggable
                                            className={styles.item({ dragging: dragging === field, className: "cursor-pointer" })}
                                            key={field}
                                            onDragEnd={endDrag}
                                            onDragStart={event => startDrag(event, field)}>
                                            <i
                                                aria-hidden="true"
                                                className={styles.handle()}/>
                                            <input
                                                checked={used}
                                                className={styles.checkbox({ checked: used })}
                                                type="checkbox"
                                                onChange={event => toggle(field, event.target.checked)}/>
                                            <span className={styles.name({ className: used ? "font-medium" : "" })}>{name(field)}</span>
                                            <span className={styles.type()}>{fieldTypeName(props.schema, field)}</span>
                                        </label>
                                    );
                                })}
                                {visible.length === 0 && <p className={styles.placeholder()}>Nenhum campo encontrado.</p>}
                            </div>
                        </section>
                        {pivotZones.map(zone => {
                            const fields = fieldsOf(draft, zone.id);
                            return (
                                <section
                                    aria-label={zone.label}
                                    className={styles.box({ dropping: dropping === zone.id })}
                                    key={zone.id}
                                    onDragLeave={leave}
                                    onDragOver={event => over(event, zone.id)}
                                    onDrop={event => drop(event, zone.id)}>
                                    <div className={styles.boxHeader()}>
                                        <i
                                            aria-hidden="true"
                                            className={`${zone.icon} ${styles.boxIcon()}`}/>
                                        {zone.label}
                                    </div>
                                    <div className={styles.boxBody()}>
                                        {fields.map(field => zoneItem(zone.id, field))}
                                        {fields.length === 0 && <p className={styles.placeholder()}>Arraste os campos para cá</p>}
                                    </div>
                                </section>
                            );
                        })}
                    </div>
                </div>
                {filtering && (
                    <TablePivotMembers
                        field={filtering}
                        label={name(filtering)}
                        loadMembers={props.loadMembers}
                        members={draft.filters[filtering]}
                        onApply={applyFilter}
                        onClose={closeFilter}/>
                )}
                <div className={styles.footer()}>
                    <label className={styles.defer()}>
                        <input
                            checked={defer}
                            className={styles.checkbox({ checked: defer })}
                            type="checkbox"
                            onChange={event => changeDefer(event.target.checked)}/>
                        Adiar atualização
                    </label>
                    <div className={styles.buttons()}>
                        <Button
                            label="Aplicar"
                            size="small"
                            onClick={apply}/>
                        <Button
                            color="secondary"
                            label="Cancelar"
                            size="small"
                            onClick={cancel}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

TablePivotFieldList.displayName = "TablePivotFieldList";
