import type { CSSProperties, ReactNode } from "react";
import type { TooltipTransition } from "./transition";

export interface TooltipProps {
    /** Animação de entrada e saída. Padrão: `zoom`. Respeita a preferência por movimento reduzido. */
    transition?: TooltipTransition

    /**
     *  A propriedade `children` representa o conteúdo ou elementos filho que serão
     *  renderizados dentro deste componente. Pode incluir texto, elementos React,
     *  ou até mesmo outros componentes.
     */
    children: ReactNode

    /**
     * Desabilita a exibição do tooltip
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
    content: ReactNode | string

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
     * Evento disparado ao esconder o tooltip
     */
    onHide?: () => void
}
