import type { ButtonProps } from "./@types";
import { Button as PrimeButton } from "primereact/button";
import { buttonBadgeVariants, buttonIconVariants, buttonVariants } from "./variants";

/**
 * Componente - `Button`
 *
 * Aciona operações com rótulo, ícone e estados visuais configuráveis.
 */
export function Button({ ...props }: ButtonProps) {
    const position = props.iconPos ?? "left";
    const icon = buttonIconVariants(props);
    const iconElement = icon && <i
        aria-hidden="true"
        className={icon}/>;
    const badgeElement = props.badge
        && <span className={buttonBadgeVariants(props.badgeClassName)}>{props.badge}</span>;

    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return (
        <PrimeButton
            ref={node => {
                if (typeof props.ref === "function") {
                    props.ref(node as HTMLButtonElement);
                } else if (props.ref) {
                    props.ref.current = node as HTMLButtonElement;
                }
            }}
            aria-busy={props.isLoading || undefined}
            className={buttonVariants(props)}
            disabled={props.disabled || props.isLoading}
            id={props.id}
            style={props.css}
            type={props.type ?? "button"}
            onClick={props.onClick}>
            {(position === "left" || position === "top") && iconElement}
            {props.label && <span>{props.label}</span>}
            {(position === "right" || position === "bottom") && iconElement}
            {badgeElement}
        </PrimeButton>
    );
}

Button.displayName = "Button";
