import { editorVariants } from "../variants";
import type { EditorCoreProps } from "../@types";
import { useEffect, useRef, useState } from "react";

/** Core - `Table`: seletor de dimensões e comandos de edição da tabela. */
export function Table({ iconPrefix = "bi bi-", ...props }: EditorCoreProps & { active: boolean }) {
    const [open, setOpen] = useState(false);
    const [rows, setRows] = useState(3);
    const [cols, setCols] = useState(3);
    const container = useRef<HTMLDivElement>(null);
    const trigger = useRef<HTMLButtonElement>(null);
    const styles = editorVariants();
    const insideTable = props.editor.isActive("table");
    const actions = [
        { label: "Adicionar linha abaixo", command: () => props.editor.chain().focus().addRowAfter().run() },
        { label: "Adicionar coluna à direita", command: () => props.editor.chain().focus().addColumnAfter().run() },
        { label: "Excluir linha", command: () => props.editor.chain().focus().deleteRow().run() },
        { label: "Excluir coluna", command: () => props.editor.chain().focus().deleteColumn().run() },
        { label: "Excluir tabela", command: () => props.editor.chain().focus().deleteTable().run() },
    ];
    useEffect(() => {
        if (!open) {
            return;
        }
        function close(event: MouseEvent) {
            if (!container.current?.contains(event.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", close);
        return () => document.removeEventListener("mousedown", close);
    }, [open]);
    function insert(rowCount = rows, colCount = cols) {
        if (!props.editor.isEditable) {
            return;
        }
        props.editor.chain().focus().insertTable({ rows: rowCount, cols: colCount, withHeaderRow: false }).run();
        setOpen(false);
    }
    function dimension(value: string) {
        return Math.min(20, Math.max(1, Number.parseInt(value, 10) || 1));
    }
    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return props.active && (
        <div
            className={styles.tablePicker()}
            ref={container}
            onKeyDown={event => {
                if (event.key === "Escape") {
                    setOpen(false);
                    trigger.current?.focus();
                }
            }}>
            <button
                aria-expanded={open}
                aria-label="Inserir tabela"
                className={styles.button()}
                disabled={!props.editor.isEditable}
                ref={trigger}
                title="Inserir tabela"
                type="button"
                onClick={() => setOpen(!open)}
                onMouseDown={event => event.preventDefault()}>
                <i
                    aria-hidden="true"
                    className={iconPrefix + "table"}/>
            </button>
            {open && <div
                aria-label="Selecionar dimensões da tabela"
                className={styles.tablePanel()}>
                <div className={styles.tableGrid()}>
                    {Array.from({ length: 64 }, (_, index) => {
                        const row = Math.floor(index / 8) + 1;
                        const col = index % 8 + 1;
                        return <button
                            aria-label={col + " colunas e " + row + " linhas"}
                            className={styles.tableCell()}
                            data-selected={row <= rows && col <= cols}
                            key={index}
                            type="button"
                            onClick={() => insert(row, col)}
                            onFocus={() => { setRows(row); setCols(col); }}
                            onMouseDown={event => event.preventDefault()}
                            onMouseEnter={() => { setRows(row); setCols(col); }}/>;
                    })}
                </div>
                <div className={styles.tableDimensions()}>
                    <label>Colunas <input
                        className={styles.tableNumber()}
                        max={20}
                        min={1}
                        type="number"
                        value={cols}
                        onChange={event => setCols(dimension(event.target.value))}/></label>
                    <span aria-hidden="true">×</span>
                    <label>Linhas <input
                        className={styles.tableNumber()}
                        max={20}
                        min={1}
                        type="number"
                        value={rows}
                        onChange={event => setRows(dimension(event.target.value))}/></label>
                </div>
                <button
                    className={styles.button()}
                    type="button"
                    onClick={() => insert()}
                    onMouseDown={event => event.preventDefault()}>Inserir {cols} × {rows}</button>
                {insideTable && <div className={styles.tableActions()}>
                    {actions.map(action => <button
                        className={styles.tableAction()}
                        key={action.label}
                        type="button"
                        onClick={() => { action.command(); setOpen(false); }}
                        onMouseDown={event => event.preventDefault()}>{action.label}</button>)}
                </div>}
            </div>}
        </div>
    );
}

Table.displayName = "Table";
