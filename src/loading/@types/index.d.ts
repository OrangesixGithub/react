import { AlignItemsProps, ColorProps, ApiComponentProps, JustifyContentProps } from "../../api";

export interface LoadingProps extends Omit<ApiComponentProps, "size" | "id"> {
    /**
     * Define se o loading vai se exibido
     */
    visible: boolean

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
     * Define o tipo do loading
     */
    type?: "border" | "grow"

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
}