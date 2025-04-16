import { CSSProperties } from "react";
import { Control } from "react-hook-form";
import { KeyFilterType } from "primereact/keyfilter";

/**
 * Realiza o mapeamento dos valores da propriedades css `align-items`
 */
export type AlignItemsProps =
    | "align-items-start"
    | "align-items-end"
    | "align-items-center"
    | "align-items-baseline"
    | "align-items-stretch"
    | "align-items-sm-start"
    | "align-items-sm-end"
    | "align-items-sm-center"
    | "align-items-sm-baseline"
    | "align-items-sm-stretch"
    | "align-items-md-start"
    | "align-items-md-end"
    | "align-items-md-center"
    | "align-items-md-baseline"
    | "align-items-md-stretch"
    | "align-items-lg-start"
    | "align-items-lg-end"
    | "align-items-lg-center"
    | "align-items-lg-baseline"
    | "align-items-lg-stretch"
    | "align-items-xl-start"
    | "align-items-xl-end"
    | "align-items-xl-center"
    | "align-items-xl-baseline"
    | "align-items-xl-stretch"
    | "align-items-xxl-start"
    | "align-items-xxl-end"
    | "align-items-xxl-center"
    | "align-items-xxl-baseline"
    | "align-items-xxl-stretch";

/**
 * Realiza o mapeamento dos valores da propriedades css `justify-content`
 */
export type JustifyContentProps =
    | "justify-content-start"
    | "justify-content-end"
    | "justify-content-center"
    | "justify-content-between"
    | "justify-content-around"
    | "justify-content-evenly"
    | "justify-content-sm-start"
    | "justify-content-sm-end"
    | "justify-content-sm-center"
    | "justify-content-sm-between"
    | "justify-content-sm-around"
    | "justify-content-sm-evenly"
    | "justify-content-md-start"
    | "justify-content-md-end"
    | "justify-content-md-center"
    | "justify-content-md-between"
    | "justify-content-md-around"
    | "justify-content-md-evenly"
    | "justify-content-lg-start"
    | "justify-content-lg-end"
    | "justify-content-lg-center"
    | "justify-content-lg-between"
    | "justify-content-lg-around"
    | "justify-content-lg-evenly"
    | "justify-content-xl-start"
    | "justify-content-xl-end"
    | "justify-content-xl-center"
    | "justify-content-xl-between"
    | "justify-content-xl-around"
    | "justify-content-xl-evenly"
    | "justify-content-xxl-start"
    | "justify-content-xxl-end"
    | "justify-content-xxl-center"
    | "justify-content-xxl-between"
    | "justify-content-xxl-around"
    | "justify-content-xxl-evenly";

/**
 * Define as tipagens `default` de todos os componentes do pacote
 */
export interface ApiComponentProps {

    /**
     * Propriedade para identificar o id do elemento
     */
    id?: string

    /**
     * Adiciona no atributo `class` do componente o valor atribuido nessa propriedade
     */
    className?: string

    /**
     * Define o tamanho da box do componente de acordo com o valores abaixo
     */
    size?: "5" | "10" | "12-5" | "15" | "17-5" | "20" | "22-5" | "25" | "30" | "33" | "35" | "40" | "45" | "50" | "55" | "60" | "65" | "70" | "75" | "80" | "85" | "90" | "95" | "100"

    /**
     * Define as propriedades css do component `style`
     */
    css?: CSSProperties
}

/**
 * Define as cores padrão as UI de componentes
 */
export type ApiColorProps =
    "primary" |
    "secondary" |
    "success" |
    "danger" |
    "light" |
    "warning" |
    "gray" |
    "info" |
    "dark" |
    "white";

/**
 * Define o modo do componente de entrada de dados
 */
export type ApiFieldModeProps = "Controlled" | "HookForm";

/**
 * Define os tipos `default` para componente de entrada de dados
 */
export interface ApiFieldComponentProps {

    /**
     * Define o id do campo
     */
    id?: string

    /**
     * Define o nome do campo
     */
    name?: string

    /**
     * Define o rótulo do campo
     */
    label?: string

    /**
     * Define o espaço reservador do campo
     */
    placeholder?: string

    /**
     * Define o icone do campo
     */
    icon?: string

    /**
     * Define o prefixo dos icones do pacote
     */
    iconPrefix?: "bi bi-" | "pi pi-"

    /**
     * Define se campo é obrigatório
     */
    required?: boolean

    /**
     * Desabilita a entrada de dados no campo
     */
    disabled?: boolean

    /**
     * Define o modo do componente de entrada de dados
     */
    mode?: ApiFieldModeProps

    /**
     * Define a opção de filtro de dados do componente
     */
    keyfilter?: KeyFilterType;

    /**
     * Determina se campo é apenas de leitura
     */
    readonly?: boolean
}

/**
 * Define os tipos `default` para componente de entrada de dados controlled
 * quando a propriedade `Readonly` estiver habilitada
 */
interface ApiFieldReadonlyControlledProps {
    /**
     * Define o valor do componente controlado
     */
    value: any

    /**
     * Determina se campo é apenas de leitura
     */
    readonly: true

    /**
     * Função para alterar o valor do componente controlado
     */
    onChange?: (value: any) => void

    /**
     * Função quando um usuário sai de um componente controlado
     */
    onBlur?: (value: any) => void
}

/**
 Define os tipos `default` para componente de entrada de dados controlled
 quando a propriedade `Readonly` estiver desabilitada
 */
interface ApiFieldWritableControlledProps {
    /**
     * Define o valor do componente controlado
     */
    value: any

    /**
     * Determina se campo é apenas de leitura
     */
    readonly?: false

    /**
     * Função para alterar o valor do componente controlado
     */
    onChange(value: any): void

    /**
     * Função quando um usuário sai de um componente controlado
     */
    onBlur?: (value: any) => void
}

/**
 * Define os tipos `default` para componente de entrada de dados controlled
 */
export type ApiFieldControlledProps =
    | ApiFieldReadonlyControlledProps
    | ApiFieldWritableControlledProps;

/**
 * Define os tipos `default` para componente de entrada de dados HookFomr
 */
export interface ApiFieldHookFormProps {

    /**
     * Define o nome do campo
     */
    name: string

    /**
     * Objeto de controle do HookForm
     */
    control: Control<any>

    /**
     * Função executada quando o valor é modificado
     */
    onChange?: (value: any) => void

    /**
     * Função executada quando um usuário sai de um componente
     */
    onBlur?: (value: any) => void
}