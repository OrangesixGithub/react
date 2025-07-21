import { describe, expect, test } from "vitest";
import * as Handle from "../handle";

describe("Utils -> Handle", function () {
    test("handleHours() -> Verificar se os formatos de horas estão corretos", function () {
        expect(Handle.handleHours("1")).toBe("01:00");
        expect(Handle.handleHours("2")).toBe("02:00");
        expect(Handle.handleHours("2.10")).toBe("02:10");
        expect(Handle.handleHours("0.10")).toBe("00:10");
        expect(Handle.handleHours("200.10")).toBe("200:10");
    });

    test("handleNumber() -> Verificar se formatação do valor numérico para o formato decimal ou monetário estão corretas", function () {
        expect(Handle.handleNumber("1")).toBe("1.00");
        expect(Handle.handleNumber("1,20")).toBe("1.20");
        expect(Handle.handleNumber("1.20")).toBe("1.20");
        expect(Handle.handleNumber("1.20", "decimal", 4)).toBe("1.2000");
        expect(Handle.handleNumber("1.20", "money")).toBe("R$ 1,20");
        expect(Handle.handleNumber("1,20", "money")).toBe("R$ 1,20");
        expect(Handle.handleNumber("200,2024", "money")).toBe("R$ 200,20");
    });
});