import { describe, expect, it } from "vitest";
import { InputFeedback, InputLabel } from "../input";
import { renderToStaticMarkup } from "react-dom/server";

describe("API -> Input", () => {
    it("InputLabel -> mostra o rótulo", () => {
        const html = renderToStaticMarkup(
            <InputLabel label="Usuário"/>
        );
        expect(html).toContain("Usuário");
    });

    it("InputLabel -> associa o rótulo ao campo", () => {
        const html = renderToStaticMarkup(
            <InputLabel
                id="usuario"
                label="Usuário"/>
        );
        expect(html).toContain("for=\"usuario\"");
    });

    it("InputLabel -> mostra o ícone", () => {
        const html = renderToStaticMarkup(
            <InputLabel
                icon="user"
                label="Usuário"/>
        );
        expect(html).toContain("bi bi-user");
    });

    it("InputFeedback -> mostra a mensagem de erro", () => {
        const html = renderToStaticMarkup(
            <InputFeedback error="Valor inválido"/>
        );
        expect(html).toContain("Valor inválido");
    });

    it("InputFeedback -> fica vazio sem erro", () => {
        const html = renderToStaticMarkup(
            <InputFeedback/>
        );
        expect(html).toBe("<div aria-live=\"polite\"></div>");
    });
});
