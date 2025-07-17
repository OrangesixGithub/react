import { Control } from "react-hook-form";
import { KeyFilterType } from "primereact/keyfilter";

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
     * Define o tipo de exibição do input quando for readOnly
     */
    readonlyType?: "label" | "field"

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