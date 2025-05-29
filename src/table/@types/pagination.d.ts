export interface TablePaginationProps {

    /**
     * Define se tabela vai utilizar paginação de resultado
     */
    paginator?: boolean

    /**
     * Define o numero de elemento por página
     */
    paginatorRow?: 5 | 10 | 15 | 20 | 25 | 50 | 100

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