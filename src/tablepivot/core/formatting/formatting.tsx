import React from "react";
import { Button } from "../../../button";
import { fieldName } from "../../function/fields";
import { pivotFormattingOperators } from "./const";
import { useFormatting } from "./hooks/useFormatting";
import type { TablePivotFormattingProps } from "./@types";
import { tablePivotFormattingVariants } from "./variants";
import type { TablePivotConditionalOperator } from "../../@types";
import { formattingIsRange, formattingIsValid, formattingStyle } from "../../function/formatting";

const styles = tablePivotFormattingVariants();

/**
 * Core - `TablePivotFormatting`
 *
 * Permite criar condições para destacar os valores da tabela por campo e comparação numérica.
 */
export function TablePivotFormatting(props: TablePivotFormattingProps) {
    const { titleId, panelRef, draft, valid, add, remove, update, updateStyle, apply, keyDown } = useFormatting(props);

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
                        Formatação condicional
                    </h2>
                    <button
                        aria-label="Fechar formatação condicional"
                        className={styles.close()}
                        type="button"
                        onClick={props.onClose}>
                        <i
                            aria-hidden="true"
                            className="bi bi-x-lg"/>
                    </button>
                </div>
                <div className={styles.body()}>
                    <p className={styles.hint()}>A última condição correspondente tem prioridade.</p>
                    {draft.length === 0 && <p className={styles.empty()}>Nenhuma condição. Adicione uma regra para destacar valores.</p>}
                    {draft.map((rule, index) => (
                        <section
                            aria-label={"Condição " + (index + 1)}
                            className={styles.card()}
                            key={rule.key}>
                            <div className={styles.cardHeader()}>
                                <span>Condição {index + 1}</span>
                                <button
                                    aria-label={"Remover condição " + (index + 1)}
                                    className={styles.close()}
                                    type="button"
                                    onClick={() => remove(rule.key)}>
                                    <i
                                        aria-hidden="true"
                                        className="bi bi-x-lg"/>
                                </button>
                            </div>
                            <div className={styles.conditions({ range: formattingIsRange(rule.operator) })}>
                                <label className={styles.label()}>
                                    Campo
                                    <select
                                        className={styles.select()}
                                        value={rule.field ?? ""}
                                        onChange={event => update(rule.key, { field: event.target.value || undefined })}>
                                        <option
                                            className={styles.option()}
                                            value="">Todos os valores</option>
                                        {props.layout.values.map(value => (
                                            <option
                                                className={styles.option()}
                                                key={value.field}
                                                value={value.field}>{fieldName(value.field, props.labels)}</option>
                                        ))}
                                        {rule.field && !props.layout.values.some(value => value.field === rule.field) && (
                                            <option
                                                className={styles.option()}
                                                value={rule.field}>{fieldName(rule.field, props.labels)} (fora do layout)</option>
                                        )}
                                    </select>
                                </label>
                                <label className={styles.label()}>
                                    Comparação
                                    <select
                                        className={styles.select()}
                                        value={rule.operator}
                                        onChange={event => update(rule.key, { operator: event.target.value as TablePivotConditionalOperator })}>
                                        {pivotFormattingOperators.map(option => (
                                            <option
                                                className={styles.option()}
                                                key={option.id}
                                                value={option.id}>{option.label}</option>
                                        ))}
                                    </select>
                                </label>
                                <label className={styles.label()}>
                                    {formattingIsRange(rule.operator) ? "De" : "Valor"}
                                    <input
                                        aria-invalid={!formattingIsValid(rule)}
                                        className={styles.input()}
                                        step="any"
                                        type="number"
                                        value={rule.value}
                                        onChange={event => update(rule.key, { value: event.target.value })}/>
                                </label>
                                {formattingIsRange(rule.operator) && (
                                    <label className={styles.label()}>
                                        Até
                                        <input
                                            aria-invalid={!formattingIsValid(rule)}
                                            className={styles.input()}
                                            step="any"
                                            type="number"
                                            value={rule.valueTo}
                                            onChange={event => update(rule.key, { valueTo: event.target.value })}/>
                                    </label>
                                )}
                            </div>
                            {!formattingIsValid(rule) && <p className={styles.error()}>Informe valores válidos; o início do intervalo deve ser menor ou igual ao fim.</p>}
                            <label className={styles.checkLabel()}>
                                <input
                                    checked={rule.includeTotals !== false}
                                    className={styles.checkbox({ checked: rule.includeTotals !== false })}
                                    type="checkbox"
                                    onChange={event => update(rule.key, { includeTotals: event.target.checked })}/>
                                Aplicar aos totais gerais
                            </label>
                            <div className={styles.formats()}>
                                {([{ property: "color", label: "Cor do texto", initial: "#dc2626" }, { property: "backgroundColor", label: "Cor de fundo", initial: "#fef3c7" }] as const).map(option => (
                                    <div
                                        className={styles.label()}
                                        key={option.property}>
                                        <label className={styles.checkLabel()}>
                                            <input
                                                checked={!!rule.style[option.property]}
                                                className={styles.checkbox({ checked: !!rule.style[option.property] })}
                                                type="checkbox"
                                                onChange={event => updateStyle(rule.key, { [option.property]: event.target.checked ? option.initial : undefined })}/>
                                            {option.label}
                                        </label>
                                        <input
                                            aria-label={option.label + " da condição " + (index + 1)}
                                            className={styles.color()}
                                            disabled={!rule.style[option.property]}
                                            type="color"
                                            value={/^#[0-9a-f]{6}$/i.test(rule.style[option.property] ?? "") ? rule.style[option.property] : option.initial}
                                            onChange={event => updateStyle(rule.key, { [option.property]: event.target.value })}/>
                                    </div>
                                ))}
                                <div className={styles.typography()}>
                                    <div className={styles.toggles()}>
                                        {([{ property: "bold", label: "Negrito" }, { property: "italic", label: "Itálico" }, { property: "underline", label: "Sublinhado" }] as const).map(option => (
                                            <label
                                                className={styles.checkLabel()}
                                                key={option.property}>
                                                <input
                                                    checked={rule.style[option.property] === true}
                                                    className={styles.checkbox({ checked: rule.style[option.property] === true })}
                                                    type="checkbox"
                                                    onChange={event => updateStyle(rule.key, { [option.property]: event.target.checked })}/>
                                                {option.label}
                                            </label>
                                        ))}
                                    </div>
                                    <div
                                        aria-label="Prévia da formatação"
                                        className={styles.preview()}
                                        style={formattingStyle(rule.style)}>123,45</div>
                                </div>
                            </div>
                        </section>
                    ))}
                </div>
                <div className={styles.footer()}>
                    <Button
                        label="Adicionar condição"
                        size="small"
                        onClick={add}/>
                    <div className={styles.buttons()}>
                        <Button
                            disabled={!valid}
                            label="Aplicar"
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

TablePivotFormatting.displayName = "TablePivotFormatting";
