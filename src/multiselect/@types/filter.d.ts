/** Configuração pública do filtro do MultiSelect. */
export interface MultiSelectFilterProps {
    /** Texto exibido no campo de busca. */
    placeholder?: string;
    /** Foca a busca ao abrir o painel; o padrão é false. */
    autoFocus?: boolean;
    /** Regra utilizada para comparar os textos; o padrão é contains. */
    modeFilter?: "endsWith" | "startsWith" | "contains" | "equals" | "notEquals";
    /** Intervalo em milissegundos antes de aplicar a busca. */
    delay?: number;
    /** Limpa o filtro ao fechar o painel. */
    reset?: boolean;
    /** Recebe o texto pesquisado. */
    onFilter?: (search: string) => void;
}
