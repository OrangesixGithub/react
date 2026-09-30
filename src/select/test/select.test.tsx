import { Select } from "../index";
import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";

describe("Select", () => {
    it("Select -> mostra as opções", () => {
        const html = renderToStaticMarkup(
            <Select
                readonly
                options={[{ id: 1, name: "Ativo" }, { id: 2, name: "Inativo" }]}
                value={1}/>
        );
        expect(html).toContain("Ativo");
        expect(html).toContain("Inativo");
    });

    it("Select -> marca a opção selecionada", () => {
        const html = renderToStaticMarkup(
            <Select
                readonly
                options={[{ id: 1, name: "Ativo" }, { id: 2, name: "Inativo" }]}
                value={2}/>
        );
        expect(html).toContain("value=\"2\" selected=\"\"");
    });

    it("Select -> mostra a legenda inicial", () => {
        const html = renderToStaticMarkup(
            <Select
                readonly
                init="Escolha uma opção"
                options={[]}
                value=""/>
        );
        expect(html).toContain("Escolha uma opção");
    });

    it("Select -> fica desabilitado", () => {
        const html = renderToStaticMarkup(
            <Select
                disabled
                readonly
                options={[{ id: 1, name: "Ativo" }]}
                value={1}/>
        );
        expect(html).toContain("disabled");
    });

    it("Select -> mostra a mensagem de erro", () => {
        const html = renderToStaticMarkup(
            <Select
                readonly
                error="Escolha uma situação"
                options={[]}
                value=""/>
        );
        expect(html).toContain("Escolha uma situação");
    });
});
