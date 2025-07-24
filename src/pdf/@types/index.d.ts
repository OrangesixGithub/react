import { ApiComponentProps } from "../../api";

export interface PDFProps extends ApiComponentProps {
    /**
     * Dados de entrado do arquivo pdf a ser exibido
     */
    file: string

    /**
     * Exibe as informações do pdf de forma total ou em paginação
     */
    mode?: "total" | "pagination"
}