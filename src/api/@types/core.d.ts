import type { SizeProps } from "./size";
import type { CSSProperties } from "react";

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
     * Define a largura percentual do componente, fixa ou por breakpoint. Padrão: `100`.
     */
    size?: SizeProps

    /**
     * Define as propriedades css do component `style`
     */
    css?: CSSProperties
}
