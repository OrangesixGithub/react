import { Ref } from "react";
import { ApiComponentProps, ColorProps } from "../../api";

export interface ButtonProps extends Omit<ApiComponentProps, "size"> {
    /**
     * Define o objeto de referência do botão
     */
    ref?: Ref<any>

    /**
     * Define o tipo do botão
     */
    type?: "submit" | "reset" | "button";

    /**
     * Define o legenda do botão
     */
    label?: string

    /**
     * Desabilita a ação no botão
     */
    disabled?: boolean

    /**
     * Define o tamanho do botão
     */
    size?: "small" | "large";

    /**
     * Define o conteúdo do badge dentro do botão
     */
    badge?: string

    /**
     * Define a classe de estilização do badge de do botão
     */
    badgeClassName?: string

    /**
     * Define se o botão vai ser do tipo link
     */
    isLink?: boolean

    /**
     * Define se botão está estado de loading
     */
    isLoading?: boolean

    /**
     * Define o prefixo dos icones do pacote
     */
    iconPrefix?: "bi bi-" | "pi pi-"

    /**
     * Define o icone que vai ser utilizando no botão
     */
    icon?: string

    /**
     * Define a posição do icone dentro do botão
     */
    iconPos?: "top" | "bottom" | "left" | "right";

    /**
     * Define a cor do botão
     */
    color?: ColorProps

    /**
     * Evento de click dentro do botão
     */
    onClick?: () => void
}