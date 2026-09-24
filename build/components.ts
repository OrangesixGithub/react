import fs from "fs";
import path from "path";

/**
 * Componentes habilitados no build (`dist/`).
 *
 * Somente componentes validados no sandbox entram aqui. Para habilitar, descomente a linha.
 * As dependências internas (ex.: `input` usa `api` e `box`) também precisam estar habilitadas.
 */
export const components: string[] = [
    "api",
    // "box",
    // "accordion",
    // "autocomplete",
    // "button",
    // "calendar",
    // "editor",
    // "input",
    // "inputfilter",
    // "lightbox",
    // "loading",
    // "message",
    // "modal",
    // "multiselect",
    // "pdf",
    // "picklist",
    // "radio",
    // "select",
    // "switch",
    // "table",
    // "tablepivot",
    // "tabview",
    // "textarea",
    // "tooltip",
    // "utils",
];

/**
 * Lista os arquivos de código de um diretório (recursivo), ignorando testes.
 */
function sourceFiles(dir: string): string[] {
    return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
        const file = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            return sourceFiles(file);
        }
        return /\.tsx?$/.test(entry.name) && !/\.test\.tsx?$/.test(entry.name) ? [file] : [];
    });
}

/**
 * Obtém os outros componentes importados (via caminho relativo) por um componente.
 */
function componentDependencies(srcDir: string, name: string) {
    const dependencies = new Set<string>();

    sourceFiles(path.join(srcDir, name)).forEach(file => {
        const content = fs.readFileSync(file, "utf-8");
        for (const [, specifier] of content.matchAll(/from\s+["'](\.{1,2}\/[^"']*)["']/g)) {
            const [folder] = path.relative(srcDir, path.resolve(path.dirname(file), specifier)).split(path.sep);
            if (folder && folder !== name && !folder.startsWith("..") && fs.existsSync(path.join(srcDir, folder, "index.ts"))) {
                dependencies.add(folder);
            }
        }
    });
    return [...dependencies];
}

/**
 * Retorna os componentes habilitados, validando se existem e se as dependências internas também estão habilitadas.
 */
export function enabledComponents(srcDir: string) {
    if (components.length === 0) {
        throw new Error("[orangesix] Nenhum componente habilitado em build/components.ts.");
    }

    const errors: string[] = [];
    components.forEach(name => {
        if (!fs.existsSync(path.join(srcDir, name, "index.ts"))) {
            errors.push(`"${name}" não existe em src/.`);
            return;
        }
        componentDependencies(srcDir, name)
            .filter(dependency => !components.includes(dependency))
            .forEach(dependency => errors.push(`"${name}" depende de "${dependency}", que não está habilitado.`));
    });

    if (errors.length > 0) {
        throw new Error(`[orangesix] build/components.ts inválido:\n  - ${errors.join("\n  - ")}`);
    }
    return components;
}
