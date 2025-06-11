import { BoxProps } from "./types";
import React, { HTMLAttributes } from "react";
import { classNames } from "primereact/utils";

/**
 * Componente - `Box`
 *
 * Um componente versátil que pode ser utilizado para criar seções ou caixas em uma página.
 * Permite personalizar o estilo e o conteúdo através de propriedades.
 *
 * Exemplo de uso:
 * ```tsx
 * <Box align="align-items-center"
 *      justify="justify-content-end"
 *      size="25">
 *   ...conteúdo HTML
 * </Box>
 * ```
 */
export const Box = ({ children, ...props }: BoxProps) => {
    const css = {
        size: `box-size-${(props.size ?? "100")}`,
        direction: `box-direction-${props.direction ?? "row"}`,
        justify: props.justify === undefined ? "" : Array.isArray(props.justify) ? props.justify?.join(" ") : props.justify,
        align: props.align === undefined ? "" : Array.isArray(props.align) ? props.align?.join(" ") : props.align
    };

    const attr: HTMLAttributes<"div"> & Omit<BoxProps, "children"> = {
        className: classNames([
            "box",
            props.className ?? "",
            css.size,
            css.direction,
            css.justify,
            css.align
        ]),
        style: props.css,
        id: props.id
    };

    return (
        <div {...attr as any}>{children}</div>
    );
};

Box.displayName = "Box";