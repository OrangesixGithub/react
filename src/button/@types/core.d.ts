import type { Ref, MouseEventHandler } from "react";
import type { ApiComponentProps, ColorProps } from "../../api";

/** Propriedades públicas do componente Button. */
export interface ButtonProps extends Omit<ApiComponentProps, "size"> {
    /** Referência para o botão HTML. */
    ref?: Ref<any>;

    /** Tipo do botão HTML. O padrão é `button`. */
    type?: "submit" | "reset" | "button";

    /** Texto exibido no botão. */
    label?: string;

    /** Desabilita a ação do botão. */
    disabled?: boolean;

    /** Tamanho do botão. */
    size?: "small" | "large";

    /** Texto do indicador exibido junto ao conteúdo. */
    badge?: string;

    /** Classes adicionais do indicador. */
    badgeClassName?: string;

    /** Exibe o botão com aparência de link. */
    isLink?: boolean;

    /** Exibe o indicador de carregamento e impede novos cliques. */
    isLoading?: boolean;

    /**
     * Prefixo de classes do ícone. O padrão é `pi pi-`.
     * @deprecated `bi bi-` permanece aceito para compatibilidade; prefira `pi pi-`.
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
