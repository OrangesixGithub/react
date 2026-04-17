import * as path from "node:path";
import { defineConfig } from "vite";
import viteReact from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [
        viteReact()
    ],
    optimizeDeps: {
        include: ["jquery"],
    },
    resolve: {
        dedupe: ["react", "react-dom"],
        alias: {
            "@orangesix-dev": path.resolve(__dirname, "../src"),
            "@orangesix": path.resolve(__dirname, "./node_modules/@orangesix/react"),
        },
        extensions: [".ts", ".tsx", ".js", ".jsx", ".d.ts"]
    },
    server: {
        hmr: { protocol: "ws" },
    }
});
