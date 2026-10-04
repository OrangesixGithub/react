import type React from "react";

export interface TableTemplateProps {
    /**
     * Conteúdo do cabeçalho personalizado.
     */
    templeteHeader?: React.ReactNode

    /**
     * Conteúdo do rodapé personalizado.
     */
    templateFooter?: React.ReactNode

    /**
     * Contéudo personalizado do lado esquerdo do elemento de `paginação`
     */
    templatePaginationLeft?: React.ReactNode

    /**
     * Contéudo personalizado do lado direiro do elemento de `paginação`
     */
    templatePaginationRight?: React.ReactNode
}
