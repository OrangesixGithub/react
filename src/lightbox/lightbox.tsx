import { Box } from "../box";
import type { LightboxProps } from "./@types";
import { handleLightbox } from "./core/handle";
import { lightboxVariants } from "./variants";
import { useEffect, useId, useMemo, useRef } from "react";
import { connectLightbox, initializeLightbox } from "./core/host";

/**
 * Componente - `Lightbox`
 *
 * Exibe conteúdo HTML com a galeria e os estilos originais da Lightbox3.
 */
export function Lightbox(props: LightboxProps) {
    const styles = lightboxVariants();
    const galleryId = useId();
    const containerRef = useRef<HTMLDivElement>(null);
    const html = useMemo(() => handleLightbox(props.html, galleryId), [props.html, galleryId]);

    useEffect(() => {
        initializeLightbox();
        if (containerRef.current) {
            return connectLightbox(containerRef.current, props.appendTo);
        }
    }, [html, props.appendTo]);

    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return (
        <Box
            className={props.className}
            css={props.css}
            id={props.id}
            size={props.size}>
            <div
                className={styles.container({ className: props.containerClassName })}
                dangerouslySetInnerHTML={{ __html: html }}
                ref={containerRef}/>
        </Box>
    );
}

Lightbox.displayName = "Lightbox";
