import { Input } from "../index";
import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";

describe("Input", () => {
    it("Input -> mostra o valor informado", () => {
        const html = renderToStaticMarkup(
            <Input
                readonly
                name="usuario"
                value="Fernando"/>
        );
        expect(html).toContain("value=\"Fernando\"");
    });

    it("Input -> mostra o rótulo", () => {
        const html = renderToStaticMarkup(
            <Input
                readonly
                label="Usuário"
                name="usuario"
                value=""/>
        );
        expect(html).toContain("Usuário");
    });

    it("Input -> fica desabilitado", () => {
        const html = renderToStaticMarkup(
            <Input
                disabled
                readonly
                value=""/>
        );
        expect(html).toContain("disabled");
    });

    it("Input -> mostra a mensagem de erro", () => {
        const html = renderToStaticMarkup(
            <Input
                readonly
                error="Campo obrigatório"
                value=""/>
        );
        expect(html).toContain("Campo obrigatório");
    });

    it("Input -> renderiza um campo de senha", () => {
        const html = renderToStaticMarkup(
            <Input
                readonly
                type="password"
                value="segredo"/>
        );
        expect(html).toContain("type=\"password\"");
    });

    it("Input -> aplica a largura informada", () => {
        const html = renderToStaticMarkup(
            <Input
                readonly
                size="50"
                value=""/>
        );
        expect(html).toContain("--box-width:50%");
    });
});
