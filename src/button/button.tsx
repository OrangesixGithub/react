import React from "react";
import { ButtonProps } from "./types";
import { Button as ButtonPrimeReact } from "primereact/button";

/**
 * Componente - `Button`
 *
 * Um componente versátil que pode ser utilizado para realizar ações por exemplo em formulários de dados.
 * Permite personalizar o estilo e o conteúdo através de propriedades.
 */
export const Button = ({ ...props }: ButtonProps) => {
    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return (
        <ButtonPrimeReact badge={props.badge}
                          badgeClassName={props.badgeClassName}
                          className={props.className}
                          disabled={props.disabled}
                          icon={props.icon !== undefined ? `${props.iconPrefix ?? "bi bi-"}${props.icon ?? ""} ${props.label ? "me-1" : ""}` : undefined}
                          iconPos={props.iconPos}
                          id={props.id}
                          label={props.label}
                          link={props.isLink}
                          loading={props.isLoading}
                          pt={{ loadingIcon: { className: "me-1" } }}
                          ref={props.ref}
                          severity={props.color}
                          size={props.size}
                          style={props.css}
                          type={props.type}
                          onClick={props.onClick}/>
    );
};

Button.displayName = "Button";