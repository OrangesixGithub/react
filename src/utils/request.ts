import axios from "axios";
import { getMetaContentDocument } from "./core/document";
import { messageFieldClear, response } from "./response";
import { IUtilsRequestPostOptions, IUtilsResponseType } from ".";

/**
 * Requisições em andamento por URL, usadas pelo `blockedToManyRequest`.
 */
const pending = new Map<string, number>();

/**
 * Simplifica a solicitação POST HTTP usando a biblioteca axios
 */
export async function post<TypeDataResponse = IUtilsResponseType<any>>(
    route: string,
    body: any,
    form?: string,
    options?: IUtilsRequestPostOptions
): Promise<TypeDataResponse> {
    const base = getMetaContentDocument("react-base") ?? "";
    const token = getMetaContentDocument("csrf-token");
    const url = options?.url ?? base + (route.startsWith("/") ? "" : "/") + route;

    messageFieldClear(form);
    if (options?.blockedToManyRequest && (pending.get(url) ?? 0) > 0) {
        throw new Error("Requisições bloqueadas!");
    }

    pending.set(url, (pending.get(url) ?? 0) + 1);
    let data: TypeDataResponse;
    try {
        const result = await axios<TypeDataResponse>({
            method: "post",
            url,
            headers: token ? { "X-CSRF-TOKEN": token } : undefined,
            data: !body ? {} : body,
        });
        data = result.data;
    } catch (error: any) {
        response<TypeDataResponse>(error?.response?.data, form, options?.messageLibrary);
        throw error;
    } finally {
        const count = (pending.get(url) ?? 1) - 1;
        if (count > 0) {
            pending.set(url, count);
        } else {
            pending.delete(url);
        }
    }

    if (options?.blockedResponse !== true) {
        try {
            response<TypeDataResponse>((data as IUtilsResponseType<TypeDataResponse>), form, options?.messageLibrary);
        } catch (error) {
            // Na 2.x a promise já estava resolvida neste ponto: uma falha aqui não rejeita o post
            console.error(error);
        }
    }
    return data;
}
