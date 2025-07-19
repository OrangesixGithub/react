import {
    ApiComponentProps,
    ApiFieldModeProps,
    ApiFieldHookFormProps,
    ApiFieldComponentProps,
    ApiFieldControlledProps,
} from "../../api";

interface RadioBaseProps extends ApiComponentProps, ApiFieldComponentProps {

    /**
     * Define o nome do campo
     */
    name: string;

    /**
     * Array de objeto para definir as opções de escolha
     */
    options: Array<RadioOptionsProps>

    /**
     * Define o aliamento das opções de escolha
     */
    align?: "row" | "column"
}

export type RadioOptionsProps = {

    /**
     * Define o valor da opção
     */
    value: string;

    /**
     * Define a label da opção
     */
    label: string;

    /**
     * Define se opção está habilitada ou desabilitada
     */
    disabled?: boolean;
};

export type RadioProps<T extends ApiFieldModeProps> = T extends "Controlled"
    ? RadioBaseProps & ApiFieldControlledProps
    : RadioBaseProps & ApiFieldHookFormProps;
