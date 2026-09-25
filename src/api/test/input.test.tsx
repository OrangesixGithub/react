import { describe, expect, it } from "vitest";
import { InputFeedback, InputLabel } from "../input";
import { renderToStaticMarkup } from "react-dom/server";

describe("API -> Input", () => {

    it("InputLabel -> associa o rótulo ao campo e mostra ícone e obrigatoriedade", () => {
        const html = renderToStaticMarkup(
            <InputLabel
                required
                icon="user"
                id="usuario"
                label="Usuário"/>
        );
        expect(html).toContain("for=\"usuario\"");
        expect(html).toContain("bi bi-user");
        expect(html).toContain("Usuário");
        expect(html).toContain("text-red-600");
    });

    it("InputFeedback -> exibe erros em Controlled e HookForm", () => {
        const controlled = renderToStaticMarkup(
            <InputFeedback
                error="Valor inválido"
                mode="Controlled"
                name="usuario.email"/>
        );
        const withoutError = renderToStaticMarkup(
            <InputFeedback
                mode="HookForm"
                name="usuario.email"/>
        );
        const withError = renderToStaticMarkup(
            <InputFeedback
                errors={{ usuario: { email: { type: "required", message: "E-mail obrigatório" } } }}
                mode="HookForm"
                name="usuario.email"/>
        );
        expect(withoutError).not.toContain("E-mail obrigatório");
        expect(controlled).toContain("Valor inválido");
        expect(withError).toContain("E-mail obrigatório");
        expect(withError).toContain("id=\"usuario.email-feedback\"");
    });
});
