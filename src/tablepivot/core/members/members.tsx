import React from "react";
import { Button } from "../../../button";
import { pivotMembersLimit } from "../const";
import { useMembers } from "./hooks/useMembers";
import type { TablePivotMembersProps } from "./@types";
import { tablePivotMembersVariants } from "./variants";

const styles = tablePivotMembersVariants();

/**
 * Core - `TablePivotMembers`
 *
 * Filtro de membros de um campo: lista os valores distintos com caixas de seleção e busca.
 */
export function TablePivotMembers(props: TablePivotMembersProps) {
    const { members, selected, search, setSearch, visible, toggle, toggleVisible, apply } = useMembers(props);

    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return (
        <div
            className={styles.backdrop()}
            onMouseDown={event => event.target === event.currentTarget && props.onClose()}>
            <div
                aria-label={`Filtrar ${props.label}`}
                className={styles.root()}
                role="group">
                <div className={styles.header()}>
                    <span className="truncate">Filtrar {props.label}</span>
                    <button
                        aria-label="Fechar filtro"
                        className={styles.action()}
                        type="button"
                        onClick={props.onClose}>
                        <i
                            aria-hidden="true"
                            className="bi bi-x-lg"/>
                    </button>
                </div>
                <input
                    aria-label={`Buscar em ${props.label}`}
                    className={styles.search()}
                    placeholder="Buscar"
                    type="search"
                    value={search}
                    onChange={event => setSearch(event.target.value)}/>
                <div className={styles.list()}>
                    {members === null
                        && <p className={styles.placeholder()}>Carregando…</p>}
                    {members !== null
                        && visible.length > 0 && (
                        <label className={styles.item({ className: "font-medium" })}>
                            <input
                                checked={visible.every(member => selected.has(member))}
                                className={styles.checkbox({ checked: visible.every(member => selected.has(member)) })}
                                type="checkbox"
                                onChange={toggleVisible}/>
                            {search ? "Selecionar resultados" : "Selecionar tudo"}
                        </label>
                    )}
                    {visible.slice(0, pivotMembersLimit).map(member => (
                        <label
                            className={styles.item()}
                            key={member}>
                            <input
                                checked={selected.has(member)}
                                className={styles.checkbox({ checked: selected.has(member) })}
                                type="checkbox"
                                onChange={() => toggle(member)}/>
                            <span className={styles.name()}>{member === "" ? "(vazio)" : member}</span>
                        </label>
                    ))}
                    {members !== null && visible.length === 0 &&
                        <p className={styles.placeholder()}>Nenhum valor encontrado.</p>}
                    {visible.length > pivotMembersLimit && (
                        <p className={styles.placeholder()}>
                            Mostrando {pivotMembersLimit} de {visible.length}. Use a busca para refinar.</p>
                    )}
                </div>
                <div className={styles.footer()}>
                    <span>{selected.size} de {members?.length ?? 0} selecionado(s)</span>
                    <div className="flex gap-2">
                        <Button
                            disabled={selected.size === 0}
                            label="OK"
                            size="small"
                            onClick={apply}/>
                        <Button
                            color="secondary"
                            label="Cancelar"
                            size="small"
                            onClick={props.onClose}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

TablePivotMembers.displayName = "TablePivotMembers";
