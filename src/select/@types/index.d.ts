import React from "react";
import {
    ApiComponentProps,
    ApiFieldModeProps,
    ApiFieldHookFormProps,
    ApiFieldComponentProps,
    ApiFieldControlledProps,
} from "../../api";

export type SelectOptionsProps = {

    /**
     * Define o ID da opção
     */
    id: any

    /**
     * Define a label da opção
     */
    name: string;

    /**
     * Define se seleção do elemento está desabilitada
     */
    disabled?: boolean;
};

interface SelectBaseProps extends ApiComponentProps, ApiFieldComponentProps {

    /**
     * Define a referência do campo select
     */
    ref?: React.Ref<HTMLSelectElement>

    /**
     * Array de objeto para definir as opções de escolha
     */
    options: Array<SelectOptionsProps>

    /**
     * Define o primeiro elemento do select como legenda
     */
    init?: boolean | string

    /**
     * Define o tamanho do componente
     */
    sizes?: "small" | "large"
}

export type SelectProps<T extends ApiFieldModeProps> = T extends "Controlled"
    ? SelectBaseProps & ApiFieldControlledProps
    : SelectBaseProps & ApiFieldHookFormProps;
