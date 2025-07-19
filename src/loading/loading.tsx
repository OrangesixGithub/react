import { LoadingProps } from ".";
import React, { HTMLAttributes } from "react";
import { classNames } from "primereact/utils";

/**
 * Componente - `Loading`
 *
 * Um componente versátil que pode ser utilizado para exibir informação de carregando.
 * Permite personalizar o estilo e o conteúdo através de propriedades.
 */
export const Loading = ({ opacity = "0.5", ...props }: LoadingProps) => {
    const css = {
        justify: props.justify === undefined ? "justify-content-center" : Array.isArray(props.justify) ? props.justify?.join(" ") : props.justify,
        align: props.align === undefined ? "align-items-center" : Array.isArray(props.align) ? props.align?.join(" ") : props.align,
    };
    const attr: HTMLAttributes<"div"> = {
        className: classNames([
            css.align,
            css.justify,
            props.className,
            "box-loading",
            `text-${props.color ?? "white"}`,
        ]),
        style: {
            zIndex: props.zindex ?? 1,
            background: "rgba(0,0,0, " + opacity + ")", ...props.css ?? {}
        }
    };

    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return props.visible && (
        <div {...attr as any}>
            <div className={`spinner-${props.type ?? "border"}`}>
                <span className="visually-hidden">Loading...</span>
            </div>
            {props.text ?? <p className="mt-1">{props.text}</p>}
        </div>
    );
};

Loading.displayName = "Loading";