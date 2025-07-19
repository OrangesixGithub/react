import React from "react";
import { TableProps } from "..";
import { DataTableBaseProps, DataTableStateEvent } from "primereact/datatable";

/**
 * Componente - `Table`
 *
 * Define as configurações do modo de paginação de resultado.
 */
export function tablePagination(
    props: TableProps<any>
): Partial<DataTableBaseProps<any>> {

    function onPage(event: DataTableStateEvent) {
        let paginationPage = event.first / (props.paginatorRow ?? 10);
        if (props.onPaginator) {
            props.onPaginator(paginationPage + 1, event.rows);
        }
    }

    return {
        paginator: props.paginator ?? false,
        totalRecords: props?.lazy?.paginationTotal ?? undefined,
        first: props?.lazy?.paginationPage === undefined ? 0 : ((props?.lazy?.paginationPage ?? 0) - 1) * (props.paginatorRow ?? 10),
        rows: props.paginator ? (props.paginatorRow ?? 10) : undefined,
        rowsPerPageOptions: [5, 10, 15, 20, 50, 100],
        paginatorTemplate: {
            layout: "RowsPerPageDropdown FirstPageLink PageLinks LastPageLink CurrentPageReport",
            CurrentPageReport: options => {
                return (
                    <span
                        className="ms-2">{props.paginatorTotalElementsLabel ?? "Total"}: {options.totalRecords}</span>
                );
            },
        },
        paginatorDropdownAppendTo: "self",
        paginatorRight: props.templatePaginationRight,
        paginatorLeft: props.templatePaginationLeft,
        onPage: props.lazy !== undefined ? onPage : undefined,
    };
}