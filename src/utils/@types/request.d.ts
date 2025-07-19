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
}