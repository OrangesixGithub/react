import axios from "axios";
import { BASE, TOKEN } from "./const";
import { messageFieldClear, response } from "./response";
import { IUtilsRequestPostOptions, IUtilsResponseType } from ".";

/**
 * Simplifica a solicitação POST HTTP usando a biblioteca axios
 */
export function post<TypeDataResponse = IUtilsResponseType<any>>(
    route: string,
    body: any,
    form?: string,
    options?: IUtilsRequestPostOptions
): Promise<TypeDataResponse> {
    return new Promise((resolve, reject) => {
        let url = BASE + (route.startsWith("/") ? "" : "/") + route;
        messageFieldClear(form);
        handleToManyRequest(options?.url ?? url, options?.blockedToManyRequest ?? false);
        axios<TypeDataResponse>({
            method: "post",
            url: options?.url ?? url,
            headers: { "X-CSRF-TOKEN": TOKEN },
            data: !body ? {} : body,
        }).then(data => {
            if (data?.data !== undefined) {
                resolve(data.data);
            }
            if (typeof options?.blockedResponse !== "boolean" || options?.blockedResponse === false) {
                response<TypeDataResponse>((data?.data as IUtilsResponseType<TypeDataResponse>), form);
            }
        }).catch(error => {
            response<TypeDataResponse>(error.response?.data, form);
            reject(error);
        });
    });
}

/**
 * Bloqueia várias solicitações simultâneas
 */
function handleToManyRequest(url: string, blocked: boolean): void {
    let requestCount = 0;
    axios.interceptors.request.use(config => {
        requestCount = requestCount + 1;
        if (requestCount > 1 && axios.getUri(config) === url && blocked) {
            return Promise.reject(new Error("Requisições bloqueadas!"));
        }
        return config;
    });
    if (!blocked) {
        axios.interceptors.request.clear();
    }

    axios.interceptors.response.use(response => {
        requestCount = requestCount - 1;
        return response;
    }, function (error) {
        requestCount = requestCount - 1;
        return Promise.reject(error);
    });
}