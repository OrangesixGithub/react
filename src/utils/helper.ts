import $ from "jquery";
import axios from "axios";
import { message } from "./message";
import { IUtilsHelperResponse } from ".";

/**
 * Realiza a pesquisa do elemento html na DOM<br>
 * <meta id="???" name="???" content="your-url">
 */
export function getMetaContent(id: string): string | null {
    let element: any = document.getElementById(id);
    let url: null | string = element === null ? null : (element.content).replace(".br/", ".br");
    return url === null ? null : url.substr(-1) === "/" ? url.slice(0, url.length - 1) : url;
}

/**
 * Realiza a pesquisa do CEP na API pública "https://viacep.com.br/ws/"
 */
export async function getCep(value: string): Promise<IUtilsHelperResponse["gep_cep"]> {
    let cep = value.length === 0 ? "00000000" : value.replace("-", "");
    return await axios.get<IUtilsHelperResponse["gep_cep"]>("https://viacep.com.br/ws/" + cep + "/json/")
        .then(data => data.data);
}

/**
 * Realiza a pesquisa do elemento na árvore DOM
 */
export function getElementDOM(element?: string, preloadTimeOut?: number): Promise<null | JQuery<HTMLElement>> {
    return new Promise((resolve) => {
        // @ts-ignore
        let body = window.self === window.top ? $("body") : $(window.frameElement).parents("body");
        if (!element || element.length === 0) {
            resolve(body);
        }

        if (element === "#" || element === ".") {
            resolve(null);
        }

        let elementFound = body.find(element);
        if (elementFound.length > 0) {
            resolve(elementFound);
        } else {
            setTimeout(() => {
                let iframe = body.find("iframe").contents();
                if (iframe.length === 0) {
                    resolve(null);
                }
                elementFound = iframe.find(element);
                if (elementFound.length > 0) {
                    resolve(elementFound);
                }
                resolve(null);
            }, preloadTimeOut ?? 300);
        }
    });
}

/**
 * Permite à comunicação de origem cruzada entre objetos do Windows.<br>
 * Exemplo: Comunicação entre iframe e corpo principal
 */
export function windowMessageEvent(): void {
    window.addEventListener("message", function (event: MessageEvent) {
        if (event.data?.type === "message") {
            let data = event.data;
            message<any>({ ...data.params });
        }
    });
}