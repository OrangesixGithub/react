import type { ReactNode } from "react";
import type { ApiComponentProps } from "../../api";
import type { AccordionTabChangeEvent, AccordionTabProps as PrimeAccordionTabProps } from "primereact/accordion";

/**
 * Define cada aba do `Accordion`
 */
export interface AccordionTabProps {
    /**
     * Define o cabeçalho de cada accordion
     */
    header: ReactNode | ((props: PrimeAccordionTabProps) => ReactNode) | string

    /**
     * Define o conteudo do accordion
     */
    content: ReactNode

    /**
     * Define se accordion está desabilitado
     */
    disabled?: boolean

    /**
     * Define o className dos accordion tab
     */
    className?: string
}

/**
 * Define as propriedades do componente `Accordion`
 */
export interface AccordionProps extends ApiComponentProps {
    /**
     * Array de objeto utilizado na construção da accordion
     */
    tabs: Array<AccordionTabProps>

    /**
     * Indica qual accordionn vai estar ativo pelo indice. Com `onChange`, o valor é controlado pelo consumidor
     */
    activeIndex?: number | number[] | null

    /**
     * Permite ativar vários accordions ao mesmo tempo
     */
    multiple?: boolean

    /**
     * Define o icon para expandir accordion
     */
    iconExpand?: ReactNode

    /**
     * Define o icon para recolher accordion
     */
    iconCollapse?: ReactNode

    /**
     * Função retorna o evento quando o accordion é modificado
     */
    onChange?: (event: AccordionTabChangeEvent) => void
}
