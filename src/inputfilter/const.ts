import { InputFilterOptionsMap, InputFilterOptionsProps } from ".";

export const optionsDefault: Array<InputFilterOptionsMap["text"]> = ["=", "!=", "%", "!%"];

export const optionsLabel: Array<{
    options: InputFilterOptionsProps,
    label: string
}> = [
    { options: "=", label: "Igual a" },
    { options: "!=", label: "Diferente de" },
    { options: "<", label: "Menor do que" },
    { options: ">", label: "Maior do que" },
    { options: "<=", label: "Menor ou igual a" },
    { options: ">=", label: "Maior ou igual a" },
    { options: "{}", label: "Intervalo" },
    { options: "%", label: "Contém o que" },
    { options: "!%", label: "Não contém o que" },
];