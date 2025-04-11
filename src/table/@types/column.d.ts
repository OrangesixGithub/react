import React, { CSSProperties } from "react";
import { ColumnBodyOptions, ColumnEditorOptions, ColumnEvent, ColumnHeaderOptions } from "primereact/column";

export interface TableColumnProps {

    /**
     * Propriedade de dados de uma linha.
     */
    id: string

    /**
     * Conteúdo do cabeçalho da tabela.
     */
    header: React.ReactNode | ((options: ColumnHeaderOptions) => React.ReactNode)

    /**
     * Alinha o conteúdo da coluna, os valores válidos são à esquerda, à direita e ao centro.
     */
    align?: null | "center" | "left" | "right"

    /**
     * Alinha o header da coluna, os valores válidos são à esquerda, à direita e ao centro.
     */
    alignHeader?: null | "center" | "left" | "right"

    /**
     * Classe de estilo do componente.
     */
    className?: string

    /**
     * Define se o campo vai ser ordernado
     */
    sort?: boolean

    /**
     * Conteúdo do corpo da coluna.
     */
    body?: (data: any, options: ColumnBodyOptions) => React.ReactNode

    /**
     * Define as propriedades `css` para cada coluna
     */
    style?: CSSProperties

    /**
     * Define se coluna vai ser congelada e qual posição
     */
    frozen?: boolean

    /**
     * Define o elemento de edição dentro de cada coluna
     */
    editor?: (options: ColumnEditorOptions) => React.ReactNode

    /**
     * Retorno de chamada a ser executado quando o editor for enviado.
     */
    onEditorComplete?: (event: ColumnEvent) => void
}