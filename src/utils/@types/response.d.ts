/**
 * Retorna os tipos do arquivo <b>helper.ts</b>
 *
 * @module utils
 * @author Luiz Fernando Bernardes de Paula
 */
export interface IUtilsHelperResponse {
    gep_cep: {
        bairro: string
        cep: string
        complemento: string
        localidade: string
        logradouro: string
        uf: string
    }
}

/**
 * Retorna os tipos do arquivo <b>response.ts</b>
 *
 * @module utils
 * @author Luiz Fernando Bernardes de Paula
 */
export interface IUtilsResponseType<T> {
    data?: T
    accept?: any
    redirect?: string
    errors?: IUtilsResponseError
    field?: IUtilsResponseField
    message?: IUtilsResponseMessage
    modal?: IUtilsResponseModal
}

export interface IUtilsResponseError {
    [key: string]: string[];
}

export interface IUtilsResponseField {
    field: string
    messageType: string
    message: string
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
