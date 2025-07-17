import React from "react";
import { AlignItemsProps, ApiComponentProps, JustifyContentProps } from "../../api/@types/index";

export interface BoxProps extends ApiComponentProps {

    /**
     * A propriedade `direction` determina o valor do estilo CSS `flex-direction`,
     * definindo a direção em que os itens flexíveis são dispostos dentro de um contêiner flexível.
     */
    direction?: "row" | "column"

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
     *  A propriedade `children` representa o conteúdo ou elementos filho que serão
     *  renderizados dentro deste componente. Pode incluir texto, elementos React,
     *  ou até mesmo outros componentes.
     */
    children: React.ReactNode
}