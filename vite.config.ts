import fs from "fs";
import path from "path";
import { defineConfig } from "vite";
import viteDTS from "vite-plugin-dts";
import viteReact from "@vitejs/plugin-react";
import { viteStaticCopy } from "vite-plugin-static-copy";
import viteDynamicImport from "vite-plugin-dynamic-import";

/**
 * Obtém a entrada de cada componente da UI através do arquivo `./src/???/index.ts` e realizar o mapeamento para
 * `vite` realizar a compilação separada.
 */
function getComponentEntries() {
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
function getComponentAssets() {
    const srcDir = path.join(__dirname, "src");
    if (!fs.existsSync(srcDir)) {
        return [];
    }

    const targets: any[] = [];
    fs.readdirSync(srcDir)
        .forEach(name => {
            const componentDir = path.join(srcDir, name);
            const scssDir = path.join(componentDir, "scss");
            const scssFile = path.join(componentDir, `_${name}.scss`);
            const packageFile = path.join(componentDir, "package.json");

            if (fs.existsSync(scssFile)) {
                targets.push({ src: `src/${name}/_${name}.scss`, dest: `${name}` });
            }

            if (fs.existsSync(packageFile)) {
                targets.push({ src: `src/${name}/package.json`, dest: `${name}` });
            }

            if (fs.existsSync(scssDir) && fs.statSync(scssDir).isDirectory()) {
                targets.push({ src: `src/${name}/scss/**/*`, dest: `${name}/scss` });
            }
        });
    return targets;
}

export default defineConfig({
    plugins: [
        viteReact(),
        viteDynamicImport(),
        viteStaticCopy({
            targets: getComponentAssets()
        }),
        viteDTS({
            include: ["src/**/*.{ts,tsx}"],
            exclude: ["src/**/*.test.ts", "src/**/*.test.tsx"],
            outDir: "dist",
            insertTypesEntry: false,
            copyDtsFiles: true
        })
    ],
    build: {
        outDir: "dist",
        sourcemap: true,
        lib: {
            entry: getComponentEntries(),
            formats: ["es", "cjs"],
            fileName: (format, entryName) => `${entryName}/index.${format == "es" ? "esm" : "cjs"}.js`
        },
        rollupOptions: {
            external: JSON.parse(fs.readFileSync("./vite.external.json", "utf8"))?.external ?? [],
            output: {
                preserveModules: true,
                preserveModulesRoot: "src"
            }
        },
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx", ".d.ts"]
    },
});