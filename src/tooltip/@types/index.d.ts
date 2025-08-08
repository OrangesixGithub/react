import { CSSProperties } from "react";

export interface TooltipProps {
    /**
     *  A propriedade `children` representa o conteúdo ou elementos filho que serão
     *  renderizados dentro deste componente. Pode incluir texto, elementos React,
     *  ou até mesmo outros componentes.
     */
    children: any

    /**
     * Desabilita a entrada de dados no campo
     */
    disabled?: boolean

    /**
     * Define as propriedades css do component `style`
     */
    css?: CSSProperties

    /**
     * Adiciona no atributo `class` do componente o valor atribuido nessa propriedade
     */
    className?: string

    /**
     * Define o conteúdo do tooltip
     */
    content: React.ReactNode | string

    /**
     * Define a posição do tooltip
     */
    position?: "top" | "bottom" | "left" | "right" | "mouse"

    /**
     * Escolhe o lugar que será renderizado o tooltip
     */
    renderTo?: "self" | HTMLElement | null | undefined | (() => HTMLElement)

    /**
     * Define o zIndex personalizado do tooltip
     */
    zIndex?: number

    /**
     * Define qual evento será utilizado para ativar tooltip
     */
    event?: "both" | "focus" | "hover"

    /**
     * Define evento de ao exibir tooltip
     */
    onShow?: () => void

    /**
     * Define evento de ao esconders tooltip
     */
    onHide?: () => void
}