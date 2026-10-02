import { loadingTemplateVariants } from "./variants";

/**
 * Core - `LoadingOrbit`
 *
 * Indicador do `type="orbit"`: dois anéis girando em sentidos opostos.
 */
export function LoadingOrbit() {
    const styles = loadingTemplateVariants();
    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return (
        <span className={styles.orbit()}>
            <span className={styles.orbitOuter()}/>
            <span className={styles.orbitInner()}/>
        </span>
    );
}

LoadingOrbit.displayName = "LoadingOrbit";
