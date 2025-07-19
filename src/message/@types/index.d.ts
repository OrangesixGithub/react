/**
 * Define o tipo de message
 */
export type MessageModeProps = "modal";

/**
 * Define as propriedades padrão do component
 */
interface MessageBaseProps {

    /**
     * Determina se messagem está visivel
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
     * Define o label do botão de cancelar
     */
    cancelarLabel?: string

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
     * Define se modal de messagem vai ter botão de fechar
     */
    modalClosable?: boolean
}

/**
 * Define a propriedade para ser exportada
 */
export type MessageProps<T extends MessageModeProps> = T extends "modal"
    ? MessageBaseProps & MessageModalProps
    : MessageBaseProps;
