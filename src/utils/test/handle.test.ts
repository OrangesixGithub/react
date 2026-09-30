import * as Handle from "../handle";
import { describe, expect, it } from "vitest";

describe("Utils -> Handle", () => {
    it("handleHours -> formata uma hora", () => {
        const resultado = Handle.handleHours("1");
        expect(resultado).toBe("01:00");
    });

    it("handleNumber -> formata um número decimal", () => {
        const resultado = Handle.handleNumber("1,20");
        expect(resultado).toBe("1.20");
    });

    it("handleDateFormat -> formata uma data", () => {
        const resultado = Handle.handleDateFormat("2025-07-31");
        expect(resultado).toBe("31/07/2025");
    });

    it("handleDateFormat -> trata uma data inválida", () => {
        const resultado = Handle.handleDateFormat("data inválida");
        expect(resultado).toBe("-");
    });
});
