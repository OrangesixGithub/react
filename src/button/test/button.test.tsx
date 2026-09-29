import { Button } from "../index";
import { describe, expect, it } from "vitest";
import { PrimeReactProvider } from "primereact/api";
import { renderToStaticMarkup } from "react-dom/server";

describe("Button", () => {
    it("Button -> não renderiza quando isVisible é false", () => {
        const html = renderToStaticMarkup(<Button
            isVisible={false}
            label="Oculto"/>);
        expect(html).toBe("");
    });

    it("Button -> impede cliques durante carregamento sem estilos do PrimeReact", () => {
        const html = renderToStaticMarkup(<Button
            isLoading
            label="Salvar"/>);
        expect(html).toContain("disabled");
        expect(html).toContain("aria-busy=\"true\"");
        expect(html).not.toContain("p-button");
        expect(html).not.toContain("pIf");
    });

    it("Button -> renderiza rótulo, ícone e badge por padrão", () => {
        const html = renderToStaticMarkup(
            <PrimeReactProvider value={{ unstyled: true }}>
                <Button
                    badge="3"
                    icon="save"
                    label="Enviar"/>
            </PrimeReactProvider>
        );
        expect(html).toContain("<button");
        expect(html).toContain("<span>Enviar</span>");
        expect(html).toContain("bi bi-save");
        expect(html).toContain(">3</span>");
        expect(html).toContain("rounded-md");
    });

    it("Button -> aceita PrimeIcons quando o prefixo é informado", () => {
        const html = renderToStaticMarkup(
            <PrimeReactProvider value={{ unstyled: true }}>
                <Button
                    icon="save"
                    iconPrefix="pi pi-"
                    label="Gravar"/>
            </PrimeReactProvider>
        );
        expect(html).toContain("pi pi-save");
    });

    it("Button -> renderiza apenas children quando informado", () => {
        const html = renderToStaticMarkup(
            <PrimeReactProvider value={{ unstyled: true }}>
                <Button
                    badge="3"
                    icon="save"
                    label="Enviar"><strong>agora</strong></Button>
            </PrimeReactProvider>
        );
        expect(html).toContain("<strong>agora</strong>");
        expect(html).not.toContain("Enviar");
        expect(html).not.toContain("pi-save");
        expect(html).not.toContain("bi-save");
        expect(html).not.toContain(">3</span>");
    });

    it("Button -> aplica bordas totalmente arredondadas com rounded", () => {
        const rounded = renderToStaticMarkup(
            <PrimeReactProvider value={{ unstyled: true }}>
                <Button
                    rounded
                    label="Redondo"/>
            </PrimeReactProvider>
        );
        expect(rounded).toContain("rounded-full");
        expect(rounded).not.toContain("rounded-md");
    });
});
