/** Opção pública do Select, compatível com a API 2.x. */
export type SelectOptionsProps = {
    /** Identificador da opção; o callback retorna sua representação textual. */
    id: any;
    /** Texto exibido na lista e no campo. */
    name: string;
    /** Impede a escolha desta opção. */
    disabled?: boolean;
};
