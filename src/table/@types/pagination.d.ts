export interface TablePaginationProps {

    /**
     * Define se tabela vai utilizar paginação de resultado
     */
    paginator?: boolean

    /**
     * Define o numero de elemento por página
     */
    paginatorRow?: number

    /**
     * Quantidades disponíveis no seletor de registros por página.
     * @default [5, 10, 15, 20, 25, 50, 100]
     */
    rowsPerPageOptions?: number[]

    /**
     * Define o alinhamento da paginação
     */
    paginatorAlign?: "end" | "center" | "start"

    /**
     * Define o texto da quantidade de registro na paginação
     */
    paginatorTotalElementsLabel?: string

    /**
     * Método para realizar paginação manual
     */
    onPaginator?(number: number, elements: number): void
}
