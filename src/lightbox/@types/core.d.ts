import type { ApiComponentProps } from "../../api";

export interface LightboxProps extends ApiComponentProps {
    /**
     * Define o conteúdo html para ser exibido na lightbox
     */
    html: string

    /**
     * Define o className do container da lightbox
     */
    containerClassName?: string

    /**
     * Destino do overlay: elemento HTML, função que retorna o elemento ou "self" para o contêiner local.
     * Sem valor, usa o body da janela ancestral com host disponível, ou o body local.
     * Destinos em outra janela exigem mesma origem e initializeLightbox() nessa janela.
     */
    appendTo?: HTMLElement | "self" | (() => HTMLElement | null)
}
