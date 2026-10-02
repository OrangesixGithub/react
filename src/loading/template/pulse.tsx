import { loadingTemplateVariants } from "./variants";

/**
 * Core - `LoadingPulse`
 *
 * Indicador do `type="pulse"`: círculo com onda expandindo.
 */
export function LoadingPulse() {
    const styles = loadingTemplateVariants();
    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return (
        <span className={styles.pulse()}>
            <span className={styles.pulseWave()}/>
            <span className={styles.pulseCore()}/>
        </span>
    );
}

LoadingPulse.displayName = "LoadingPulse";
