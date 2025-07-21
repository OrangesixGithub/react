import * as Helpers from "../helper";
import { beforeEach, describe, expect, test } from "vitest";

describe("Utils -> Helper", function () {
    beforeEach(() => {
        document.head.innerHTML = "";
        document.body.innerHTML = "";
    });

    test("getMetaContent() -> Verifica o conteúdo tag 'Meta' na DOM de acordo do ID", function () {
        const metaID = "test";
        const metaContent = "http://localhost";
        const metaElement = document.createElement("meta");
        metaElement.id = metaID;
        metaElement.content = metaContent;
        document.head.appendChild(metaElement);

        expect(Helpers.getMetaContent(metaID)).toBe(metaContent);
    });

    test("getCep() -> Verifica o retorno da função buscar CEP", async function () {
        let cep = await Helpers.getCep("37048060");
        let cepError = await Helpers.getCep("000");

        expect(cep?.cep).toBe("37048-060");
        expect(cep?.logradouro).toBe("Rua João Ponciano Pinto");
        expect(cepError?.cep).toBe("");
        expect(cepError?.logradouro).toBe("");
    });
});