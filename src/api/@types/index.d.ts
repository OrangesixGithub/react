import { CSSProperties } from "react";

/**
 * Define as tipagens `default` de todos os componentes do pacote
 */
export interface ApiComponentProps {

    /**
     * Propriedade para identificar o id do elemento
     */
    id?: string

    /**
     * Adiciona no atributo `class` do componente o valor atribuido nessa propriedade
     */
    className?: string

    /**
     * Define o tamanho da box do componente de acordo com o valores abaixo
     */
    size?: "5" | "10" | "12-5" | "15" | "17-5" | "20" | "22-5" | "25" | "30" | "33" | "35" | "40" | "45" | "50" | "55" | "60" | "65" | "70" | "75" | "80" | "85" | "90" | "95" | "100"

    /**
     * Define as propriedades css do component `style`
     */
    css?: CSSProperties
}

export * from "./css";
export * from "./field";