import * as path from "node:path";
import { defineConfig } from "vite";
import viteReact from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [
        viteReact()
    ],
    resolve: {
        alias: {
            "@orangesix": path.resolve(__dirname, "../dist"),
            "@orangesix-dev": path.resolve(__dirname, "../src"),
        },
        extensions: [".ts", ".tsx", ".js", ".jsx", ".d.ts"],
    }
});
