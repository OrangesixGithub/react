import type { ApiComponentProps } from "../../api";
import type { Table } from "@perspective-dev/client";
import type { HTMLPerspectiveViewerElement } from "@perspective-dev/viewer";

/**
 * Operação aplicada a um valor: soma, contagem, média, mínimo, máximo ou contagem distinta.
 */
export type TablePivotAggregation = "sum" | "count" | "avg" | "min" | "max" | "distinct";

/**
 * Valor exibido nas células: o nome do campo (operação padrão: `sum` para números, `count` para os demais)
 * ou o campo com a operação.
 */
export type TablePivotValue = string | {
    field: string,
    aggregation?: TablePivotAggregation
};

/**
 * Layout do pivot, como é devolvido pelo `onChange` (pronto para ser salvo e reaplicado nas props).
 */
export interface TablePivotLayout {
    rows: string[]
    columns: string[]
    values: Array<{ field: string, aggregation: TablePivotAggregation }>
    filters: Record<string, Array<string | number>>
    sort: Record<string, "asc" | "desc">
}

export interface TablePivotProps extends ApiComponentProps {
    /**
     * Registros do pivot (lista de objetos).
     */
    data: object[]

    /**
     * Campos agrupados nas linhas, na ordem da hierarquia.
     */
    rows?: string[]

    /**
     * Campos agrupados nas colunas.
     */
    columns?: string[]

    /**
     * Valores das células. Sem a prop, soma os campos numéricos que não estão em linhas ou colunas.
     */
    values?: TablePivotValue[]

    /**
     * Filtros por campo: exibe só os membros informados. Lista vazia mantém o campo na área Filtros sem restringir.
     */
    filters?: Record<string, Array<string | number>>

    /**
     * Ordenação dos campos de linhas e colunas. Padrão: crescente.
     */
    sort?: Record<string, "asc" | "desc">

    /**
     * Nomes exibidos dos campos (ex.: `{ regiao: "Região" }`).
     */
    labels?: Record<string, string>

    /**
     * Título exibido na barra.
     */
    title?: string

    /**
     * Altura do componente. Padrão: `500`.
     */
    height?: string | number

    /**
     * Exibe a barra com o resumo, a lista de campos e as ações. Padrão: `true`.
     */
    toolbar?: boolean

    /**
     * Inicia a hierarquia de linhas expandida. Padrão: `false` (só o primeiro nível).
     */
    expanded?: boolean

    /**
     * Executado quando o usuário aplica alterações na lista de campos.
     */
    onChange?: (layout: TablePivotLayout) => void

    /**
     * Personaliza as células visíveis da grade a cada renderização (classes, estilo e conteúdo).
     */
    styleCell?: (cell: HTMLTableCellElement, meta: TablePivotCellMeta) => void
}

export interface TablePivotCellMeta {
    /**
     * Valor exibido na célula, quando for uma célula de dados.
     */
    value?: unknown

    /**
     * Caminho do grupo da linha (valores dos campos de `rows`).
     */
    row_header?: unknown[]

    /**
     * Caminho do grupo da coluna (valores dos campos de `columns` e o nome do valor).
     */
    column_header?: unknown[]

    /**
     * Índices da célula na grade.
     */
    x?: number
    y?: number
}

export interface TablePivotRef {
    /**
     * Expande todos os níveis das linhas.
     */
    expandAll: () => void

    /**
     * Recolhe as linhas no primeiro nível.
     */
    collapseAll: () => void

    /**
     * Baixa os dados exibidos em CSV.
     */
    exportCsv: () => void

    /**
     * Acesso avançado ao `<perspective-viewer>` (disponível depois do carregamento do motor).
     */
    viewer: HTMLPerspectiveViewerElement | null

    /**
     * Acesso avançado à tabela do Perspective.
     */
    table: Table | null
}
