import path from "path";

/**
 * Mapeia a entrada `./src/???/index.ts` de cada componente habilitado para o `vite` realizar a
 * compilação separada (`dist/???/index.mjs`).
 */
export function viteComponentEntries(srcDir: string, components: string[]) {
    const entries: Record<string, string> = {};

    components.forEach(name => {
        entries[`${name}/index`] = path.join(srcDir, name, "index.ts");
    });
    return entries;
}
