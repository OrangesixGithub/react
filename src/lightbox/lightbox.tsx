import React from "react";
import { Box } from "../box";
import { LightboxProps } from ".";
import { handleLightbox } from "./core/handle";

/**
 * Componente - `Lightbox`
 *
 * Cria uma camada (overlay) semi-transparente para visualização de imagem ampliada.
 */
export const Lightbox = ({ html, ...props }: LightboxProps) => {
    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return (
        <Box
            className={`lightbox ${(props.className ?? "")}`}
            css={props.css}
            id={props.id}
            size={props.size}>
            <div
                className="w-100 p-2 d-flex flex-wrap justify-content-start lightbox-container"
                dangerouslySetInnerHTML={{ __html: handleLightbox(html) }}/>
        </Box>
    );
};

Lightbox.displayName = "Lightbox";