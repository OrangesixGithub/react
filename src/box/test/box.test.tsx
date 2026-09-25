import { describe, expect, it } from "vitest";
import { Box } from "../index";
import { renderToStaticMarkup } from "react-dom/server";

describe("Box", () => {
    it("Box -> aplica largura total e direção horizontal por padrão", () => {
        const html = renderToStaticMarkup(<Box>Conteúdo</Box>);
        expect(html).toContain("flex-row");
        expect(html).toContain("--box-width:100%");
        expect(html).not.toContain("style=\"width:");
        expect(html).toContain("Conteúdo");
    });

    it("Box -> combina alinhamento com classes responsivas e CSS personalizado", () => {
        const html = renderToStaticMarkup(
            <Box
                align="items-center"
                className="gap-2 md:items-start"
                css={{ color: "red", width: "42%" }}
                direction="column"
                id="exemplo"
                justify="justify-between"
                size="12-5">Conteúdo</Box>
        );
        expect(html).toContain("flex-col items-center justify-between gap-2 md:items-start");
        expect(html).toContain("id=\"exemplo\"");
        expect(html).toContain("width:42%");
        expect(html).toContain("color:red");
    });

    it("Box -> converte tamanho fracionário em porcentagem", () => {
        const html = renderToStaticMarkup(<Box size="17-5">Conteúdo</Box>);
        expect(html).toContain("--box-width:17.5%");
    });

    it("Box -> aplica larguras por breakpoint e mantém o último valor definido", () => {
        const html = renderToStaticMarkup(
            <Box size={{ base: "100", md: "50", xl: "25" }}>Conteúdo</Box>
        );
        expect(html).toContain("--box-width:100%");
        expect(html).not.toContain("--box-width-sm:");
        expect(html).toContain("--box-width-md:50%");
        expect(html).not.toContain("--box-width-lg:");
        expect(html).toContain("--box-width-xl:25%");
        expect(html).toContain("md:w-[var(--box-width-md)]");
        expect(html).toContain("xl:w-[var(--box-width-xl)]");
    });

    it("Box -> renderiza o elemento HTML solicitado e encaminha seus atributos", () => {
        const html = renderToStaticMarkup(
            <Box
                as="a"
                href="/detalhes"
                title="Detalhes">Abrir</Box>
        );
        expect(html).toContain("<a ");
        expect(html).toContain("href=\"/detalhes\"");
        expect(html).toContain("title=\"Detalhes\"");
        expect(html).toContain("Abrir</a>");
    });
});
