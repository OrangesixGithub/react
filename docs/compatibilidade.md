# Compatibilidade com os consumidores

A 3.x precisa entrar nos projetos que usam a 2.x (ex.: `diretriz-crm`, hoje na 2.4.0) **sem alterar os imports existentes dos componentes**. A aplicação instala o PrimeReact 11 e configura sua chave PrimeUI no provider da raiz.

## Como os projetos consomem o pacote

No `vite.config.ts` e no `tsconfig.json` do consumidor:

```ts
// vite.config.ts
resolve: {
    alias: { "@orangesix": path.resolve(__dir, "./node_modules/@orangesix/react") }
}
```
```json
// tsconfig.json
"paths": { "@orangesix/*": ["./node_modules/@orangesix/react/*"] }
```

E no código:

```ts
import { Box } from "@orangesix/box";
import { Table } from "@orangesix/table";
import { RadioProps } from "@orangesix/radio/@types";
```

O alias cai direto na **pasta** do componente. A partir daí:
- o **Vite** lê o `package.json` da pasta (`module` → `index.mjs`);
- o **TypeScript** lê o `package.json` da pasta (`types` → `index.d.ts`).

## O que é contrato público (não quebrar)

- **O nome de cada pasta de componente**, igual ao nome em `src/` (`box`, `button`, `input`, `select`, `table`, `tabview`, `utils`...). Um consumidor chega a ter centenas de imports de uma mesma pasta.
- **`dist/<comp>/package.json`**, com `main`/`module`/`types`.
- **`dist/<comp>/@types/index.d.ts`**, porque há imports profundos em `@types`.
- **Os nomes exportados** (`Box`, `Button`, `InputProps`...) e as props existentes.
- **O modo dos campos:** `mode="Controlled"` (padrão) e `mode="HookForm"` (com `control` do react-hook-form).

## Regras para mudanças

- **Renomear uma pasta ou um export:** não fazer. Se o componente do PrimeReact mudou de nome (ex.: `calendar` → `datepicker`), a pasta e o export da Orange Six **continuam com o nome antigo**.
- **Remover uma prop:** marcar com `@deprecated` e manter aceitando o valor, mesmo que seja ignorado.
- **Adicionar `exports` no `package.json` raiz:** não fazer. O alias do consumidor ignora esse campo, e ele pode bloquear imports profundos.
- **Mudar o formato ou a extensão dos arquivos:** só junto com os `package.json` das pastas, que devem apontar para o arquivo certo.

## Migração 2.x → 3.x no consumidor

Remover:
```scss
@import "../../../../node_modules/@orangesix/react/style/scss/bootstrap";
```
```js
import "@orangesix/pdf/style/pdf.css";
```

Adicionar uma vez, no ponto de entrada:
```js
import "@orangesix/react/style.css";
```

Instalar as dependências do PrimeReact no projeto consumidor:
```bash
npm install primereact@^11.1.0 @primereact/core@^11.1.0
```

Envolver a aplicação uma vez com o provider do PrimeReact e informar a chave PrimeUI do próprio projeto:
```tsx
import { PrimeReactProvider } from "@primereact/core/config";

<PrimeReactProvider license={import.meta.env.VITE_PRIMEUI_LICENSE}>
    <App/>
</PrimeReactProvider>
```

Outros requisitos da 3.x: **React 19** (exigido pelo PrimeReact 11) e `react-hook-form` ^7.
