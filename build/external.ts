import fs from "fs";

/**
 * Define como externo toda dependência (e seus subpaths) declarada em `dependencies` e `peerDependencies`,
 * evitando que pacotes de terceiros sejam incluídos no bundle da biblioteca.
 */
export function viteExternal(packageFile: string) {
    const packageJson = JSON.parse(fs.readFileSync(packageFile, "utf-8"));
    const packages = [
        ...Object.keys(packageJson.dependencies ?? {}),
        ...Object.keys(packageJson.peerDependencies ?? {}),
        "@primereact",
    ];
    return (id: string) => packages.some(name => id === name || id.startsWith(`${name}/`));
}
