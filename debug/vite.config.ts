import * as path from "node:path";
import { defineConfig } from "vite";
//@ts-ignore
import viteReact from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [
        viteReact()
    ],
    resolve: {
        alias: {
            "@orangesix-dev": path.resolve(__dirname, "../src"),
            "@orangesix": path.resolve(__dirname, "./node_modules/@orangesix/react"),
        },
        extensions: [".ts", ".tsx", ".js", ".jsx", ".d.ts"],
    },
    server: {
        fs: {
            allow: ["C:/laragon/www/orangesix/react"]
        }
    }
});
