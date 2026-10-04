import React from "react";
import { tableVariants } from "../variants";
import type { TableProps } from "../@types";
import type { DataTableBaseProps } from "primereact/datatable";

/**
 * Core - `TablePagination`
 *
 * Paginação local do PrimeReact ou paginação remota controlada pelo consumidor.
 */
export function tablePagination(props: TableProps<any>): Partial<DataTableBaseProps<any[]>> {
    const styles = tableVariants();
    const rows = props.paginatorRow ?? 10;
    return {
        paginator: props.paginator ?? false,
        totalRecords: props.lazy?.paginationTotal,
        first: props.lazy === undefined ? 0 : (Math.max(1, props.lazy.paginationPage ?? 1) - 1) * rows,
        rows: props.paginator ? rows : undefined,
        rowsPerPageOptions: props.rowsPerPageOptions ?? [5, 10, 15, 20, 25, 50, 100],
        paginatorTemplate: {
            layout: "RowsPerPageDropdown PrevPageLink PageLinks NextPageLink CurrentPageReport",
            PrevPageLink: options => (
                <button
                    aria-label="Página anterior"
                    className={styles.pageNavigation()}
                    disabled={options.disabled}
                    type="button"
                    onClick={options.onClick}>Anterior</button>
            ),
            NextPageLink: options => (
                <button
                    aria-label="Próxima página"
                    className={styles.pageNavigation()}
                    disabled={options.disabled}
                    type="button"
                    onClick={options.onClick}>Próxima</button>
            ),
            RowsPerPageDropdown: options => (
                <select
                    aria-label="Registros por página"
                    className={styles.pageSelect()}
                    disabled={options.disabled}
                    value={options.value}
                    onChange={event => {
                        const rows = Number(event.target.value);
                        // A declaração v10 usa string, mas o paginator exige rows numérico em runtime.
                        options.onChange({ originalEvent: event, value: rows, target: { name: "rows", id: "rows", value: rows } } as unknown as Parameters<typeof options.onChange>[0]);
                    }}>
                    {options.options.map(option => (
                        <option
                            key={option.value}
                            value={option.value}>{option.label}</option>
                    ))}
                </select>
            ),
            CurrentPageReport: options => (
                <span className={styles.pageReport()}>
                    {props.paginatorTotalElementsLabel ?? "Total"}: {options.totalRecords}
                </span>
            ),
        },
        paginatorLeft: props.templatePaginationLeft,
        paginatorRight: props.templatePaginationRight,
        onPage: props.lazy === undefined ? undefined : event => props.onPaginator?.(Math.floor(event.first / event.rows) + 1, event.rows),
    };
}
