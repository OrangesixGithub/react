import { Radio } from "../index";
import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";

const options = [{ value: "yes", label: "Sim" }, { value: "no", label: "Não", disabled: true }];

describe("Radio", () => {
    it("mostra as opções com nome e valor no input nativo", () => {
        const html = renderToStaticMarkup(<Radio
            readonly
            name="choice"
            options={options}
            value="yes"/>);
        expect(html).toContain("name=\"choice\"");
        expect(html).toContain("value=\"yes\"");
        expect(html).toContain("Não");
    });
    it("marca a opção selecionada", () => {
        const html = renderToStaticMarkup(<Radio
            readonly
            name="choice"
            options={options}
            value="yes"/>);
        expect(html).toMatch(/<input(?=[^>]*checked="")(?=[^>]*value="yes")[^>]*>/);
    });
    it("desabilita somente a opção indicada", () => {
        const html = renderToStaticMarkup(<Radio name="choice"
            options={options}
            value="yes"
            onChange={() => {}}/>);
        expect(html).toMatch(/<input[^>]*disabled=""[^>]*value="no"/);
        expect(html).not.toMatch(/<input[^>]*disabled=""[^>]*value="yes"/);
    });
    it("organiza as opções em coluna", () => {
        const html = renderToStaticMarkup(<Radio
            readonly
            align="column"
            name="choice"
            options={options}
            value="yes"/>);
        expect(html).toContain("flex-col");
    });
    it("associa o erro ao grupo", () => {
        const html = renderToStaticMarkup(<Radio
            readonly
            error="Escolha uma opção"
            id="custom"
            name="choice"
            options={options}
            value=""/>);
        expect(html).toContain("aria-invalid=\"true\"");
        expect(html).toContain("aria-describedby=\"custom-feedback\"");
        expect(html).toContain("Escolha uma opção");
    });
    it("exibe o rótulo da opção em somente leitura como texto", () => {
        const html = renderToStaticMarkup(<Radio
            readonly
            name="choice"
            options={options}
            readonlyType="label"
            value="yes"/>);
        expect(html).toContain("<p>Sim</p>");
        expect(html).not.toContain("type=\"radio\"");
    });
});
