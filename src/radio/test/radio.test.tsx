import { Radio } from "../index";
import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";

describe("Radio", () => {
    it("Radio -> mostra as opções", () => {
        const html = renderToStaticMarkup(
            <Radio
                readonly
                name="situacao"
                options={[{ value: "ativo", label: "Ativo" }, { value: "inativo", label: "Inativo" }]}
                value="ativo"/>
        );
        expect(html).toContain("Ativo");
        expect(html).toContain("Inativo");
    });

    it("Radio -> marca a opção selecionada", () => {
        const html = renderToStaticMarkup(
            <Radio
                readonly
                name="situacao"
                options={[{ value: "ativo", label: "Ativo" }]}
                value="ativo"/>
        );
        expect(html).toContain("checked=\"\" value=\"ativo\"");
    });

    it("Radio -> desabilita a opção indicada", () => {
        const html = renderToStaticMarkup(
            <Radio
                name="situacao"
                options={[{ value: "bloqueado", label: "Bloqueado", disabled: true }]}
                value=""
                onChange={() => {}}/>
        );
        expect(html).toContain("disabled=\"\"");
    });

    it("Radio -> organiza as opções em coluna", () => {
        const html = renderToStaticMarkup(
            <Radio
                readonly
                align="column"
                name="situacao"
                options={[{ value: "ativo", label: "Ativo" }]}
                value="ativo"/>
        );
        expect(html).toContain("flex-col");
    });

    it("Radio -> mostra a mensagem de erro", () => {
        const html = renderToStaticMarkup(
            <Radio
                readonly
                error="Escolha uma situação"
                name="situacao"
                options={[]}
                value=""/>
        );
        expect(html).toContain("Escolha uma situação");
    });

    it("Radio -> mostra a seleção como texto em somente leitura", () => {
        const html = renderToStaticMarkup(
            <Radio
                readonly
                name="situacao"
                options={[{ value: "ativo", label: "Ativo" }]}
                readonlyType="label"
                value="ativo"/>
        );
        expect(html).toContain("<p>Ativo</p>");
        expect(html).not.toContain("type=\"radio\"");
    });
});
