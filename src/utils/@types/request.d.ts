import type { IUtilsMessageOptions } from "./message";

/**
 * Retorna os tipos do arquivo <b>request.ts</b>
 *
 * @module utils
 * @author Luiz Fernando Bernardes de Paula
 */
export interface IUtilsRequestPostOptions {

    /**
     * Blocks multiple simultaneous requests
     */
    blockedToManyRequest?: boolean

    /**
     * Blocks the execution of the response method upon return from the post.
     */
    blockedResponse?: boolean

    /**
     * Replace the BASE url with the absolute url provided
     */
    url?: string

    /**
     * Biblioteca da mensagem (`message`) da resposta: "snackbar" (padrão) ou "sweetAlert" (toast no canto).
     */
    messageLibrary?: keyof IUtilsMessageOptions
}