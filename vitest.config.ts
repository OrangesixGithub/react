import { defineConfig } from "vitest/config";
import viteReact from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [viteReact()],
    test: {
        environment: "jsdom",
        globals: true,
        environmentOptions: {
            jsdom: {
                url: "https://viacep.com.br"
            }
        }
    }
});