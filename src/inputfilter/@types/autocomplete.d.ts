export interface InputFilterAutocompleteProps {
    /**
     * Sugestões do autocomplete
     */
    data: Array<{ id: number, label: string }>

    /**
     * Realiza a pesquisa do autocomplete de acordo com query
     */
    onSearch(query: string, selected?: number[]): void

    /**
     * Define o número de elementos que poser ser selecionado no autocomplete
     */
    autocompleteSelectLimit?: number

    /**
     * Define a altura da caixa de seleção dos dados
     */
    autocompleteScrollHeight?: string
}