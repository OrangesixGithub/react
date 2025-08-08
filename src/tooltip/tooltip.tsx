import React from "react";
import { TooltipProps } from ".";
import { tooltipHash } from "./core/handle";
import * as TooltipPrimeReact from "primereact/tooltip";

/**
 * Componente - `Tooltip`
 *
 * Tooltip é uma abstração do Popper que fornece lógica comum envolvida em todos os tipos de elementos que aparecem na interface do usuário,
 * posicionados ao lado de um elemento de destino ou referência.
 */
export const Tooltip = ({ children, ...props }: TooltipProps) => {
    let hash = tooltipHash();
    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return (
        <>
            <div className={"tooltip-target-" + hash}>
                <TooltipPrimeReact.Tooltip appendTo={props.renderTo ?? "self"}
                                           baseZIndex={props.zIndex}
                                           className={props.className}
                                           content={props.content}
                                           disabled={props.disabled}
                                           event={props.event}
                                           position={props.position}
                                           style={props.css}
                                           target={".tooltip-target-" + hash}
                                           onHide={props.onHide}
                                           onShow={props.onShow}/>
                {children}
            </div>
        </>
    );
};

Tooltip.displayName = "Tooltip";