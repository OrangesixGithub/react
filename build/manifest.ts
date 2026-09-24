import fs from "fs";
import path from "path";
import { Plugin } from "vite";

/**
 * Campos do `package.json` raiz que são publicados no `dist/package.json`.
 */
const PUBLISHED_FIELDS = [
    "name",
    "version",
    "description",
    "keywords",
    "author",
    "license",
    "homepage",
    "repository",
    "bugs",
    "dependencies",
    "peerDependencies",
    "peerDependenciesMeta",
] as const;

/**
 * Gera o `package.json` publicado a partir do `package.json` raiz (fonte única dos metadados).
 */
function publishedManifest(packageFile: string) {
    const packageJson = JSON.parse(fs.readFileSync(packageFile, "utf-8"));
    const manifest: Record<string, unknown> = {};

    PUBLISHED_FIELDS
        .filter(field => packageJson[field] !== undefined)
        .forEach(field => manifest[field] = packageJson[field]);

    return {
        ...manifest,
        type: "module",
        style: "./style.css",
        sideEffects: ["*.css"],
    };
}

/**
 * Plugin - Emite os arquivos de manifesto do pacote junto com o bundle:
 * - `package.json` publicado (derivado do `package.json` raiz);
 * - `README.md` e `LICENSE`;
 * - `package.json` de cada componente habilitado (`dist/???/package.json`), que permite o consumidor
 *   importar `@orangesix/???` através de alias.
 */
export function vitePackageManifest(options: { root: string, srcDir: string, components: string[] }): Plugin {
    return {
        name: "orangesix:package-manifest",
        apply: "build",
        generateBundle() {
            this.emitFile({
                type: "asset",
                fileName: "package.json",
                source: JSON.stringify(publishedManifest(path.join(options.root, "package.json")), null, 2),
            });

            ["README.md", "LICENSE"].forEach(file => {
                this.emitFile({
                    type: "asset",
                    fileName: file,
                    source: fs.readFileSync(path.join(options.root, file)),
                });
            });

            options.components.forEach(name => {
                this.emitFile({
                    type: "asset",
                    fileName: `${name}/package.json`,
                    source: fs.readFileSync(path.join(options.srcDir, name, "package.json")),
                });
            });
        }
    };
}
