import type { ApiComponentProps } from "../../api";

/** Propriedades públicas do visualizador de PDF. */
export interface PDFProps extends ApiComponentProps {
    /** URL, caminho ou data URI do arquivo PDF a ser exibido. */
    file: string

    /** Exibe todas as páginas (`total`, padrão) ou uma página por vez (`pagination`). */
    mode?: "total" | "pagination"

    /**
     * Destino da barra de paginação. Padrão: `self` (sticky dentro do PDF).
     * Um elemento ou callback usa um portal fixo no viewport do documento de destino.
     * Callback que retorna `null` usa o body local. Uma janela ancestral exige mesma origem
     * e o CSS da biblioteca também importado nela. O documento PDF permanece no local original.
     */
    appendTo?: HTMLElement | "self" | (() => HTMLElement | null)
}
