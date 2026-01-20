/**
 * Prepara o HTML para uso na Lightbox.
 *
 * Converte cada `<img>` do conteúdo recebido em um link (`<a>`) com `data-lightbox`,
 * conforme as opções/atributos suportados pela Lightbox2:
 * https://lokeshdhakar.com/projects/lightbox2/#options
 *
 * @param html HTML de entrada (string) que será normalizado para a Lightbox.
 * @returns HTML resultante, com as imagens embrulhadas por `<a data-lightbox="gallery">...</a>`.
 */
export function handleLightbox(html: string): string {
    const divTemp: HTMLDivElement = document.createElement("div");
    divTemp.innerHTML = html;

    const imgElements: HTMLCollectionOf<HTMLImageElement> = divTemp.getElementsByTagName("img");
    for (let i = 0; i < imgElements.length; i++) {
        const img: HTMLImageElement = imgElements[i];
        const imgSrc: string | null = img.getAttribute("src");

        if (!imgSrc) continue;

        const anchor: HTMLAnchorElement = document.createElement("a");
        anchor.setAttribute("data-lightbox", "gallery");
        anchor.href = imgSrc;

        if (img.parentNode) {
            img.parentNode.replaceChild(anchor, img);
        }
        anchor.appendChild(img);
    }

    return divTemp.innerHTML;
}