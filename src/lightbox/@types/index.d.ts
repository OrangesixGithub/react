import { ApiComponentProps } from "../../api";

export interface LightboxProps extends ApiComponentProps {
    /**
     * Define o conteúdo html para ser exibido na lightbox
     */
    html: string

    /**
     * Define o className do container da lightbox
     */
    containerClassName?: string
}