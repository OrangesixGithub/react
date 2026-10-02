import { loadingTemplateVariants } from "./variants";

/**
 * Core - `LoadingBars`
 *
 * Indicador do `type="bars"`: barras verticais oscilando em sequência.
 */
export function LoadingBars() {
    const styles = loadingTemplateVariants();
    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return (
        <span className={styles.bars()}>
            <span className={styles.bar()}/>
            <span className={styles.bar()}/>
            <span className={styles.bar()}/>
            <span className={styles.bar()}/>
        </span>
    );
}

LoadingBars.displayName = "LoadingBars";
