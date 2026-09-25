import { Button } from "../index";
import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { PrimeReactProvider } from "@primereact/core/config";

describe("Button", () => {
    it("Button -> renderiza rótulo, ícone e badge por padrão", () => {
        const html = renderToStaticMarkup(
            <PrimeReactProvider license="">
                <Button
                    badge="3"
                    icon="save"
                    label="Enviar"/>
            </PrimeReactProvider>
        );
        expect(html).toContain("<button");
        expect(html).toContain("<span>Enviar</span>");
        expect(html).toContain("pi pi-save");
        expect(html).toContain(">3</span>");
        expect(html).toContain("rounded-md");
    });

    it("Button -> mantém ícones Bootstrap quando o prefixo é informado", () => {
        const html = renderToStaticMarkup(
            <PrimeReactProvider license="">
                <Button
                    icon="save"
                    iconPrefix="bi bi-"
                    label="Gravar"/>
            </PrimeReactProvider>
        );
        expect(html).toContain("bi bi-save");
    });

    it("Button -> renderiza apenas children quando informado", () => {
        const html = renderToStaticMarkup(
            <PrimeReactProvider license="">
                <Button
                    badge="3"
                    icon="save"
                    label="Enviar"><strong>agora</strong></Button>
            </PrimeReactProvider>
        );
        expect(html).toContain("<strong>agora</strong>");
        expect(html).not.toContain("Enviar");
        expect(html).not.toContain("pi-save");
        expect(html).not.toContain(">3</span>");
    });

    it("Button -> aplica bordas totalmente arredondadas com rounded", () => {
        const rounded = renderToStaticMarkup(
            <PrimeReactProvider license="">
                <Button
                    rounded
                    label="Redondo"/>
            </PrimeReactProvider>
        );
        expect(rounded).toContain("rounded-full");
        expect(rounded).not.toContain("rounded-md");
    });
});
