# Componentes

## Anatomia de um componente

```
src/<componente>/
  index.ts              ← export * from "./<componente>"; export * from "./@types/index";
  <componente>.tsx      ← componente público
  package.json          ← { main/module: "./index.mjs", types: "./index.d.ts" }
  @types/index.d.ts     ← props e tipos públicos
  core/                 ← (opcional) partes internas
    controlled.tsx      ← variante mode="Controlled"
    hookForm.tsx        ← variante mode="HookForm" (Controller do react-hook-form)
  function/ | const.ts  ← (opcional) helpers do componente
```

- O nome da pasta é minúsculo, sem hífen, e é o nome público do import (`@orangesix/<pasta>`).
- **Um componente novo precisa de `index.ts` e `package.json`.** Sem eles, ele não é gerado nem resolvido pelos consumidores. Copie o `package.json` de outra pasta.
- Um componente só vai para o `dist/` quando estiver habilitado em `build/components.ts` (ver `docs/build.md`).
- Tipos compartilhados ficam em `src/api/` (`ApiComponentProps`, `ApiFieldComponentProps`, `ApiFieldControlledProps`, `ApiFieldHookFormProps`...). Helpers de campo (`InputLabel`, `InputFeedback`) também ficam lá.
- Importações entre componentes são relativas (`import { Box } from "../box";`).

## Encapsulando o PrimeReact 11

- O componente Orange Six **mantém a API da 2.x** e traduz internamente para a API do PrimeReact 11. O consumidor nunca deve precisar conhecer o PrimeReact.
- O PrimeReact 11 é **composto** (`Select.Root`, `Select.Trigger`, `Select.List`...) e mudou nomes. Mapeamentos conhecidos da v10 para a v11:

  | v10 | v11 |
  |---|---|
  | `calendar` | `datepicker` |
  | `password` | `inputpassword` |
  | `inputswitch` | `toggleswitch` |
  | `inputtextarea` | `textarea` |
  | `dropdown` / `multiselect` | `select` |
  | `tabview` | `tabs` |
  | `inputmask`, `picklist`, `keyfilter`, `utils`, `api`, `column` | não existem, precisam de solução própria |

  Antes de migrar, confira a API real em `node_modules/primereact/<componente>/` (arquivos `.d.ts`).
- Estilo: **Tailwind v4**. Não usar classes Bootstrap (`me-1`, `w-100`, `text-danger`, `form-label`, `justify-content-*`...).
- Ícones: `primeicons` (`pi pi-*`).

## Padrão de código

### Imports em escada
Ordene os imports pelo comprimento da linha completa: o mais curto em cima, o mais longo embaixo.

```ts
import React from "react";
import { Box } from "../box";
import { SelectHookForm } from "./core/hookForm";
import { SelectControlled } from "./core/controlled";
```

### JSDoc de identificação
Imediatamente antes da declaração:

```tsx
/**
 * Componente - `Select`
 *
 * Um componente versátil que é utilizado para entrada de dados do tipo lista de seleção.
 */
export function Select(...) {}
```

Para as partes internas use `Core - \`<Nome>\``, e para os helpers de `src/api` use `API - \`<Nome>\``.

### Bloco de renderização
Imediatamente antes do `return` principal, exatamente assim:

```tsx
    /*
    |------------------------------------------
    | render() - Renderização do componente
    |------------------------------------------
    */
    return (
        ...
    );
```

### Exports e props
- **Sempre export nomeado**, nunca `export default`. Defina também `<Componente>.displayName = "<Componente>"`.
- Toda prop pública é documentada com JSDoc em `@types/index.d.ts`, em português.
- JSX: uma prop por linha quando houver mais de uma, e props ordenadas (a regra `jsx-sort-props` do ESLint).

Rode `npx eslint <arquivo>` em todo arquivo alterado.

## Checklist de migração de um componente

1. Ler o componente atual e seus `@types` (a API 2.x a preservar).
2. Ler a API do PrimeReact 11 correspondente em `node_modules/primereact/`.
3. Reescrever o motor interno mantendo props e exports.
4. Remover as classes Bootstrap e usar Tailwind.
5. Criar ou atualizar a página do componente no sandbox (`docs/sandbox.md`) e validar visualmente os dois modos (`Controlled` e `HookForm`).
6. **Depois da validação do dono do projeto no sandbox**, habilitar o componente em `build/components.ts` (e as dependências dele, se o build pedir).
7. Rodar lint, `npm run build` e confirmar que o componente não aparece mais nos erros do dts.
8. Atualizar a tabela abaixo.

## Status da migração para PrimeReact 11

| Componente | Status |
|---|---|
| accordion | pendente |
| api | pendente |
| autocomplete | pendente |
| box | pendente |
| button | pendente |
| calendar | pendente |
| editor | pendente |
| input | pendente |
| inputfilter | pendente |
| lightbox | pendente |
| loading | pendente |
| message | pendente |
| modal | pendente |
| multiselect | pendente |
| pdf | pendente |
| picklist | pendente |
| radio | pendente |
| select | pendente |
| switch | pendente |
| table | pendente |
| tablepivot | pendente |
| tabview | pendente |
| textarea | pendente |
| tooltip | pendente |
| utils | pendente |
