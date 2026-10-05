/**
 * Core - Funções internas de manipulação do DOM usadas pelo `utils`.
 * Não são exportadas pelo `index.ts` do pacote.
 */

/**
 * Documento onde a busca começa: o atual ou, dentro de um iframe, o da janela pai.
 */
export function rootDocument(): Document {
    try {
        if (window.self !== window.top && window.frameElement) {
            return window.frameElement.ownerDocument;
        }
    } catch {
        // janela pai de outra origem: usa o documento atual
    }
    return document;
}

/**
 * Lê o `content` da tag `<meta id="...">` do documento, sem a barra final.
 * Fora do navegador (SSR, testes sem DOM) retorna `null`.
 */
export function getMetaContentDocument(
    id: string
): string | null {
    if (typeof document === "undefined") {
        return null;
    }
    const content = document.querySelector(`meta#${CSS.escape(id)}`)?.getAttribute("content");
    return content ? content.replace(/\/$/, "") : null;
}

/**
 * Localiza elementos pelo seletor CSS: no documento atual e, dentro de um iframe, também na janela pai.
 * Se não encontrar, tenta novamente dentro dos iframes após `preloadTimeOut` (comportamento da 2.x).
 * Com `all`, retorna todos os elementos encontrados; sem encontrar nada, retorna `null`.
 */
export function findElementDocument(
    selector: string,
    preloadTimeOut: number = 300,
    all: boolean = false
): Promise<Element | Element[] | null> {
    const pick = (elements: Element[]) => elements.length === 0 ? null : (all ? elements : elements[0]);

    return new Promise(resolve => {
        const root = rootDocument();
        if (selector === "body") {
            resolve(pick([root.body]));
            return;
        }

        const documents = root === document ? [document] : [document, root];
        const found = pick(documents.flatMap(item => Array.from(item.querySelectorAll(selector))));
        if (found) {
            resolve(found);
            return;
        }

        setTimeout(() => {
            const elements = Array.from(root.querySelectorAll("iframe")).flatMap(iframe => {
                try {
                    return Array.from(iframe.contentDocument?.querySelectorAll(selector) ?? []);
                } catch {
                    // iframe de outra origem: ignorado
                    return [];
                }
            });
            resolve(pick(elements));
        }, preloadTimeOut);
    });
}

/**
 * Localiza o formulário pelo id (mesma busca de `findElementDocument`).
 */
export async function findFormDocument(
    id: string,
    preloadTimeOut: number = 300
): Promise<HTMLElement | null> {
    return await findElementDocument(`#${CSS.escape(id)}`, preloadTimeOut) as HTMLElement | null;
}

/**
 * Redireciona somente para URLs `http:`/`https:` (inclusive caminhos relativos).
 * Bloqueia `javascript:`, `data:` e outros protocolos.
 */
export function redirectDocument(
    url: string
): boolean {
    try {
        const target = new URL(url, window.location.href);
        if (target.protocol !== "http:" && target.protocol !== "https:") {
            return false;
        }
        window.location.href = target.href;
        return true;
    } catch {
        return false;
    }
}

/**
 * Retorna o cabeçalho da aba que contém o elemento, quando a aba não está selecionada.
 */
export function findTabDocument(
    form: HTMLElement,
    element: Element
): HTMLElement | null {
    const headerId = element.closest("[role='tabpanel']")?.getAttribute("aria-labelledby");
    if (!headerId) {
        return null;
    }
    const header = form.querySelector<HTMLElement>(`#${CSS.escape(headerId)}`);
    if (!header || header.getAttribute("aria-selected") === "true") {
        return null;
    }
    return header;
}

/**
 * Escreve as mensagens como texto, uma por linha.
 */
export function setLinesDocument(
    element: HTMLElement,
    lines: string[]
): void {
    element.replaceChildren(...lines.flatMap(line => [document.createTextNode(String(line)), document.createElement("br")]));
}

/**
 * Adiciona as classes (separadas por espaço) ao elemento.
 */
export function addClassesDocument(
    element: Element,
    classes?: string
): void {
    const list = classes?.split(/\s+/).filter(Boolean) ?? [];
    element.classList.add(...list);
}

/**
 * Remove as classes (separadas por espaço) do elemento.
 */
export function removeClassesDocument(
    element: Element,
    classes?: string
): void {
    const list = classes?.split(/\s+/).filter(Boolean) ?? [];
    element.classList.remove(...list);
}

/**
 * Desabilita ou reabilita os campos `[name]` do formulário.
 * Só reabilita o que foi desabilitado aqui, para não desfazer um `disabled` definido pelo componente.
 */
export function disabledFieldDocument(
    form: HTMLElement,
    name: string,
    disabled: boolean
): void {
    const mark = "data-os-disabled";
    form.querySelectorAll<HTMLInputElement>(`[name="${CSS.escape(name)}"]`).forEach(field => {
        if (disabled && !field.disabled) {
            field.disabled = true;
            field.setAttribute(mark, "");
        } else if (!disabled && field.hasAttribute(mark)) {
            field.disabled = false;
            field.removeAttribute(mark);
        }
    });
}
