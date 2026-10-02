import type { ReactNode } from "react";
import type { AlignItemsProps, ApiComponentProps, ColorProps, JustifyContentProps } from "../../api";

/**
 * Define as propriedades do componente `Loading`
 */
export interface LoadingProps extends Omit<ApiComponentProps, "size" | "id"> {
    /**
     * Define se o loading vai se exibido
     */
    visible: boolean

    /**
     * Conteúdo personalizado exibido no centro do loading, no lugar do indicador padrão de `type`.
     * Aceita qualquer elemento React, como uma animação própria feita com `motion`.
     */
    children?: ReactNode

    /**
     * A propriedade `align` determina o alinhamento do conteúdo base na propriedade `direction`.
     * Essa propriedade ajusta os estilos CSS `align-items`, permitindo um controle preciso do layout.
     */
    align?: AlignItemsProps | AlignItemsProps[]

    /**
     * A propriedade `justify` determina o alinhamento do conteúdo base na propriedade `direction`.
     * Essa propriedade ajusta os estilos CSS `justify-content`, permitindo um controle preciso do layout.
     */
    justify?: JustifyContentProps | JustifyContentProps[]

    /**
     * Define a opacidade do fundo da box de carregamento
     */
    opacity?: string

    /**
     * Define o indicador padrão do loading: `border` (anel girando), `grow` (pontos pulsando),
     * `bars` (barras oscilando), `pulse` (círculo com onda) ou `orbit` (dois anéis em sentidos opostos).
     * É ignorado quando `children` é informado.
     */
    type?: "border" | "grow" | "bars" | "pulse" | "orbit"

    /**
     * Define a mensagem do load
     */
    text?: string

    /**
     * Define as cores padrão do component
     */
    color?: ColorProps

    /**
     * Personaliza a propriedade zindex do componente de loading
     */
    zindex?: number

    /**
     * Cobre toda a tela em vez de apenas o contêiner pai
     */
    fullscreen?: boolean
}
