export interface TableGroupProps {
    /**
     * Define a representação do objeto de agrupamento
     */
    rowGroup?: string

    /**
     * Define o tipo de agrupamento da tabela
     */
    rowGroupMode?: "subheader" | "rowgroup"

    /**
     * Define o template do agrupamento - Header
     */
    rowGroupHeaderTemplate?: any

    /**
     * Define o template do agrupamento - Footer
     */
    rowGroupFooterTemplate?: any
}