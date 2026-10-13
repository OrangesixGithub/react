import type { Client, Table } from "@perspective-dev/client";
import type { Dispatch, RefObject, SetStateAction } from "react";
import type { HTMLPerspectiveViewerElement } from "@perspective-dev/viewer";
import type { TablePivotAggregation, TablePivotCellMeta, TablePivotLayout, TablePivotProps } from "./core";

export type { Client, Table } from "@perspective-dev/client";
export type { HTMLPerspectiveViewerElement, ViewerConfigUpdate } from "@perspective-dev/viewer";

/**
 * Tipos de coluna informados pelo `table.schema()` do Perspective.
 */
export type PivotSchema = Record<string, string>;

/**
 * Áreas da lista de campos.
 */
export type PivotZone = "filters" | "columns" | "rows" | "values";

/**
 * Props usadas para montar o layout inicial do pivot.
 */
export type PivotLayoutProps = Pick<TablePivotProps, "rows" | "columns" | "values" | "filters" | "sort">;

/**
 * Tabela carregada e esquema dos campos disponíveis.
 */
export interface PivotSource {
    table: Table
    schema: PivotSchema
}

/**
 * Estado da hierarquia usado ao desenhar a grade.
 */
export interface PivotDepth {
    collapsed: boolean
    levels: number
    integer: boolean
}

/**
 * Operação disponível na lista de campos e seu nome no Perspective.
 */
export interface PivotAggregationOption {
    id: TablePivotAggregation
    name: string
    numeric: boolean
    perspective: string
}

/**
 * Identificação, rótulo e ícone de uma área da lista de campos.
 */
export interface PivotZoneOption {
    id: PivotZone
    label: string
    icon: string
}

/**
 * Grade interna do Datagrid usada para personalizar as células visíveis.
 */
export interface PivotRegularTable extends HTMLElement {
    addStyleListener: (listener: () => void) => (() => void) | undefined
    getMeta: (cell: HTMLTableCellElement) => TablePivotCellMeta | undefined
    draw: () => void | Promise<void>
}

/**
 * Acesso à grade do plugin Datagrid.
 */
export interface PivotDatagridPlugin {
    regular_table?: PivotRegularTable
}

/**
 * Referências, estados e ações usados pelos efeitos internos do TablePivot.
 */
export interface PivotEffectsOptions {
    props: TablePivotProps
    id: string
    hostRef: RefObject<HTMLDivElement | null>
    viewerRef: RefObject<HTMLPerspectiveViewerElement | null>
    tableRef: RefObject<Table | null>
    retiredRef: RefObject<Table[]>
    closingRef: RefObject<Promise<void> | null>
    styleCellRef: RefObject<TablePivotProps["styleCell"]>
    client: Client | null
    error: string | null
    source: PivotSource | null
    layout: TablePivotLayout | null
    expand: boolean
    rendered: boolean
    setClient: Dispatch<SetStateAction<Client | null>>
    setError: Dispatch<SetStateAction<string | null>>
    setSource: Dispatch<SetStateAction<PivotSource | null>>
    setLayout: Dispatch<SetStateAction<TablePivotLayout | null>>
    setExpand: Dispatch<SetStateAction<boolean>>
    setRendered: Dispatch<SetStateAction<boolean>>
    applyDepth: () => Promise<void>
    relabel: (cell: HTMLTableCellElement) => void
}

/**
 * Referências e controles usados pelas ações da barra do TablePivot.
 */
export interface PivotToolbarOptions {
    rootRef: RefObject<HTMLDivElement | null>
    viewerRef: RefObject<HTMLPerspectiveViewerElement | null>
    setExpand: Dispatch<SetStateAction<boolean>>
    setFieldList: Dispatch<SetStateAction<boolean>>
}
