/**
 * Retorna os tipos do arquivo <b>response.ts</b>
 *
 * @module utils
 * @author Luiz Fernando Bernardes de Paula
 */
export interface IUtilsResponseType<T> {
    data?: T | null
    accept?: any
    redirect?: string | null
    errors?: IUtilsResponseError
    field?: IUtilsResponseField | null
    message?: IUtilsResponseMessage | null
    modal?: IUtilsResponseModal | null
}

export interface IUtilsResponseError {
    [key: string]: string[];
}

/**
 * Retorno de validação de um campo específico.
 */
export interface IUtilsResponseField {

    /**
     * Nome (`name`) do campo no formulário.
     */
    field: string

    /**
     * `is-invalid` exibe como erro (vermelho); `is-valid`, como válido (verde).
     */
    messageType: "is-invalid" | "is-valid" | string

    /**
     * Mensagens por campo. Uma string é aplicada ao campo `field`.
     */
    message: IUtilsResponseError | string

    /**
     * true desabilita o campo; false reabilita o que foi desabilitado pelo response().
     */
    disabled?: boolean
}

export interface IUtilsResponseModal {
    modal: string,
    action: string
}

export interface IUtilsResponseMessage {
    type?: "success" | "warning" | "error" | "info"
    title?: string
    message?: string
    text?: string
    icon?: string
}
