import type { Control } from "react-hook-form";

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
     * Mensagem de validação exibida no feedback do campo, inclusive no modo `Controlled`.
     */
    error?: string

    /**
     * Define o espaço reservador do campo
     */
    placeholder?: string

    /**
     * Define o icone do campo
     */
    icon?: string

    /**
     * Define o prefixo dos ícones do pacote. O padrão é `pi pi-`.
     * O valor `bi bi-` permanece aceito para compatibilidade com a 2.x.
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
     * Define a classe utilizada quando o campo for readOnly
     */
    readonlyClassName?: string

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
 * Define os tipos `default` para componente de entrada de dados HookForm
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
