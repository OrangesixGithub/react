import type { DialogProps } from "primereact/dialog";
import type { ModalTransition } from "../../modal/@types";

/**
 * Define o tipo de message
 */
export type MessageModeProps = "modal";

/**
 * Define as propriedades padrão do component
 */
interface MessageBaseProps {

    /**
     * Determina se mensagem está visivel
     */
    visible: boolean

    /**
     * Define o conteúdo da message
     */
    message: string

    /**
     * Define se componente está no estado de carregando
     */
    isLoading?: boolean

    /**
     * Define o titulo da message
     */
    title?: string

    /**
     * Define se vai ter a opção de confirmação
     */
    confirm?: boolean

    /**
     * Define se vai ter a opção de cancelar
     */
    cancel?: boolean

    /**
     * Define o label do botão de confirmação
     */
    confirmLabel?: string

    /**
     * Nome do ícone do botão de confirmação, sem o prefixo `bi bi-`. Sem ícone por padrão.
     */
    confirmIcon?: string

    /**
     * Define o label do botão de cancelar
     */
    cancelarLabel?: string

    /**
     * Nome do ícone do botão de cancelar, sem o prefixo `bi bi-`. Sem ícone por padrão.
     */
    cancelIcon?: string

    /**
     * Define o metodo de confirmação
     */
    onConfirm?: () => void

    /**
     * Define o metodo no cancelamento
     */
    onCancel?: () => void

    /**
     * Metodo responsável por atualizar state do message
     */
    onVisible(value: boolean): void;
}

/**
 * Define as propriedades do component do tipo MODAL
 */
interface MessageModalProps {
    /** Animação de abertura e fechamento. Padrão: `zoom`. */
    transition?: ModalTransition;

    /** Permite arrastar a modal pelo cabeçalho no documento de destino. Padrão: `true`. */
    draggable?: boolean

    /**
     * Destino de renderização da modal: `self`, elemento HTML ou função que retorna o elemento.
     * O padrão é `self`; `null` usa o destino padrão do PrimeReact (body).
     * Ao usar um portal, o destino deve receber o tema e o CSS da biblioteca.
     */
    appendTo?: DialogProps["appendTo"]

    /**
     * Define o icone do campo
     */
    modalIcon?: string

    /**
     * Define o prefixo dos icones do pacote
     */
    modalIconPrefix?: "bi bi-" | "pi pi-"

    /**
     * Define o posicionamento das opções da message
     */
    modalOptionsPosition?: "center" | "start" | "end"

    /**
     * Define se modal de mensagem vai ter botão de fechar
     */
    modalClosable?: boolean

    /**
     * Define o zindex da modal de message
     */
    modalZIndex?: number
}

/**
 * Define a propriedade para ser exportada
 */
export type MessageProps<T extends MessageModeProps = "modal"> = T extends "modal"
    ? MessageBaseProps & MessageModalProps
    : MessageBaseProps;
