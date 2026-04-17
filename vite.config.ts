import fs from "fs";
import path from "path";
import { defineConfig } from "vite";
import viteDTS from "vite-plugin-dts";
import viteReact from "@vitejs/plugin-react";
import { Target, viteStaticCopy } from "vite-plugin-static-copy";

/**
 * Obtém a entrada de cada componente da UI através do arquivo `./src/???/index.ts` e realizar o mapeamento para
 * `vite` realizar a compilação separada.
 */
export function viteComponentEntries() {
    const srcDir = "./src";
    const entries: any = {};

    fs.readdirSync(srcDir)
        .filter(file => fs.statSync(path.join(srcDir, file)).isDirectory())
        .forEach(folder => {
            const entryPath = path.join(srcDir, folder, "index.ts");
            if (fs.existsSync(entryPath)) {
                entries[folder] = path.resolve(__dirname, entryPath);
            }
        });
    return entries;
}

/**
 * Obtém o arquivo `package.json` e pasta `scss` de cada componente e realiza o `copy`
 * junto com build do component
 */
export function viteComponentAssets() {
    const srcDir = path.join(__dirname, "src");
    if (!fs.existsSync(srcDir)) {
        return [];
    }

    const targets: Target[] = [];
    fs.readdirSync(srcDir)
        .forEach(name => {
            const componentDir = path.join(srcDir, name);
            const scssDir = path.join(componentDir, "scss");
            const cssDir = path.join(componentDir, "style");

            const scssFile = path.join(componentDir, `_${name}.scss`);
            const packageFile = path.join(componentDir, "package.json");

            if (fs.existsSync(scssFile)) {
                targets.push({ src: `src/${name}/_${name}.scss`, dest: `${name}`, rename: { stripBase: true } });
            }

            if (fs.existsSync(packageFile)) {
                targets.push({ src: `src/${name}/package.json`, dest: `${name}`, rename: { stripBase: true } });
            }

            if (fs.existsSync(scssDir) && fs.statSync(scssDir).isDirectory()) {
                targets.push({ src: `src/${name}/scss/**/*`, dest: `${name}/scss`, rename: { stripBase: 3 } });
            }

            if (fs.existsSync(cssDir) && fs.statSync(cssDir).isDirectory()) {
                targets.push({ src: `src/${name}/style/**/*`, dest: `${name}/style`, rename: { stripBase: true } });
            }
        });
    return targets;
}

/**
 * Realiza a cópia do package.json principal para a pasta de distribuição do pacote
 */
function viteCopyPackageJson() {
    const packageJson = JSON.parse(fs.readFileSync("./package.json", "utf-8"));
    const Package = {
        "name": "@orangesix/react",
        "version": packageJson.version,
        "private": false,
        "author": "Luiz Fernando Bernardes de Paula",
        "description": "Biblioteca de components React UI.",
        "repository": {
            "type": "git",
            "url": "https://github.com/OrangesixGithub/react"
        },
        "license": "MIT",
        "bugs": {
            "url": "https://github.com/OrangesixGithub/react/issues"
        },
        "dependencies": packageJson.dependencies,
        "peerDependencies": packageJson.peerDependencies,
    };

    if (!fs.existsSync("./dist")) {
        fs.mkdirSync("./dist", { recursive: true });
    }

    fs.writeFileSync(
        "./dist/package.json",
        JSON.stringify(Package, null, 2)
    );
}

export default defineConfig({
    plugins: [
        viteReact(),
        viteStaticCopy({
            targets: viteComponentAssets()
        }),
        viteDTS({
            include: ["src/**/*.{ts,tsx}"],
            exclude: ["src/**/*.test.ts", "src/**/*.test.tsx"],
            outDir: "dist",
            entryRoot: "src",
            insertTypesEntry: false,
            copyDtsFiles: true,
            beforeWriteFile: (filePath, content) => {
                const newPath = filePath.replace("dist/src/", "dist/");
                return { filePath: newPath, content, };
            },
        }),
        {
            name: "copy-package-json",
            closeBundle() {
                viteCopyPackageJson();
            }
        }
    ],
    build: {
        outDir: "dist",
        sourcemap: true,
        lib: {
            entry: viteComponentEntries(),
            formats: ["es"],
            fileName: (format, entryName) => `${entryName}/index.${format == "es" ? "esm" : "cjs"}.js`
        },
        rolldownOptions: {
            external: JSON.parse(fs.readFileSync("./vite.external.json", "utf8"))?.external ?? [],
            output: {
                preserveModules: true,
                preserveModulesRoot: "src",
            }
        },
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx", ".d.ts"]
    },
});