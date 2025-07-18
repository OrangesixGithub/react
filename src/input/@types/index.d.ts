import { PasswordProps } from "primereact/password";
import React, { HTMLInputTypeAttribute } from "react";
import {
    ApiComponentProps,
    ApiFieldModeProps,
    ApiFieldHookFormProps,
    ApiFieldComponentProps,
    ApiFieldControlledProps,
} from "../../api";

interface InputMaskProps {
    /**
     * Define mascara no campo de dados
     */
    mask?: string | "cpf" | "cnpj"

    /**
     * Define se campo vai ser limpo se mascara tiver imcompleta
     */
    maskAutoClear?: boolean
}

interface InputPasswordProps {
    /**
     * Define se vai ou não mostra o botão para exibir a senha
     */
    passwordShow?: boolean

    /**
     * Define se vai ou não mostra a legenda da senha
     */
    passwordFeedback?: boolean

    /**
     * Define o template do cabeçalho do password
     */
    passwordHeaderTemplate?: (props: PasswordProps) => React.ReactNode

    /**
     * Define o template do Rodapé do password
     */
    passwordFooterTemplate?: (props: PasswordProps) => React.ReactNode

    /**
     * Define o template do password
     */
    passwordTemplate?: (props: PasswordProps) => React.ReactNode
}

interface InputNumberProps {

    /**
     * Define o tamanho mínimo para input do tipo 'Number'
     */
    numberMin?: number

    /**
     * Define o tamanho máximo para input do tipo 'Number'
     */
    numberMax?: number

    /**
     * Define o modo para input do tipo 'Number'
     */
    numberMode?: "decimal" | "currency"

    /**
     * Define o modo de dinheiro para input do tipo 'Number'
     */
    numberCurrency?: "BRL" | string

    /**
     * Define o prfixo para input do tipo 'Number'
     */
    numberPrefix?: string

    /**
     * Define o sufixo para input do tipo 'Number'
     */
    numberSuffix?: string

    /**
     * Define se separador decimal vai ser exibibo para input do tipo 'Number'
     */
    numberDecimalSeparator?: boolean

    /**
     * Define o mínimo de casas decimais para input do tipo 'Number'
     */
    numberMaxFractionDigits?: number

    /**
     * Define o máximo de casas decimais para input do tipo 'Number'
     */
    numberMinFractionDigits?: number
}

interface InputBaseProps extends ApiComponentProps, ApiFieldComponentProps, InputPasswordProps, InputMaskProps, InputNumberProps {

    /**
     * Define o tipo de dados do componente
     */
    type?: Extract<HTMLInputTypeAttribute, "text" | "date" | "email" | "time" | "number" | "password">

    /**
     * A propriedade `ref` retorna a referência do componente
     */
    ref?: React.Ref<HTMLInputElement>

    /**
     * Define o tamanho do componente
     */
    sizes?: "small" | "large"
}

export type InputProps<T extends ApiFieldModeProps> = T extends "Controlled"
    ? InputBaseProps & ApiFieldControlledProps
    : InputBaseProps & ApiFieldHookFormProps;