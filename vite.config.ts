import path from "path";
import { defineConfig } from "vite";
import { viteTypes } from "./build/types";
import { viteStyle } from "./build/style";
import viteReact from "@vitejs/plugin-react";
import { viteExternal } from "./build/external";
import { viteComponentEntries } from "./build/entries";
import { enabledComponents } from "./build/components";
import { vitePackageManifest } from "./build/manifest";

const root = __dirname;
const srcDir = path.resolve(root, "src");
const components = enabledComponents(srcDir);

export default defineConfig({
    plugins: [
        viteReact(),
        viteTypes({ components }),
        vitePackageManifest({
            root,
            srcDir,
            components
        }),
        viteStyle({
            input: path.resolve(srcDir, "style/style.css"),
            fonts: path.resolve(root, "node_modules/primeicons/fonts"),
            scan: components.map(name => path.join(srcDir, name)),
        })
    ],
    build: {
        outDir: path.resolve(root, "dist"),
        emptyOutDir: true,
        sourcemap: true,
        lib: {
            entry: viteComponentEntries(srcDir, components),
            formats: ["es"],
            fileName: (_format, entryName) => `${entryName}.mjs`
        },
        rolldownOptions: {
            external: viteExternal(path.resolve(root, "package.json")),
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
