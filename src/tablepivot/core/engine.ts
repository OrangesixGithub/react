import type { Client } from "../@types/perspective";

let engine: Promise<Client> | undefined;

/**
 * Inicializa o client, o viewer e o plugin de grade.
 */
async function initialize(): Promise<Client> {
    const [client, viewer, serverWasm, clientWasm] = await Promise.all([
        import("@perspective-dev/client"),
        import("@perspective-dev/viewer"),
        import("@perspective-dev/server/dist/wasm/perspective-server.wasm?url"),
        import("@perspective-dev/viewer/dist/wasm/perspective-viewer.wasm?url"),
    ]);

    await Promise.all([
        client.default.init_server(fetch(serverWasm.default)),
        viewer.default.init_client(fetch(clientWasm.default)),
    ]);
    await import("@perspective-dev/viewer-datagrid");

    return client.default.worker();
}

/**
 * Core - `initializePerspective`
 *
 * Carrega o motor do Perspective (WASM do servidor e do viewer, plugin de grade) uma única vez e devolve o worker
 * compartilhado por todos os `TablePivot` da página. O carregamento é sob demanda: as telas sem pivot não baixam
 * os arquivos `.wasm`.
 */
export function initializePerspective(): Promise<Client> {
    engine ??= initialize().catch(error => {
        engine = undefined;
        throw error;
    });
    return engine;
}
