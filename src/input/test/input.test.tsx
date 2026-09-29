import { Input } from "../index";
import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";

describe("Input", () => {
    it("Input -> encaminha a largura responsiva da API ao Box", () => {
        const html = renderToStaticMarkup(
            <Input
                readonly
                name="usuario"
                size={{ base: "100", md: "50", xl: "25" }}
                value="Fernando"/>
        );
        expect(html).toContain("--box-width:100%");
        expect(html).toContain("--box-width-md:50%");
        expect(html).toContain("--box-width-xl:25%");
        expect(html).toContain("md:w-[calc(var(--box-width-md)-var(--spacing-box,0px))]");
        expect(html).toContain("xl:w-[calc(var(--box-width-xl)-var(--spacing-box,0px))]");
        expect(html).toContain("value=\"Fernando\"");
    });
});
