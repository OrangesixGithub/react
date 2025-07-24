import * as Helpers from "../helper";
import { beforeEach, describe, expect, test } from "vitest";

describe("Utils -> Helper", function () {
    beforeEach(() => {
        document.head.innerHTML = "";
        document.body.innerHTML = "";
    });

    test("getMetaContent() -> Valida o retorno da função está de acordo com o conteúdo tag 'Meta' na DOM.", function () {
        const metaID = "test";
        const metaContent = "http://localhost";
        const metaElement = document.createElement("meta");
        metaElement.id = metaID;
        metaElement.content = metaContent;
        document.head.appendChild(metaElement);

        expect(Helpers.getMetaContent(metaID)).toBe(metaContent);
    });

    test("getCep() -> Valida se o retorno da função está correto.", async function () {
        const cep = await Helpers.getCep("37048060");
        const cepError = await Helpers.getCep("000");

        expect(cep?.cep).toBe("37048-060");
        expect(cep?.logradouro).toBe("Rua João Ponciano Pinto");
        expect(cepError?.cep).toBe("");
        expect(cepError?.logradouro).toBe("");
    });

    test("getElementDOM() -> Valida se o retorno da função está correto", async function () {
        const button = document.createElement("button");
        const a = document.createElement("a");
        a.id = "a-test";
        button.id = "button-test";
        document.body.appendChild(a);
        document.body.appendChild(button);

        let element1 = await Helpers.getElementDOM("#a-test");
        let element2 = await Helpers.getElementDOM("#not-found");

        // expect(element1?.[0]).toBeInstanceOf(HTMLAnchorElement);
        // expect(element2?.[0]).toBe(null);
    });
});