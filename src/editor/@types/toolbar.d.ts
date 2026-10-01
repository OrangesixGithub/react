import type { Editor as TiptapEditor } from "@tiptap/react";

export interface EditorCoreProps {
    /**
     * Propriedade de edição do editor de código do pacote TipTap
     * @link https://tiptap.dev/
     */
    editor: TiptapEditor

    /** Prefixo dos ícones; padrão bi bi-. */
    iconPrefix?: "bi bi-" | "pi pi-"
}

export interface EditorOptionsProps {
    /** Exibe a inserção e edição de tabelas; habilitada no modo full. */
    table?: boolean;
    /** Exibe alinhamento à esquerda, centralizado, à direita e justificado; habilitado no modo full. */
    align?: boolean;
    /** Exibe títulos de nível 1, 2 e 3. */
    text: boolean
    /** Exibe a opção de negrito. */
    bold: boolean;
    /** Exibe a opção de itálico. */
    italic: boolean;
    /** Exibe o seletor de cor do texto. */
    color: boolean
    /** Exibe a opção de texto riscado. */
    strike: boolean;
    /** Exibe a opção de sublinhado. */
    underline: boolean;
    /** Exibe a opção de código. */
    code: boolean;
    /** Exibe a opção de destaque. */
    highlight: boolean;
    /** Exibe a opção de lista não ordenada. */
    bulletlist: boolean
    /** Exibe a opção de lista ordenada. */
    orderlist: boolean
    /** Exibe a opção de inserir e remover links. */
    link: boolean
    /** Exibe a opção de inserir imagens. */
    image: boolean
}

