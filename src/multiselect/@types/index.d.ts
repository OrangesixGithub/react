import { SelectItem } from "primereact/selectitem";
import {
    ApiComponentProps,
    ApiFieldModeProps,
    ApiFieldHookFormProps,
    ApiFieldComponentProps,
    ApiFieldControlledProps,
} from "../../api";

interface MultiSelectBaseProps extends ApiComponentProps, Omit<ApiFieldComponentProps, "readonly"> {
    /**
     * Define as opções do multiselect
     */
    options: SelectItem[]

    /**
     * Define se está estado de carregamento
     */
    loading?: boolean

    /**
     * Define o display de exibição dos dados
     */
    display?: "comma" | "chip"

    /**
     * Define o número máximo de seleção
     */
    selectionLimit?: number

    /**
     * Define o local de renderização na DOM
     */
    appendTo?: null | "self" | HTMLElement | Function

    /**
     * Define o tamanho do scroll de dados
     */
    scrollHeight?: string

    /**
     * Define os propriedades de template
     */
    template?: {
        item?: (option: any) => React.ReactNode
        header?: (option: any) => React.ReactNode
        footer?: (option: any) => React.ReactNode
    }

    /**
     * Define as propriedades do filtro
     */
    filter?: {
        placeholder?: string
        autoFocus?: boolean,
        modeFilter?: "endsWith" | "startsWith" | "contains" | "equals" | "notEquals"
        delay?: number
        reset?: boolean
        onFilter?: (search: string) => void
    }

    /**
     * Define evento quando fecha o dropdown de opções
     */
    onHide?: () => void

    /**
     * Define evento quando abre o dropdown de opções
     */
    onShow?: () => void
}

export type MultiSelectProps<T extends ApiFieldModeProps> = T extends "Controlled"
    ? MultiSelectBaseProps & ApiFieldControlledProps
    : MultiSelectBaseProps & ApiFieldHookFormProps;