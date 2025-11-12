import {
    ApiFieldModeProps,
    ApiComponentProps,
    ApiFieldHookFormProps,
    ApiFieldComponentProps,
    ApiFieldControlledProps,
} from "../../api";

export interface CalendarBaseProps extends ApiComponentProps, ApiFieldComponentProps {
    /**
     * Define o formato do calendário
     */
    view?: "date" | "month" | "year"

    /**
     * Define o formato da exibição da data
     */
    format?: string

    /**
     * Define a quantidade de mês a ser exibido
     */
    numberMonths?: number

    /**
     * Define o local onde vai ser renderizado calendário
     */
    appendTo?: "self" | HTMLElement | undefined | null | (() => HTMLElement)
}

export type CalendarProps<T extends ApiFieldModeProps> = T extends "Controlled"
    ? CalendarBaseProps & ApiFieldControlledProps
    : CalendarBaseProps & ApiFieldHookFormProps;
