export interface TableGroupProps {
    /**
     * Define a representação do objeto de agrupamento
     */
    rowGroup?: string

    /**
     * Define o agrupamento: subheader cria cabeçalhos; rowgroup é o alias legado de rowspan
     */
    rowGroupMode?: "subheader" | "rowgroup" | "rowspan"

    /**
     * Define o template do agrupamento - Header
     */
    rowGroupHeaderTemplate?: any

    /**
     * Define o template do agrupamento - Footer
     */
    rowGroupFooterTemplate?: any
}
