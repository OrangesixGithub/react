/** Configuração do campo numérico. */
export interface InputNumberProps {
    /** Valor mínimo aceito. */
    numberMin?: number;

    /** Valor máximo aceito. */
    numberMax?: number;

    /** Formato decimal ou monetário. */
    numberMode?: "decimal" | "currency";

    /** Código ISO da moeda; o padrão é BRL no modo monetário. */
    numberCurrency?: "BRL" | string;

    /** Texto exibido antes do número. */
    numberPrefix?: string;

    /** Texto exibido depois do número. */
    numberSuffix?: string;

    /** Exibe separadores de agrupamento. */
    numberDecimalSeparator?: boolean;

    /** Número máximo de casas decimais. */
    numberMaxFractionDigits?: number;

    /** Número mínimo de casas decimais. */
    numberMinFractionDigits?: number;
}
