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
    const iconElement = icon
        && <i
            aria-hidden="true"
            className={icon}/>;
    const badgeElement = props.badge
        && <span className={buttonBadgeVariants(props.badgeClassName)}>{props.badge}</span>;

    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return props.isVisible === false ? null : (
        <PrimeButton
            unstyled
            ref={(node: unknown) => {
                // Na v10, o Button encaminha o elemento HTML apesar da declaração como classe React.
                const button = node as HTMLButtonElement | null;
                if (typeof props.ref === "function") {
                    props.ref(button);
                } else if (props.ref) {
                    props.ref.current = button;
                }
            }}
            aria-busy={props.isLoading || undefined}
            className={buttonVariants(props)}
            disabled={props.disabled || props.isLoading}
            id={props.id}
            style={props.css}
            type={props.type ?? "button"}
            onClick={props.onClick}>
            {props.children != null
                ? props.children
                : <>
                    {(position === "left" || position === "top") && iconElement}
                    {props.label && <span>{props.label}</span>}
                    {(position === "right" || position === "bottom") && iconElement}
                    {badgeElement}
                </>}
        </PrimeButton>
    );
}

Button.displayName = "Button";
