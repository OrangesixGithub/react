import { loadingTemplateVariants } from "./variants";

/**
 * Core - `LoadingRing`
 *
 * Indicador padrão do `type="border"`: anel com arco girando.
 */
export function LoadingRing() {
    const styles = loadingTemplateVariants();
    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return (
        <span className={styles.ring()}/>
    );
}

LoadingRing.displayName = "LoadingRing";
