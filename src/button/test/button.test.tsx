import { Button } from "../index";
import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";

describe("Button", () => {
    it("Button -> mostra o texto", () => {
        const html = renderToStaticMarkup(
            <Button label="Salvar"/>
        );
        expect(html).toContain("Salvar");
    });

    it("Button -> não aparece quando isVisible é false", () => {
        const html = renderToStaticMarkup(
            <Button
                isVisible={false}
                label="Salvar"/>
        );
        expect(html).toBe("");
    });

    it("Button -> fica desabilitado durante carregamento", () => {
        const html = renderToStaticMarkup(
            <Button
                isLoading
                label="Salvar"/>
        );
        expect(html).toContain("disabled");
    });

    it("Button -> mostra o ícone", () => {
        const html = renderToStaticMarkup(
            <Button
                icon="save"
                label="Salvar"/>
        );
        expect(html).toContain("bi bi-save");
    });

    it("Button -> mostra o conteúdo personalizado", () => {
        const html = renderToStaticMarkup(
            <Button><strong>Enviar</strong></Button>
        );
        expect(html).toContain("<strong>Enviar</strong>");
    });
});
