import React from "react";
import { Box } from "../box";
import { AccordionProps } from "./types";
import {
    Accordion as AccordionPrimeReact,
    AccordionTab as AccordionTabPrimeReact,
    AccordionProps as AccordionPrimeReactProps
} from "primereact/accordion";

/**
 * Componente - `Accordion`
 *
 * Um componente versátil que pode ser utilizado para agrupar conteúdo em lista.
 */
export const Accordion = ({ ...props }: AccordionProps) => {
    const core: AccordionPrimeReactProps = props.onChange !== undefined
        ? {
            // @ts-ignore
            onChange: event => props.onChange(event)
        } : {};
    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return (
        <Box className={props.className}
             css={props.css}
             size={props.size ?? "100"}>
            <AccordionPrimeReact activeIndex={props.activeIndex}
                                 className="w-100"
                                 collapseIcon={props.iconExpand}
                                 expandIcon={props.iconCollapse}
                                 id={props.id}
                                 multiple={props.multiple}
                                 {...core}>
                {props.tabs.map((item, index) => (
                    <AccordionTabPrimeReact className={item.className}
                                            disabled={item.disabled}
                                            header={item.header}
                                            key={index}>
                        {item.content}
                    </AccordionTabPrimeReact>
                ))}
            </AccordionPrimeReact>
        </Box>
    );
};

Accordion.displayName = "Accordion";