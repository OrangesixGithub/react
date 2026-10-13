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
     * Altura máxima do componente. Cresce conforme o conteúdo e rola ao atingir o limite. Padrão: `500`.
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

    /** Regras de formatação numérica. A última regra correspondente tem prioridade. */
    conditionalFormatting?: TablePivotConditionalRule[]

    /** Executado ao aplicar regras no painel, permitindo salvar e reaplicá-las. */
    onConditionalFormattingChange?: (rules: TablePivotConditionalRule[]) => void

    /**
     * Chave das visões salvas no `localStorage` do navegador. Use um valor por tela para não misturar as visões de
     * pivots diferentes. Padrão: o `id` do componente.
     */
    storageKey?: string
}

/**
 * Visão salva pelo usuário: layout, formatação condicional e expansão das linhas.
 */
export interface TablePivotView {
    name: string
    layout: TablePivotLayout
    conditionalFormatting: TablePivotConditionalRule[]
    expanded: boolean
    /** Data em que a visão foi salva (ISO). */
    savedAt: string
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
     * Copia a tabela exibida (cabeçalhos, totais e formatação) para a área de transferência, pronta para colar no Excel.
     */
    copy: () => Promise<void>

    /**
     * Baixa a tabela exibida em Excel (.xlsx), com cabeçalhos mesclados, totais e formatação condicional.
     */
    exportXlsx: () => void

    /**
     * Acesso avançado ao `<perspective-viewer>` (disponível depois do carregamento do motor).
     */
    viewer: HTMLPerspectiveViewerElement | null

    /**
     * Acesso avançado à tabela do Perspective.
     */
    table: Table | null
}

/** Comparação aplicada ao valor numérico da célula. */
export type TablePivotConditionalOperator = "lt" | "lte" | "gt" | "gte" | "eq" | "neq" | "between" | "notBetween";

/** Estilo das células que atendem à condição. Propriedades omitidas preservam o tema. */
export interface TablePivotConditionalStyle {
    /** Cor do texto, em formato CSS. */
    color?: string
    /** Cor de fundo, em formato CSS. */
    backgroundColor?: string
    /** Aplica negrito; false usa peso normal. */
    bold?: boolean
    /** Aplica itálico; false usa texto normal. */
    italic?: boolean
    /** Sublinha o texto; false remove o sublinhado. */
    underline?: boolean
}

/** Regra de formatação dos valores numéricos exibidos na grade. */
export interface TablePivotConditionalRule {
    /** Campo de valores. Omitido significa todos os valores. */
    field?: string
    /** Comparação aplicada à célula. */
    operator: TablePivotConditionalOperator
    /** Valor de comparação ou início do intervalo. */
    value: number
    /** Fim do intervalo, obrigatório para between e notBetween (limites inclusivos). */
    valueTo?: number
    /** Inclui os totais gerais de linhas e colunas. Padrão: true. */
    includeTotals?: boolean
    /** Estilo aplicado quando a condição é atendida. */
    style: TablePivotConditionalStyle
}
