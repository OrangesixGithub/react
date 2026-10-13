import React from "react";
import { Button } from "../../../button";
import { useViews } from "./hooks/useViews";
import type { TablePivotViewsProps } from "./@types";
import { tablePivotViewsVariants } from "./variants";

const styles = tablePivotViewsVariants();

/**
 * Core - `TablePivotViews`
 *
 * Salva a visão atual do pivot (layout, formatação e expansão) no navegador e lista as visões salvas para reaplicar.
 */
export function TablePivotViews(props: TablePivotViewsProps) {
    const { titleId, panelRef, name, setName, replacing, save, keyDown, summary, savedAt } = useViews(props);

    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return (
        <div
            className={styles.backdrop()}
            onKeyDown={keyDown}
            onMouseDown={event => event.target === event.currentTarget && props.onClose()}>
            <div
                aria-labelledby={titleId}
                aria-modal="true"
                className={styles.panel()}
                ref={panelRef}
                role="dialog"
                tabIndex={-1}>
                <div className={styles.header()}>
                    <h2
                        className={styles.title()}
                        id={titleId}>
                        Visões salvas
                    </h2>
                    <button
                        aria-label="Fechar visões salvas"
                        className={styles.close()}
                        type="button"
                        onClick={props.onClose}>
                        <i
                            aria-hidden="true"
                            className="bi bi-x-lg"/>
                    </button>
                </div>
                <form
                    className={styles.form()}
                    onSubmit={event => {
                        event.preventDefault();
                        save();
                    }}>
                    <label className={styles.label()}>
                        Salvar a visão atual como
                        <input
                            className={styles.input()}
                            maxLength={60}
                            placeholder="Ex.: Vendas por região"
                            value={name}
                            onChange={event => setName(event.target.value)}/>
                    </label>
                    <Button
                        disabled={!name.trim()}
                        icon={replacing ? "arrow-repeat" : "bookmark-plus"}
                        label={replacing ? "Substituir" : "Salvar"}
                        size="small"
                        type="submit"/>
                </form>
                {props.error && <p className={styles.error()}>{props.error}</p>}
                <div className={styles.body()}>
                    {props.views.length === 0 && (
                        <p className={styles.empty()}>Nenhuma visão salva. Monte o pivot e salve para usar depois.</p>
                    )}
                    {props.views.map(view => (
                        <div
                            className={styles.item()}
                            key={view.name}>
                            <button
                                className={styles.apply()}
                                title="Aplicar visão"
                                type="button"
                                onClick={() => props.onApply(view)}>
                                <span className={styles.name()}>{view.name}</span>
                                <span className={styles.summary()}>{summary(view)}</span>
                                <span className={styles.summary()}>Salva em {savedAt(view)}</span>
                            </button>
                            <button
                                aria-label={`Excluir a visão ${view.name}`}
                                className={styles.close()}
                                title="Excluir"
                                type="button"
                                onClick={() => props.onDelete(view.name)}>
                                <i
                                    aria-hidden="true"
                                    className="bi bi-trash"/>
                            </button>
                        </div>
                    ))}
                </div>
                <div className={styles.footer()}>
                    <p className={styles.hint()}>As visões ficam salvas neste navegador.</p>
                    <Button
                        color="secondary"
                        icon="arrow-counterclockwise"
                        label="Restaurar padrão"
                        size="small"
                        onClick={props.onReset}/>
                </div>
            </div>
        </div>
    );
}

TablePivotViews.displayName = "TablePivotViews";
