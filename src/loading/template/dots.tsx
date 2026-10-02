import { loadingTemplateVariants } from "./variants";

/**
 * Core - `LoadingDots`
 *
 * Indicador do `type="grow"`: três pontos pulsando em sequência.
 */
export function LoadingDots() {
    const styles = loadingTemplateVariants();
    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return (
        <span className={styles.dots()}>
            <span className={styles.dot()}/>
            <span className={styles.dot()}/>
            <span className={styles.dot()}/>
        </span>
    );
}

LoadingDots.displayName = "LoadingDots";
