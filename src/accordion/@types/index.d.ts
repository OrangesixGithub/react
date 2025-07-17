import * as React from "react";
import { ApiComponentProps } from "../../api/@types/index";
import { AccordionTabChangeEvent, AccordionTabProps as AccordionTabPrimeReactProps } from "primereact/accordion";

export interface AccordionTabProps {
    /**
     * Define o cabeçalho de cada accordion
     */
    header: React.ReactNode | ((props: AccordionTabPrimeReactProps) => React.ReactNode) | string

    /**
     * Define o conteudo do accordion
     */
    content: React.ReactNode

    /**
     * Define se accordion está desabilitado
     */
    disabled?: boolean

    /**
     * Define o className dos accordion tab
     */
    className?: string
}

export interface AccordionProps extends ApiComponentProps {
    /**
     * Array de objeto utilizado na construção da accordion
     */
    tabs: Array<AccordionTabProps>

    /**
     * Indica qual accordionn vai estar ativo pelo indice
     */
    activeIndex?: number | number[] | null

    /**
     * Permite ativar vários accordions ao mesmo tempo
     */
    multiple?: boolean

    /**
     * Define o icon para expandir accordion
     */
    iconExpand?: React.ReactNode

    /**
     * Define o icon para recolher accordion
     */
    iconCollapse?: React.ReactNode

    /**
     * Função retorna o evento quando o accordion é modificado
     */
    onChange?: (event: AccordionTabChangeEvent) => void
}