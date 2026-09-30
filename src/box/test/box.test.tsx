import { Box } from "../box";
import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";

describe("Box", () => {
    it("Box -> mostra o conteúdo", () => {
        const html = renderToStaticMarkup(
            <Box>Conteúdo</Box>
        );
        expect(html).toContain("Conteúdo");
    });

    it("Box -> usa largura total por padrão", () => {
        const html = renderToStaticMarkup(
            <Box>Conteúdo</Box>
        );
        expect(html).toContain("--box-width:100%");
    });

    it("Box -> aplica a largura informada", () => {
        const html = renderToStaticMarkup(
            <Box size="50">Conteúdo</Box>
        );
        expect(html).toContain("--box-width:50%");
    });

    it("Box -> organiza o conteúdo em coluna", () => {
        const html = renderToStaticMarkup(
            <Box direction="column">Conteúdo</Box>
        );
        expect(html).toContain("flex-col");
    });

    it("Box -> renderiza o elemento solicitado", () => {
        const html = renderToStaticMarkup(
            <Box as="section">Conteúdo</Box>
        );
        expect(html).toContain("<section");
    });
});
