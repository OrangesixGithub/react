/** Configuração da máscara textual do campo. */
export interface InputMaskProps {
    /** Máscara personalizada ou formato brasileiro de CPF ou CNPJ. */
    mask?: string | "cpf" | "cnpj";

    /** Limpa a máscara incompleta ao sair do campo. */
    maskAutoClear?: boolean;
}
