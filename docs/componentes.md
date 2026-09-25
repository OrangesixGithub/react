# Componentes

## Referência para as próximas migrações: `src/api`

O componente `api` compilou com `npm run build` e serve como base para a **estrutura** dos próximos componentes. Antes de migrar uma pasta, consulte [seus exports](../src/api/index.ts), [o índice de tipos](../src/api/@types/index.d.ts), [os testes](../src/api/test/input.test.tsx) e [o manifesto](../src/api/package.json).

Padrão a repetir:

1. Deixe `index.ts` apenas com exports nomeados dos componentes e helpers públicos e com o reexport dos tipos de `@types/`.
2. Deixe `@types/index.d.ts` apenas com reexports de tipos. Declare as props em arquivos por assunto, como `core.d.ts`, `form.d.ts` e `css.d.ts` em `src/api/@types/`; crie apenas os assuntos necessários para cada componente.
3. Documente as props públicas em português no arquivo temático e mantenha os nomes exportados pelo índice. Use `import type` para dependências usadas somente como tipos.
4. Mantenha o `package.json` da pasta apontando `main`/`module` para `./index.mjs` e `types` para `./index.d.ts`.
5. Coloque testes em `test/<arquivo>.test.ts` ou `.test.tsx`, com nomes de casos que descrevam o comportamento verificado.
6. Rode `npx eslint <arquivos alterados>`. Após a validação no sandbox pelo dono do projeto, habilite a pasta em `build/components.ts`, rode `npm run build` e confira `dist/<componente>/index.mjs`, `index.d.ts`, `package.json` e `@types/`.

## Anatomia de um componente

```
src/<componente>/
  index.ts              ← apenas reexporta o componente, helpers públicos e os tipos de @types/
  <componente>.tsx      ← componente público
  variants.ts           ← classes e variantes de estilo do componente
  package.json          ← { main/module: "./index.mjs", types: "./index.d.ts" }
  @types/index.d.ts     ← apenas reexporta os tipos públicos
  @types/<assunto>.d.ts ← declarações por assunto (ex.: core, form, css)
  core/                 ← (opcional) partes internas
    controlled.tsx      ← variante mode="Controlled"
    hookForm.tsx        ← variante mode="HookForm" (Controller do react-hook-form)
  function/ | const.ts  ← (opcional) helpers do componente
```

- O nome da pasta é minúsculo, sem hífen, e é o nome público do import (`@orangesix/<pasta>`).
- Mantenha classes e decisões de estilo em `variants.ts`, usando `tv` de `tailwind-variants`; o componente apenas seleciona as variantes e renderiza o resultado.
- No PhpStorm, `src/style/tailwind.editor.css` ativa o Language Server do Tailwind v4 sem alterar o CSS publicado. Em **Settings → Languages & Frameworks → Style Sheets → Tailwind CSS → Configuration**, adicione `"classFunctions": ["tv"]` para completar classes dentro de `tv(...)`; depois reinicie o serviço Tailwind CSS pelo indicador **Language Services** na barra de status. O CSS publicado continua vindo de `src/style/style.css`.
- **Um componente novo precisa de `index.ts` e `package.json`.** Sem eles, ele não é gerado nem resolvido pelos consumidores. Copie o `package.json` de outra pasta.
- Mantenha `index.ts` e `@types/index.d.ts` como pontos de exportação. Declare os tipos em arquivos de `@types/` separados por assunto, sem alterar os nomes públicos exportados.
- Um componente só vai para o `dist/` quando estiver habilitado em `build/components.ts` (ver `docs/build.md`).
- Tipos compartilhados ficam em `src/api/` (`ApiComponentProps`, `ApiFieldComponentProps`, `ApiFieldControlledProps`, `ApiFieldHookFormProps`...). Helpers de campo (`InputLabel`, `InputFeedback`) também ficam lá.
- `primereact` é `peerDependency`: o aplicativo consumidor instala o PrimeReact 11 e envolve sua raiz uma vez com `PrimeReactProvider` de `@primereact/core/config`, passando a própria chave PrimeUI. Componentes Orange Six não criam providers internos.
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
  | `inputmask`, `picklist`, `utils`, `api`, `column` | não existem, precisam de solução própria |

  Antes de migrar, confira a API real em `node_modules/primereact/<componente>/` (arquivos `.d.ts`).
- `keyfilter` não faz parte da API compartilhada da 3.x; não o encaminhe aos componentes do PrimeReact 11.
- Estilo: **Tailwind v4**. Não usar classes Bootstrap (`me-1`, `w-100`, `text-danger`, `form-label`, `justify-content-*`...).
- `AlignItemsProps` e `JustifyContentProps` aceitam apenas classes Tailwind (`items-*`, `justify-*`, com prefixos responsivos).
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
- Toda prop pública é documentada com JSDoc no arquivo temático de `@types/`, em português. `@types/index.d.ts` apenas reexporta os tipos.
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
| api | migrado; build validado |
| autocomplete | pendente |
| box | migrado; testes e build validados; aguarda validação visual no sandbox pelo dono |
| button | migrado; testes e sandbox preparados; aguarda validação visual pelo dono |
| calendar | pendente |
| editor | pendente |
| input | migrado; testes e sandbox preparados; aguarda validação visual pelo dono |
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
