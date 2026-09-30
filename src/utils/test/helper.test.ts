import * as Helpers from "../helper";
import { describe, expect, it } from "vitest";

describe("Utils -> Helper", () => {
    it("getMetaContent -> lê o conteúdo da tag meta", () => {
        const meta = document.createElement("meta");
        meta.id = "teste-conteudo";
        meta.content = "exemplo";
        document.head.appendChild(meta);

        const resultado = Helpers.getMetaContent("teste-conteudo");
        meta.remove();

        expect(resultado).toBe("exemplo");
    });

    it("getMetaContent -> retorna null quando a tag não existe", () => {
        const resultado = Helpers.getMetaContent("meta-inexistente");
        expect(resultado).toBeNull();
    });

    it("getElementDOM -> encontra um elemento pelo id", async () => {
        const elemento = document.createElement("div");
        elemento.id = "teste-elemento";
        document.body.appendChild(elemento);

        const resultado = await Helpers.getElementDOM<HTMLDivElement>("#teste-elemento");
        elemento.remove();

        expect(resultado).toBe(elemento);
    });
});
