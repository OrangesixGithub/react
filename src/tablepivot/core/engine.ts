import type { Client } from "../@types/perspective";

let engine: Promise<Client> | undefined;

/**
 * Janela que hospeda o motor para pivots renderizados nela a partir de iframes (ex.: modal com `appendTo` na
 * janela principal).
 */
type PivotHostWindow = Window & {
    __orangesixTablePivotHost?: { initialize: () => Promise<Client> }
};

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

/**
 * Core - `initializeTablePivot`
 *
 * Registra a janela atual como host do TablePivot. Chame uma vez na entrada da aplicação principal (fora dos
 * iframes), após importar o style.css do pacote. Assim, um pivot criado em um iframe e renderizado nesta janela
 * (ex.: modal com `appendTo` no body principal) usa o motor desta janela. O WASM continua sendo carregado sob demanda.
 */
export function initializeTablePivot(): void {
    if (typeof window === "undefined") {
        return;
    }
    (window as PivotHostWindow).__orangesixTablePivotHost ??= { initialize: initializePerspective };
}

/**
 * Core - `initializePerspectiveFor`
 *
 * Devolve o motor da janela onde o pivot foi renderizado. Elementos e estilos do Perspective pertencem ao documento
 * que os criou, por isso um pivot em outra janela precisa do motor dela (registrado com `initializeTablePivot`).
 */
export function initializePerspectiveFor(target: Window): Promise<Client> {
    if (target === window) {
        return initializePerspective();
    }
    const host = (target as PivotHostWindow).__orangesixTablePivotHost;
    if (!host) {
        return Promise.reject(new Error(
            "o pivot foi renderizado em outra janela. Chame initializeTablePivot() na aplicação principal.",
        ));
    }
    return host.initialize();
}
