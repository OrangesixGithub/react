import { Input } from "../index";
import { act, useState } from "react";
import { describe, expect, it } from "vitest";
import { useForm } from "react-hook-form";
import { createRoot } from "react-dom/client";
import { renderToStaticMarkup } from "react-dom/server";
import { PrimeReactProvider } from "@primereact/core/config";

function render(input: React.ReactNode) {
    return renderToStaticMarkup(<PrimeReactProvider license="">{input}</PrimeReactProvider>);
}

describe("Input", () => {
    it("renderiza texto controlado com rótulo e feedback", () => {
        const html = render(<Input
            error="Valor inválido"
            id="nome"
            label="Nome"
            value="Ana"
            onChange={() => {}}/>);
        expect(html).toContain("for=\"nome\"");
        expect(html).toContain("value=\"Ana\"");
        expect(html).toContain("Valor inválido");
    });

    it("usa a composição numérica do PrimeReact 11", () => {
        const html = render(<Input
            numberCurrency="BRL"
            numberMode="currency"
            type="number"
            value={12.5}
            onChange={() => {}}/>);
        expect(html).toContain("role=\"spinbutton\"");
        expect(html).toContain("12,50");
    });

    it("aceita CPF e mantém a referência de senha", () => {
        const masked = render(<Input
            mask="cpf"
            value="123.456.789-09"
            onChange={() => {}}/>);
        const password = render(<Input
            passwordFeedback
            passwordShow
            type="password"
            value="senha123"
            onChange={() => {}}/>);
        expect(masked).toContain("123.456.789-09");
        expect(password).toContain("Mostrar senha");
        expect(password).toContain("Média");
    });

    it("mantém o modo HookForm", () => {
        function Form() {
            const { control } = useForm({ defaultValues: { email: "ana@exemplo.com" } });
            return <Input
                control={control}
                label="E-mail"
                mode="HookForm"
                name="email"
                type="email"/>;
        }
        const html = render(<Form/>);
        expect(html).toContain("ana@exemplo.com");
        expect(html).toContain("E-mail");
    });

    it("exibe o valor sem campo no modo somente leitura", () => {
        const html = render(<Input
            readonly
            readonlyType="label"
            value="Concluído"/>);
        expect(html).toContain("Concluído");
        expect(html).not.toContain("<input");
    });

    it("aplica a máscara ao digitar e entrega o valor formatado", async () => {
        const container = document.createElement("div");
        const root = createRoot(container);
        let value = "";
        let inputRef: HTMLInputElement | null = null;
        function Masked() {
            const [current, setCurrent] = useState("");
            return <Input
                mask="cpf"
                ref={node => { inputRef = node; }}
                value={current}
                onChange={next => {
                    value = next;
                    setCurrent(next);
                }}/>;
        }
        await act(async () => root.render(<PrimeReactProvider license=""><Masked/></PrimeReactProvider>));
        const input = container.querySelector("input")!;
        expect(inputRef).toBe(input);
        await act(async () => {
            const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")!.set!;
            setter.call(input, "12345678909");
            input.dispatchEvent(new Event("input", { bubbles: true }));
        });
        expect(value).toBe("123.456.789-09");
        await act(async () => root.unmount());
    });
});
