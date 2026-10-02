/**
 * Prepara o HTML para uso na Lightbox.
 *
 * Converte cada `<img>` do conteúdo recebido em um link (`<a>`) com `data-lightbox`,
 * preservando links existentes e os atributos do conteúdo.
 *
 * @param html HTML de entrada (string) que será normalizado para a Lightbox.
 * @returns HTML resultante, com as imagens embrulhadas por `<a data-lightbox="gallery">...</a>`.
 */
export function handleLightbox(html: string, gallery = "gallery"): string {
    if (typeof document === "undefined") {
        return html;
    }
    const divTemp: HTMLDivElement = document.createElement("div");
    divTemp.innerHTML = html;

    const imgElements: HTMLCollectionOf<HTMLImageElement> = divTemp.getElementsByTagName("img");
    for (let i = 0; i < imgElements.length; i++) {
        const img: HTMLImageElement = imgElements[i];
        const imgSrc: string | null = img.getAttribute("src");

        if (!imgSrc) {
            continue;
        }
        const existingAnchor = img.closest("a");
        if (existingAnchor) {
            existingAnchor.setAttribute("data-lightbox", gallery);
            if (!existingAnchor.getAttribute("href")) {
                existingAnchor.setAttribute("href", imgSrc);
            }
            continue;
        }

        const anchor: HTMLAnchorElement = document.createElement("a");
        anchor.setAttribute("data-lightbox", gallery);
        anchor.setAttribute("aria-label", img.alt || "Ampliar imagem");
        const caption = img.getAttribute("title");
        if (caption) {
            anchor.setAttribute("data-title", caption);
        }
        anchor.href = imgSrc;

        if (img.parentNode) {
            img.parentNode.replaceChild(anchor, img);
        }
        anchor.appendChild(img);
    }

    return divTemp.innerHTML;
}
