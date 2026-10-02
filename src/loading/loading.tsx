import { loadingVariants } from "./variants";
import type { LoadingProps } from "./@types";

/**
 * Componente - `Loading`
 *
 * Um componente versátil que pode ser utilizado para exibir informação de carregando.
 * Permite personalizar o estilo e o conteúdo através de propriedades.
 */
export function Loading({ opacity = "0.5", ...props }: LoadingProps) {
    if (!props.visible) {
        return null;
    }

    const styles = loadingVariants({
        color: props.color ?? "white",
        fullscreen: props.fullscreen ?? false,
    });
    const align = Array.isArray(props.align) ? props.align.join(" ") : props.align ?? "items-center";
    const justify = Array.isArray(props.justify) ? props.justify.join(" ") : props.justify ?? "justify-center";
    const indicator = props.type === "grow"
        ? (
            <span className={styles.dots()}>
                <span className={styles.dot()}/>
                <span className={styles.dot()}/>
                <span className={styles.dot()}/>
            </span>
        )
        : <span className={styles.ring()}/>;

    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return (
        <div
            aria-busy="true"
            aria-live="polite"
            className={styles.root({ className: [align, justify, props.className] })}
            role="status"
            style={{ zIndex: props.zindex ?? 1, background: `rgba(0,0,0, ${opacity})`, ...props.css }}>
            {props.children ?? indicator}
            {props.text
                ? <p className={styles.text()}>{props.text}</p>
                : <span className="sr-only">Carregando...</span>}
        </div>
    );
}

Loading.displayName = "Loading";
