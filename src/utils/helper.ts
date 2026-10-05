import { message } from "./message";
import * as Document from "./core/document";
import { IUtilsHelperResponse } from ".";

/**
 * Realiza a pesquisa do content das tag meta na HEAD da DOM
 * <meta id="???" name="???" content="your-url">
 */
export function getMetaContent(id: string): string | null {
    return Document.getMetaContentDocument(id);
}

/**
 * Realiza a pesquisa do CEP na API pública "https://viacep.com.br/ws/"
 *
 * Usa `fetch`, e não o axios global, para não enviar os headers padrão do projeto (ex.: CSRF) a terceiros.
 * CEP inválido, não encontrado ou falha de rede retornam o objeto vazio.
 */
export async function getCep(value: string): Promise<IUtilsHelperResponse["cep"]> {
    const empty: IUtilsHelperResponse["cep"] = {
        cep: "",
        logradouro: "",
        complemento: "",
        bairro: "",
        localidade: "",
        uf: ""
    };

    const cep = (value ?? "").replace(/\D/g, "");
    if (cep.length !== 8) {
        return empty;
    }

    try {
        const response = await fetch("https://viacep.com.br/ws/" + cep + "/json/");
        if (!response.ok) {
            return empty;
        }
        const data = await response.json();
        return data?.erro ? empty : { ...empty, ...data };
    } catch {
        return empty;
    }
}

/**
 * Realiza a pesquisa do elemento na árvore DOM
 *
 * Busca no documento atual e, dentro de um iframe, também na janela pai; depois de `preloadTimeOut`,
 * tenta dentro dos iframes. Com `all`, retorna um array com todos os elementos encontrados.
 */
export async function getElementDOM<T>(
    element: string = "body",
    preloadTimeOut: number = 300,
    all: boolean = false
): Promise<T | null> {
    return await Document.findElementDocument(element, preloadTimeOut, all) as T | null;
}

/**
 * Remove o listener registrado por `windowMessageEvent`, quando houver.
 */
let removeMessageListener: (() => void) | null = null;

/**
 * Permite à comunicação de origem cruzada entre objetos do Windows.<br>
 * Exemplo: Comunicação entre iframe e corpo principal
 *
 * Aceita somente mensagens da mesma origem e registra um único listener, mesmo se chamada várias vezes.
 * Retorna a função que remove o listener.
 */
export function windowMessageEvent(): () => void {
    if (removeMessageListener) {
        return removeMessageListener;
    }

    const listener = (event: MessageEvent) => {
        if (event.origin === window.location.origin && event.data?.type === "message") {
            message<any>({ ...event.data.params });
        }
    };
    window.addEventListener("message", listener);

    removeMessageListener = () => {
        window.removeEventListener("message", listener);
        removeMessageListener = null;
    };
    return removeMessageListener;
}
