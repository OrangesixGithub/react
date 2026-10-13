/**
 * Endereço dos arquivos `.wasm` do Perspective, resolvido pelo bundler do consumidor (`?url` do Vite).
 */
declare module "*.wasm?url" {
    const url: string;
    export default url;
}
