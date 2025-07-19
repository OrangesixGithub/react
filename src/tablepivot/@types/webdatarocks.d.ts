export interface Slice {
    /**
     * Define a estrutura inicial da coluna
     */
    columns?: Hierarchy[];

    /**
     * Define a estrutura inicial do linha
     */
    rows?: Hierarchy[];

    /**
     * Define as medidas para ser selecionadas para exibição dos dados
     */
    measures?: Measure[];

    /**
     * Define as opções de expanção dos dados
     */
    expands?: { expandAll?: boolean };
}

export interface Hierarchy {
    /**
     * Nome de indentificação do objeto de dados
     */
    uniqueName?: string;

    /**
     * Legenda que irá aparecer no grid
     */
    caption?: string;

    /**
     * Define a ordenação dos dados
     */
    sort?: "asc" | "desc" | "unsorted";
}

export interface Measure {
    /**
     * Nome de indentificação do objeto de dados
     */
    uniqueName?: string;

    /**
     * Define se a regra está ativa
     */
    active?: boolean;

    /**
     * Define o operador da regra de dados
     */
    aggregation?: string;

    /**
     * Define quais operador e permitido para esta regra
     */
    availableAggregations?: string[];

    /**
     * Legendo do agregador de dados
     */
    caption?: string;

    /**
     * Define a legenda da coluna total
     */
    grandTotalCaption?: string;
}

export interface Options {
    /**
     * Define as propriedades de personalização do grid
     */
    grid?: OptionsGrid;

    /**
     * Define se vai ser exibido o botão de configuação dos campos
     */
    configuratorButton?: boolean;

    /**
     * Exibe as opções de agregação nas opções do campo
     */
    showAggregations?: boolean;

    /**
     * Exibe o botão de calculo nas opções do campo
     */
    showCalculatedValuesButton?: boolean;

    /**
     * Define se os dados serão carregados automaticamento pelo pivot
     */
    showDefaultSlice?: boolean;
}

export interface OptionsGrid {
    /**
     * Define se vai ser exibido o filtro dos dados
     */
    showFilter?: boolean,

    /**
     * Define se vai ser exibido a linha de total dos dados
     */
    showGrandTotals?: string | boolean,

    /**
     * Define se vai ser exibido o indicador das coluna e linhas do grid
     */
    showHeaders?: boolean,

    /**
     * Especifica como as hierarquias multinível são mostradas na grade: com o ícone à esquerda
     */
    showHierarchies?: boolean,

    /**
     * Define se vai ser exibido o texto da hierarquias no grid de dados
     */
    showHierarchyCaptions?: boolean,

    /**
     * Define o titulo do grid
     */
    title?: string,

    /**
     * Define o estilo do grid
     */
    type?: "classic" | "flat" | "compact"
}

export interface Ref {

    /**
     * Realiza atualização dos dados do Pivot Table
     * @param dataSource - Dados
     */
    updateData(dataSource: {
        data: object[]
    }): void

    /**
     * Realiza atualização dos dados e configuração do Pivot Table
     * @param report - Objeto com dados e configuração
     * @overview - Observação quando utilizar este metodo as configurações do Pivot Table será redefinidas
     */
    setReport(report: {
        slice?: Slice;
        options?: Options;
        dataSource?: { data: any }
    }): void

    /**
     * Expande todos os nós do pivot Table
     */
    expandAllData(): void

    /**
     * Recolhe todos os nós do Pivot Table
     */
    collapseAllData(): void
}
