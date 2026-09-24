import ts from "typescript";
import viteDTS from "vite-plugin-dts";

/**
 * Plugin - Gera os arquivos de declaração (`.d.ts`) dos componentes habilitados.
 * O build falha se houver qualquer erro de tipo, evitando publicar tipagens quebradas.
 */
export function viteTypes(options: { components: string[] }) {
    return viteDTS({
        include: options.components.map(name => `src/${name}/**/*.{ts,tsx}`),
        exclude: ["src/**/*.test.ts", "src/**/*.test.tsx"],
        entryRoot: "src",
        insertTypesEntry: false,
        copyDtsFiles: true,
        afterDiagnostic: diagnostics => {
            if (diagnostics.length > 0) {
                throw new Error(`[orangesix] ${diagnostics.length} erro(s) de tipo nos componentes habilitados:\n`
                    + ts.formatDiagnostics(diagnostics, {
                        getCanonicalFileName: file => file,
                        getCurrentDirectory: () => process.cwd(),
                        getNewLine: () => "\n",
                    }));
            }
        },
    });
}
