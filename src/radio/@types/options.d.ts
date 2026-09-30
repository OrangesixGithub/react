/** Opção pública do Radio, compatível com a API 2.x. */
export type RadioOptionsProps = {
    /** Valor enviado ao selecionar a opção. */
    value: string;
    /** Texto exibido junto ao botão. */
    label: string;
    /** Impede a seleção desta opção. */
    disabled?: boolean;
};
