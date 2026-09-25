import type { Ref, ReactNode, MouseEventHandler } from "react";
import type { ApiComponentProps, ColorProps } from "../../api";

/** Propriedades públicas do componente Button. */
export interface ButtonProps extends Omit<ApiComponentProps, "size"> {
    /** Referência para o botão HTML. */
    ref?: Ref<any>;

    /** Tipo do botão HTML. O padrão é `button`. */
    type?: "submit" | "reset" | "button";

    /** Texto exibido no botão. */
    label?: string;

    /** Conteúdo interno que substitui o rótulo, o ícone e o badge quando informado. */
    children?: ReactNode;

    /** Desabilita a ação do botão. */
    disabled?: boolean;

    /** Tamanho do botão. */
    size?: "small" | "large";

    /** Deixa o botão totalmente arredondado. */
    rounded?: boolean;

    /** Texto do indicador exibido junto ao conteúdo. */
    badge?: string;

    /** Classes adicionais do indicador. */
    badgeClassName?: string;

    /** Exibe o botão com aparência de link. */
    isLink?: boolean;

    /** Exibe o indicador de carregamento e impede novos cliques. */
    isLoading?: boolean;

    /**
     * Define se button vai está visível na tela
     */
    isVisible?: boolean;

    /**
     * Prefixo de classes do ícone. O padrão é `pi pi-`.
     * `bi bi-` permanece aceito para compatibilidade e exige que o consumidor importe o CSS do Bootstrap Icons.
     */
    iconPrefix?: "bi bi-" | "pi pi-";

    /** Nome do ícone, acrescentado ao prefixo. */
    icon?: string;

    /** Posição do ícone em relação ao rótulo. */
    iconPos?: "top" | "bottom" | "left" | "right";

    /** Cor semântica do botão. */
    color?: ColorProps;

    /** Evento de clique do botão. */
    onClick?: MouseEventHandler<HTMLButtonElement>;
}
