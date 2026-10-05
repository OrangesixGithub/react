/**
 * Retorna os tipos do arquivo <b>helper.ts</b>
 *
 * @module utils
 * @author Luiz Fernando Bernardes de Paula
 */
export interface IUtilsHelperResponse {

    /**
     * Endereço retornado pelo `getCep`.
     */
    cep: IUtilsHelperCep

    /**
     * @deprecated Use `IUtilsHelperResponse["cep"]`.
     */
    gep_cep: IUtilsHelperCep
}

export interface IUtilsHelperCep {
    bairro: string
    cep: string
    complemento: string
    localidade: string
    logradouro: string
    uf: string
}
