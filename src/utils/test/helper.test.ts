import $ from "jquery";
import * as Helpers from "../helper";
import { beforeEach, describe, expect, test } from "vitest";

describe("Utils -> Helper", function () {
    beforeEach(() => {
        document.head.innerHTML = "";
        document.body.innerHTML = "";
    });

    test("getCep() -> Valida se o retorno da função retorna os dados do cep informado.", async function () {
        const cep = await Helpers.getCep("37048060");
        const cepError = await Helpers.getCep("000");

        expect(cep?.cep).toBe("37048-060");
        expect(cep?.logradouro).toBe("Rua João Ponciano Pinto");
        expect(cepError?.cep).toBe("");
        expect(cepError?.logradouro).toBe("");
    });

    test("getMetaContent() -> Valida o retorno da função está de acordo com o conteúdo tag 'Meta' na DOM.", function () {
        $("head").append(`
            <meta id="test" name="test" content="http://localhost">
        `);
        expect(Helpers.getMetaContent("test")).toBe("http://localhost");
    });

    test("getElementDOM() -> Valida se o retorno da função retorna o elementos HTML.", async function () {
        $("body").append(`
            <a id="a-test" href="http://localhost">Link 1</a>
            <a id="a-test2" href="http://localhost">Link 2</a>
        `);

        let body = await Helpers.getElementDOM<HTMLBodyElement>();
        let notFound = await Helpers.getElementDOM<null>("#not-found");
        let a = await Helpers.getElementDOM<HTMLAnchorElement>("#a-test");
        let a2 = await Helpers.getElementDOM<HTMLAnchorElement[]>("a", 300, true);

        expect(body).toBeInstanceOf(HTMLBodyElement);
        expect(notFound).toBe(null);
        expect(a?.href).toBe("http://localhost/");
        expect(a2?.length).toBe(2);
    });
});