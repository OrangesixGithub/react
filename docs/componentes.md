# Componentes

## Referência para as próximas migrações: `src/api`

O componente `api` compilou com `npm run build` e serve como base para a **estrutura** dos próximos componentes. Antes
de migrar uma pasta,
consulte [seus exports](../src/api/index.ts), [o índice de tipos](../src/api/@types/index.d.ts)
e [o manifesto](../src/api/package.json).

Padrão a repetir:

1. Deixe `index.ts` apenas com exports nomeados dos componentes e helpers públicos e com o reexport dos tipos de
   `@types/`.
2. Deixe `@types/index.d.ts` apenas com reexports de tipos. Declare as props em arquivos por assunto, como `core.d.ts`,
   `form.d.ts` e `css.d.ts` em `src/api/@types/`; crie apenas os assuntos necessários para cada componente.
3. Documente as props públicas em português no arquivo temático e mantenha os nomes exportados pelo índice. Use
   `import type` para dependências usadas somente como tipos.
4. Mantenha o `package.json` da pasta apontando `main`/`module` para `./index.mjs` e `types` para `./index.d.ts`.
5. Rode `npx eslint <arquivos alterados>`. Após a validação no sandbox pelo dono do projeto, habilite a pasta em
   `build/components.ts`, rode `npm run build` e confira `dist/<componente>/index.mjs`, `index.d.ts`, `package.json` e
   `@types/`.

## Validação durante a refatoração

Os testes automatizados e o Vitest foram removidos por decisão do dono do projeto.
A implementação de testes fica para depois da refatoração completa, com explicação
gradual dos conceitos. Nesta etapa, valide os componentes com ESLint, checagem de
tipos no build e exemplos no sandbox. Não adicione testes durante esta refatoração.

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
- Mantenha classes e decisões de estilo em `variants.ts`, usando `tv` de `tailwind-variants`; o componente apenas
  seleciona as variantes e renderiza o resultado.
- No PhpStorm, `src/style/tailwind.editor.css` ativa o Language Server do Tailwind v4 sem alterar o CSS publicado. Em
  **Settings → Languages & Frameworks → Style Sheets → Tailwind CSS → Configuration**, adicione
  `"classFunctions": ["tv"]` para completar classes dentro de `tv(...)`; depois reinicie o serviço Tailwind CSS pelo
  indicador **Language Services** na barra de status. O CSS publicado continua vindo de `src/style/style.css`.
- **Um componente novo precisa de `index.ts` e `package.json`.** Sem eles, ele não é gerado nem resolvido pelos
  consumidores. Copie o `package.json` de outra pasta.
- Mantenha `index.ts` e `@types/index.d.ts` como pontos de exportação. Declare os tipos em arquivos de `@types/`
  separados por assunto, sem alterar os nomes públicos exportados.
- Um componente só vai para o `dist/` quando estiver habilitado em `build/components.ts` (ver `docs/build.md`).
- Tipos compartilhados ficam em `src/api/` (`ApiComponentProps`, `ApiFieldComponentProps`, `ApiFieldControlledProps`,
  `ApiFieldHookFormProps`...). Helpers de campo (`InputLabel`, `InputFeedback`) também ficam lá.
- A largura compartilhada `size` é definida em `src/api/@types/size.d.ts`: aceita um percentual como `"50"` ou um
  objeto como `{ base: "100", md: "50", xl: "25" }`. Componentes que herdam `ApiComponentProps` e encaminham `size`
  ao `Box` recebem o mesmo comportamento responsivo. `BoxSize` e `BoxResponsiveSize` continuam exportados como aliases.
- `primereact` é `peerDependency`, fixada em `10.9.9`: o aplicativo consumidor instala essa versão e envolve sua raiz
  uma vez com `PrimeReactProvider` de `primereact/api`, usando `value={{ unstyled: true }}`. Componentes Orange Six não
  criam providers internos e usam `unstyled` para manter seus estilos Tailwind.
- Importações entre componentes são relativas (`import { Box } from "../box";`).

## Encapsulando o PrimeReact 10.9.9

### Espaçamento horizontal do Box

O token Tailwind `--spacing-box`, em `src/style/variable/box.css`, define o espaço horizontal total de cada
`Box` (padrão: `0px`, preservando os layouts existentes). A largura passa a ser
`calc(percentual - var(--spacing-box))`, inclusive nos breakpoints, e cada lado recebe metade desse valor
como margem. Para quatro caixas de 25%, com espaço equivalente a `gap-2`:

```tsx
<div className="flex flex-wrap [--spacing-box:--spacing(2)]">
    <Box size="25">Um</Box>
    <Box size="25">Dois</Box>
    <Box size="25">Três</Box>
    <Box size="25">Quatro</Box>
</div>
```

Não combine com `gap-x-2`: as margens já criam o espaço entre as caixas e deixam metade desse espaço nas
bordas externas. Para definir o padrão global, sobrescreva `--spacing-box` com `calc(var(--spacing) * 2)`
em `:root` depois de importar o CSS da biblioteca. O token é herdado; use `[--spacing-box:0px]` para
desativá-lo em caixas internas. Classes de largura ou `css.width` personalizados substituem o cálculo
automático e precisam considerar as margens.

- O componente Orange Six **mantém a API da 2.x** e encapsula a API do PrimeReact 10.9.9. A modernização concentra-se
  nos estilos Tailwind e na organização dos componentes.
- Use os imports da v10 (`primereact/button`, `primereact/inputmask`, `primereact/inputnumber`, `primereact/calendar`
  etc.) e confira as declarações em `node_modules/primereact/<componente>/`.
- Use o modo **unstyled** e classes próprias em `variants.ts`. Para elementos internos, use as props específicas ou Pass
  Through (`pt`); não importe temas CSS do PrimeReact.
- Não usar dependências `@primereact/*`, APIs compostas da v11 ou configuração de chave PrimeUI.
- Estilo: **Tailwind v4**. Não usar classes Bootstrap (`me-1`, `w-100`, `text-danger`, `form-label`,
  `justify-content-*`...).
- As cores compartilhadas ficam em `../src/style/variable/core.css`, como `--color-text`, `--color-text-disabled`
  e `--color-border`. Os arquivos de cada componente usam esses tokens como padrão e mantêm variáveis próprias
  para personalização individual. `root.css` importa primeiro `core.css` e depois os arquivos dos componentes.
- A escala `--color-primary-50` a `--color-primary-950` define a cor base da UI, usando o azul do Tailwind como
  padrão. O tom `500` é a cor principal; o botão `primary` usa `700` no hover e `300` no anel de foco. O foco dos
  campos também usa essa paleta. A escala completa é publicada por `@theme static`; cada tom pode ser personalizado.
- Todas as cores do `Input` ficam em `../src/style/variable/input.css`, em variáveis `--color-input-*` para campo,
  foco, erro, estados desabilitado e somente leitura, botões numéricos, senha, rótulo e feedback. O consumidor pode
  sobrescrevê-las em `:root` ou em um contêiner do formulário. Os valores padrão preservam os temas claro e escuro.
  As cores de obrigatoriedade e feedback vêm dos helpers compartilhados de `src/api/` e usam os mesmos tokens.
- `AlignItemsProps` e `JustifyContentProps` aceitam apenas classes Tailwind (`items-*`, `justify-*`, com prefixos
  responsivos).
- Prefixo padrão dos ícones dos componentes: `bi bi-` (Bootstrap Icons, compatível com a 2.x).
  O consumidor importa o CSS do Bootstrap Icons. `iconPrefix="pi pi-"` permite usar PrimeIcons.

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
- Toda prop pública é documentada com JSDoc no arquivo temático de `@types/`, em português. `@types/index.d.ts` apenas
  reexporta os tipos.
- JSX: uma prop por linha quando houver mais de uma, e props ordenadas (a regra `jsx-sort-props` do ESLint).

Rode `npx eslint <arquivo>` em todo arquivo alterado.

## Checklist de migração de um componente

1. Ler o componente atual e seus `@types` (a API 2.x a preservar).
2. Ler a API do PrimeReact 10.9.9 correspondente em `node_modules/primereact/`.
3. Adaptar os estilos para unstyled + Tailwind mantendo props e exports.
4. Remover as classes Bootstrap e usar Tailwind.
5. Criar ou atualizar a página do componente no sandbox (`docs/sandbox.md`) e validar visualmente os dois modos
   (`Controlled` e `HookForm`).
6. **Depois da validação do dono do projeto no sandbox**, habilitar o componente em `build/components.ts` (e as
   dependências dele, se o build pedir).
7. Rodar lint, `npm run build` e confirmar que o componente não aparece mais nos erros do dts.
8. Atualizar a tabela abaixo.

## Status da modernização com PrimeReact 10.9.9

| Componente   | Status                                                                                      |
|--------------|---------------------------------------------------------------------------------------------|
| accordion    | pendente                                                                                    |
| api          | migrado; build validado                                                                     |
| autocomplete | PrimeReact 10.9.9 unstyled com Tailwind; aguarda validação visual pelo dono; fora do build |
| box          | modernizado com Tailwind; habilitado no build                                               |
| button       | adaptado para PrimeReact 10.9.9 unstyled; habilitado no build; revalidar visual no sandbox  |
| calendar     | pendente                                                                                    |
| checkbox     | checkbox nativo HTML com Tailwind, valor em lista (`[1, 2, 3]`); validado no sandbox; habilitado no build |
| editor       | pendente                                                                                    |
| input        | adaptado para PrimeReact 10.9.9 unstyled; aguarda validação visual pelo dono; fora do build |
| inputfilter  | pendente                                                                                    |
| lightbox     | pendente                                                                                    |
| loading      | pendente                                                                                    |
| message      | pendente                                                                                    |
| modal        | pendente                                                                                    |
| multiselect  | PrimeReact 10.9.9 unstyled com Tailwind; aguarda validação visual pelo dono; fora do build |
| pdf          | pendente                                                                                    |
| picklist     | pendente                                                                                    |
| radio        | radio nativo HTML com Tailwind; aguarda validação visual pelo dono; fora do build |
| select       | select nativo HTML com Tailwind; aguarda validação visual pelo dono; fora do build |
| switch       | checkbox nativo HTML com Tailwind; aguarda validação visual pelo dono; fora do build |
| table        | pendente                                                                                    |
| tablepivot   | pendente                                                                                    |
| tabview      | pendente                                                                                    |
| textarea     | PrimeReact 10.9.9 unstyled com Tailwind (tokens `--color-input-*`); aguarda validação visual pelo dono; fora do build |
| tooltip      | pendente                                                                                    |
| utils        | pendente                                                                                    |
