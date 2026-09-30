import { Switch } from "../index";
import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";

describe("Switch", () => {
    it("Switch -> marca o valor verdadeiro", () => {
        const html = renderToStaticMarkup(
            <Switch
                readonly
                name="ativo"
                value={true}/>
        );
        expect(html).toContain("checked=\"\"");
    });

    it("Switch -> desmarca o valor falso", () => {
        const html = renderToStaticMarkup(
            <Switch
                readonly
                name="ativo"
                value={false}/>
        );
        expect(html).toContain("aria-checked=\"false\"");
    });

    it("Switch -> marca o valor verdadeiro personalizado", () => {
        const html = renderToStaticMarkup(
            <Switch
                readonly
                value="S"
                valueFalse="N"
                valueTrue="S"/>
        );
        expect(html).toContain("aria-checked=\"true\"");
    });

    it("Switch -> desmarca o valor falso personalizado", () => {
        const html = renderToStaticMarkup(
            <Switch
                readonly
                value="N"
                valueFalse="N"
                valueTrue="S"/>
        );
        expect(html).toContain("aria-checked=\"false\"");
    });

    it("Switch -> associa a legenda ao campo", () => {
        const html = renderToStaticMarkup(
            <Switch
                readonly
                id="ativo"
                legend="Receber notificações"
                value={false}/>
        );
        expect(html).toContain("for=\"ativo\"");
        expect(html).toContain("Receber notificações");
    });

    it("Switch -> fica desabilitado", () => {
        const html = renderToStaticMarkup(
            <Switch
                disabled
                readonly
                value={false}/>
        );
        expect(html).toContain("disabled=\"\"");
    });

    it("Switch -> mostra a mensagem de erro", () => {
        const html = renderToStaticMarkup(
            <Switch
                readonly
                error="Campo obrigatório"
                value={false}/>
        );
        expect(html).toContain("Campo obrigatório");
    });

    it("Switch -> preserva o valor personalizado no envio em somente leitura", () => {
        const html = renderToStaticMarkup(
            <Switch
                readonly
                name="ativo"
                value="N"
                valueFalse="N"
                valueTrue="S"/>
        );
        expect(html).toContain("type=\"hidden\" name=\"ativo\" value=\"N\"");
    });
});
