import React from "react";
import { DialogProps } from "primereact/dialog";

export interface ModalProps extends Pick<DialogProps, "maximizable" | "maximized" | "draggable" | "closable" | "position"> {
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
     * Define se a modal vai ser fechada clicando no fundo
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
