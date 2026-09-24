import fs from "fs";
import path from "path";
import { Plugin } from "vite";
import { Scanner } from "@tailwindcss/oxide";
import { compile, optimize } from "@tailwindcss/node";

/**
 * Compila o CSS do pacote com o Tailwind, varrendo as classes utilizadas nos componentes.
 * Quando `scan` é informado, somente esses diretórios são varridos (ignorando o `@source` do CSS).
 */
async function tailwindBuild(input: string, scan?: string[]) {
    const css = fs.readFileSync(input, "utf-8");
    const compiler = await compile(css, {
        base: path.dirname(input),
        from: input,
        onDependency: () => {},
    });

    const sources = (compiler.root === "none"
        ? []
        : compiler.root === null
            ? [{ base: path.dirname(input), pattern: "**/*", negated: false }]
            : [{ ...compiler.root, negated: false }]
    ).concat(scan
        ? scan.map(base => ({ base, pattern: "**/*", negated: false }))
        : compiler.sources);

    const candidates = new Scanner({ sources }).scan();
    return optimize(compiler.build(candidates), { minify: true }).code;
}

/**
 * Plugin - Emite o `style.css` do pacote e as fontes do `primeicons` (`fonts/`) junto com o bundle.
 */
export function viteStyle(options: { input: string, fonts: string, scan?: string[] }): Plugin {
    return {
        name: "orangesix:style",
        apply: "build",
        async generateBundle() {
            this.emitFile({
                type: "asset",
                fileName: "style.css",
                source: await tailwindBuild(options.input, options.scan),
            });

            fs.readdirSync(options.fonts).forEach(file => {
                this.emitFile({
                    type: "asset",
                    fileName: `fonts/${file}`,
                    source: fs.readFileSync(path.join(options.fonts, file)),
                });
            });
        }
    };
}
