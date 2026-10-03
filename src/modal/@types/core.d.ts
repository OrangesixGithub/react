import type React from "react";
import type { ModalTransition } from "./transition";
import type { DialogProps } from "primereact/dialog";

export interface ModalProps extends Pick<DialogProps, "maximizable" | "maximized" | "draggable" | "closable" | "position"> {
    /** Exibe o botão de maximizar a janela. Padrão: `false`. */
    maximizable?: boolean;

    /** Define se a janela começa maximizada. Padrão: `false`. */
    maximized?: boolean;

    /** Permite fechar pelo botão e pela tecla Escape. Padrão: `true`. */
    closable?: boolean;

    /** Posição da janela no viewport. Padrão: `center`. */
    position?: DialogProps["position"];

    /** Permite arrastar pelo cabeçalho no documento de destino. Padrão: `false`. */
    draggable?: boolean;

    /** Animação de abertura e fechamento. Padrão: `zoom`. */
    transition?: ModalTransition;

    /** Destino do diálogo. Padrão: `self`; aceita elemento, função ou `null` (body). */
    appendTo?: DialogProps["appendTo"]

    /**
     * Conteúdo que será exibido dentro da modal
     */
    children: React.ReactNode;

    /**
     * Define a classe de personalização da modal
     */
    className?: string

    /**
     * Define o state da modal aberta ou fechada
     */
    visible: boolean;

    /**
     * Define se vai ser exibido o fundo da modal
     */
    background?: boolean;

    /**
     * Mantém a modal aberta ao clicar no fundo quando `true`. Padrão: `false`.
     */
    backdrop?: boolean

    /**
     * Define o cabeçalho da modal
     */
    header?: React.ReactNode | string | false;

    /**
     * Define o rodapé da modal
     */
    footer?: React.ReactNode | string;

    /**
     * Define o tamanho da modal
     */
    sizes?: "small" | "medium" | "large" | "extra-large";

    /**
     * Define o icone do campo
     */
    icon?: string

    /**
     * Define o prefixo dos icones do pacote
     */
    iconPrefix?: "bi bi-" | "pi pi-"

    /**
     * Define a propriedade css `zindex` da modal
     */
    zIndex?: number;

    /**
     * Metodo responsável por atualizar state do modal
     */
    onVisible(value: boolean): void;
}
