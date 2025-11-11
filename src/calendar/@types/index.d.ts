import { ApiComponentProps, ApiFieldComponentProps, } from "../../api";

export interface CalendarProps extends ApiComponentProps, ApiFieldComponentProps {

    /**
     * Valor inicial do calendar
     */
    value: any;

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

    /**
     * Metodo responsável por alterar o valor do state inicial
     */
    onChange(value: any): void
}
