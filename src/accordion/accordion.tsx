import React from "react";
import { Box } from "../box";
import { AccordionProps } from "./@types/index";
import * as AccordionPrimeReact from "primereact/accordion";

/**
 * Componente - `Accordion`
 *
 * Um componente versátil que pode ser utilizado para agrupar conteúdo em lista.
 */
export const Accordion = ({ ...props }: AccordionProps) => {
    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return (
        <Box className={props.className}
             css={props.css}
             size={props.size ?? "100"}>
            <AccordionPrimeReact.Accordion activeIndex={props.activeIndex}
                                           className="w-100"
                                           collapseIcon={props.iconExpand}
                                           expandIcon={props.iconCollapse}
                                           id={props.id}
                                           multiple={props.multiple}
                                           onTabChange={props.onChange}>
                {props.tabs.map((item, index) => (
                    <AccordionPrimeReact.AccordionTab className={item.className}
                                                      disabled={item.disabled}
                                                      header={item.header}
                                                      key={index}>
                        {item.content}
                    </AccordionPrimeReact.AccordionTab>
                ))}
            </AccordionPrimeReact.Accordion>
        </Box>
    );
};
Accordion.displayName = "Accordion";