import $ from "jquery";
import axios from "axios";
import { message } from "./message";
import { IUtilsHelperResponse } from ".";

/**
 * Realiza a pesquisa do content das tag meta na HEAD da DOM
 * <meta id="???" name="???" content="your-url">
 */
export function getMetaContent(id: string): string | null {
    const element = document.querySelector(`meta#${id}`);
    if (!element) {
        return null;
    }

    const content = element.getAttribute("content");
    if (!content) {
        return null;
    }

    return content.replace(/\/$/, "");
}

/**
 * Realiza a pesquisa do CEP na API pública "https://viacep.com.br/ws/"
 */
export async function getCep(value: string): Promise<IUtilsHelperResponse["gep_cep"]> {
    let cep = value.length === 0 ? "00000000" : value.replace("-", "");
    try {
        return await axios.get<IUtilsHelperResponse["gep_cep"]>("https://viacep.com.br/ws/" + cep + "/json/")
            .then(data => data.data);
    } catch (error) {
        return new Promise((resolve) => {
            resolve({
                cep: "",
                logradouro: "",
                complemento: "",
                bairro: "",
                localidade: "",
                uf: ""
            });
        });
    }
}

/**
 * Realiza a pesquisa do elemento na árvore DOM
 */
export async function getElementDOM<T>(
    element: string = "body",
    preloadTimeOut: number = 300,
    all: boolean = false
): Promise<T | null> {
    return new Promise((resolve) => {
        // @ts-ignore
        let body = window.self === window.top ? $("body") : $(window.frameElement).parents("body");
        if (element === "body") {
            resolve(all ? body : body[0]);
        }

        let elementFind = body.find(element);
        if (elementFind.length > 0) {
            resolve(all ? elementFind : elementFind[0]);
        } else {
            setTimeout(() => {
                let iframe = body.find("iframe").contents();
                if (iframe.length === 0) {
                    resolve(null);
                }
                elementFind = iframe.find(element);
                if (elementFind.length > 0) {
                    resolve(all ? elementFind : elementFind[0]);
                }
                resolve(null);
            }, preloadTimeOut);
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