/** Valor de uma opção do Checkbox. */
export type CheckboxValue = string | number;

/** Opção pública do Checkbox. */
export type CheckboxOptionsProps = {
    /** Valor da opção; ela fica marcada quando o valor do campo (array) contém este item. */
    value: CheckboxValue;
    /** Texto exibido junto à caixa de seleção. */
    label: string;
    /** Impede a alteração desta opção. */
    disabled?: boolean;
};
