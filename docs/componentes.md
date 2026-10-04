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

O Calendar aceita `selectionMode="single"` (padrão, retorno ISO ou `null`) e `selectionMode="multiple"`
(retorno `string[]` em ISO local; limpar retorna `[]`), nos modos Controlled e HookForm.
`minDate` e `maxDate` aceitam `Date` ou string ISO e restringem ambos os modos de seleção.
O sandbox permite alternar a seleção e reinicia os valores ao trocar de modo.
`range` tem efeito apenas com `selectionMode="multiple"`: retorna `[início, fim]` ISO,
com fim `null` enquanto incompleto, ou `[]` ao limpar. Em seleção única, `range` é ignorado.

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
- Estilos compartilhados ficam em `src/style/mixins/field.css`, nas classes `os-field` e `os-field-invalid`.
  As regras de foco, erro e estados nativos
  desabilitado/somente leitura ficam em `mixins/field.css`, na camada `components`, antes dos utilitários.
  As classes `os-input` e `os-textarea`, definidas em `style/components/`, conectam as variáveis internas
  `--os-field-*` aos tokens `--color-input-*` ou `--color-textarea-*` sem classes arbitrárias no HTML.
  Os `variants.ts` selecionam diretamente essas classes, tamanhos e estado inválido; alturas, largura
  e comportamento específico continuam no componente. Não há receitas TypeScript intermediárias em `mixins/`.
  Os tokens opcionais do Textarea ficam em `src/style/components/textarea.css`. O padrão `initial` ativa o fallback
  para os tokens do Input no próprio campo, preservando personalizações em `:root`, contêineres e temas escuros.
  Para personalizar só o Textarea, sobrescreva, por exemplo, `--color-textarea-text` e `--color-textarea-background`.
  Placeholder, foco, erro, somente leitura e desabilitado seguem o mesmo padrão. Label e feedback continuam
  usando os tokens compartilhados dos helpers de `src/api/`.
  Componentes com slots ou estados controlados precisam adaptar a receita ao elemento que desenha o campo.
- `os-field-group` adiciona foco interno (`focus-within`) em campos compostos; `os-field-invalid` funciona
  também com essa classe. `os-field-disabled` e `os-field-readonly` representam estados controlados em
  contêineres. O estado nativo `:read-only` é restrito a `input`/`textarea`, pois também corresponde a
  elementos não editáveis, como `div` e `select`.
- Botões do pacote usam `os-button`, definida em `src/style/mixins/button.css`, para alinhamento, cursor,
  transição de cores, `font-medium`, foco visível com anel de 2px/afastamento de 2px e estado nativo desabilitado.
  Cores, tamanhos e bordas ficam nas variants de cada componente. Utilitários podem ajustar a base, como
  `font-normal`, `focus-visible:ring-3`, `focus-visible:ring-offset-0`, `flex` e `justify-start` em botões internos.
- `os-button-focus` concentra o foco dos botões internos: anel de 3px, afastamento zero e cor
  `--color-input-focus-ring` como padrão. Editor, MultiSelect e botões numéricos preservam suas cores
  específicas. Botões que usam anel de 2px continuam com o padrão de `os-button`.
- `os-list-item`, em `style/mixins/list-item.css`, compartilha espaçamento, tipografia, arredondamento,
  hover, seleção ARIA e foco do PrimeReact entre Autocomplete, MultiSelect e o autocomplete do InputFilter.
  `os-autocomplete-item` e `os-multiselect-item` conectam `--os-item-*` aos tokens individuais de cada
  componente. O layout com checkbox e o estado desabilitado do MultiSelect continuam nas variants.
- `os-checkbox`, em `style/mixins/checkbox.css`, é a base nativa usada por Checkbox e MultiSelect
  através de `checkboxVariants`. As classes `os-checkbox-checked`, `os-checkbox-invalid`,
  `os-checkbox-readonly` e `os-checkbox-disabled` controlam os estados; tamanhos e rótulos ficam nas variants.
  `os-multiselect-checkbox` conecta o fundo do checkbox ao token do filtro sem classe arbitrária no HTML.
- `os-panel` e `os-panel-header`, em `style/mixins/panel.css`, compartilham borda, fundo, sombra,
  arredondamento e cabeçalho destacado entre Calendar e MultiSelect. `os-calendar-panel` e
  `os-multiselect-panel` conectam os tokens `--os-panel-*`. No Calendar, personalize o cabeçalho com
  `--color-calendar-header-background` e `--color-calendar-header-text`; o corpo mantém o token
  `--color-calendar-panel-background` e o espaçamento próprio das datas/meses/anos.

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
  `showLabel` é compartilhada por Input, Textarea, Select, MultiSelect, Autocomplete, Calendar,
  Checkbox, Radio, Switch, Editor e InputFilter nos modos suportados. O padrão é `true`;
  `showLabel={false}` oculta visualmente o rótulo, ícone e asterisco sem reservar espaço,
  mantendo o label acessível. Em Checkbox/Radio, os textos das opções continuam visíveis.
- A largura compartilhada `size` é definida em `src/api/@types/size.d.ts`: aceita um percentual como `"50"` ou um
  objeto como `{ base: "100", md: "50", xl: "25" }`. Componentes que herdam `ApiComponentProps` e encaminham `size`
  ao `Box` recebem o mesmo comportamento responsivo. `BoxSize` e `BoxResponsiveSize` continuam exportados como aliases.
- `primereact` é `peerDependency`, fixada em `10.9.9`: o aplicativo consumidor instala essa versão e envolve sua raiz
  uma vez com `PrimeReactProvider` de `primereact/api`, usando `value={{ unstyled: true }}`. Componentes Orange Six não
  criam providers internos e usam `unstyled` para manter seus estilos Tailwind.
- Importações entre componentes são relativas (`import { Box } from "../box";`).

A base de diálogos fica em `style/mixins/modal.css`: `os-modal`, `os-modal-mask`,
`os-modal-header`, `os-modal-title`, `os-modal-close`, `os-modal-content`,
`os-modal-description` e `os-modal-actions`. Os tokens `--color-modal-*` definem o padrão
claro/escuro. Cada componente pode conectar `--os-modal-*` aos seus tokens específicos,
como `os-message`. Largura e alinhamento das ações continuam nas variants do componente.

### Revisão dos estilos compartilhados

O hook interno `src/modal/hooks/useModalDrag.ts` é compartilhado por Message e Modal.
Ele usa `ownerDocument` e Pointer Events para arrastar no documento de destino do `appendTo`,
mantém a janela no viewport e limpa os listeners ao fechar ou desmontar. O arraste nativo
do PrimeReact fica desativado; `draggable` controla o hook (padrão `true` no Message e `false` no Modal). No Modal,
maximizar desativa o arraste. Portais para outro documento exigem mesma origem.

O hook `src/modal/hooks/useModalTransiction.ts`, exportado pela pasta `modal`, seleciona
a animação de entrada e saída. A prop `transition` da Modal e do Message aceita `zoom` (padrão),
`fade` e `slide`; os três efeitos respeitam `prefers-reduced-motion`.

| Componentes | Aplicação da base compartilhada |
|---|---|
| Input e Textarea | `os-field` com tokens próprios; botões numéricos usam `os-button os-input-number-button` |
| Autocomplete e Calendar | Campos usam `os-field os-input`; listas/painel com rolagem usam `scrollbar-themed` |
| Select | `os-field os-select`, com estados e tokens próprios preservados |
| MultiSelect | `os-field-group` no contêiner, `os-field` no filtro e `os-button` nas ações de fechar/remover |
| Editor | `os-field-group` na área composta, `os-field` nos campos de link/dimensões e `os-button` nas ações |
| InputFilter | `os-field` em texto/número/data/seletor e `os-field-group` no autocomplete múltiplo |
| Checkbox | `os-checkbox` e classes de estado, também usadas pelo MultiSelect; não usa a base de campos textuais |
| Radio e Switch | Mantêm estilos próprios para marcação, seleção e foco; não usam a base de campos textuais |
| API e Box | Helpers e layout; não precisam de `os-field` ou `os-button` |

As conexões de tokens ficam em `style/components/`: `os-select`, `os-multiselect`,
`os-multiselect-filter` e `os-editor`. Editor mantém os tokens Input já usados para erro e estados
desabilitado/somente leitura. Campos de texto do Autocomplete, Calendar e InputFilter mantêm os tokens Input.
Essa revisão não habilita componentes no build nem substitui a validação visual pelo dono no sandbox.

## Encapsulando o PrimeReact 10.9.9

### Espaçamento horizontal do Box

O token Tailwind `--spacing-box`, em `src/style/components/box.css`, define o espaço horizontal total de cada
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
- As cores compartilhadas ficam em `../src/style/theme.css`, como `--color-text`, `--color-text-disabled`
  e `--color-border`. Os arquivos de cada componente usam esses tokens como padrão e mantêm variáveis próprias
  para personalização individual. `style.css` importa primeiro `theme.css` e depois `components/root.css` com os arquivos dos componentes.
- A escala `--color-primary-50` a `--color-primary-950` define a cor base da UI, usando o azul do Tailwind como
  padrão. O tom `500` é a cor principal; o botão `primary` usa `700` no hover e `300` no anel de foco. O foco dos
  campos também usa essa paleta. A escala completa é publicada por `@theme static`; cada tom pode ser personalizado.
- Todas as cores do `Input` ficam em `../src/style/components/input.css`, em variáveis `--color-input-*` para campo,
  foco, erro, estados desabilitado e somente leitura, botões numéricos, senha, rótulo e feedback. O consumidor pode
  sobrescrevê-las em `:root` ou em um contêiner do formulário. Os valores padrão preservam os temas claro e escuro.
  As cores de obrigatoriedade e feedback vêm dos helpers compartilhados de `src/api/` e usam os mesmos tokens.
- `AlignItemsProps` e `JustifyContentProps` aceitam apenas classes Tailwind (`items-*`, `justify-*`, com prefixos
  responsivos).
- Prefixo padrão dos ícones dos componentes: `bi bi-` (Bootstrap Icons, compatível com a 2.x).
  O consumidor importa o CSS do Bootstrap Icons. `iconPrefix="pi pi-"` permite usar PrimeIcons.

## Padrão de código

### Condicionais com chaves

Use sempre chaves nos blocos de `if`, `else if` e `else`, mesmo quando houver apenas uma instrução.
Esse é o padrão para todo o pacote.

```tsx
if (typeof props.inputRef === "function") {
    props.inputRef(node ?? null);
} else if (props.inputRef) {
    props.inputRef.current = node ?? null;
}
```

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
| accordion    | PrimeReact 10.9.9 unstyled com Tailwind (tokens `--color-accordion-*`); aguarda validação visual pelo dono; fora do build |
| api          | migrado; build validado                                                                     |
| autocomplete | PrimeReact 10.9.9 unstyled com Tailwind; aguarda validação visual pelo dono; fora do build |
| box          | modernizado com Tailwind; habilitado no build                                               |
| button       | adaptado para PrimeReact 10.9.9 unstyled; habilitado no build; revalidar visual no sandbox  |
| calendar     | PrimeReact 10.9.9 unstyled com Tailwind; aguarda validação visual pelo dono; fora do build                                                                                    |
| checkbox     | checkbox nativo HTML com Tailwind, valor em lista (`[1, 2, 3]`); validado no sandbox; habilitado no build |
| editor       | TipTap com Tailwind, tabelas e alinhamento; somente Controlled; aguarda validação visual pelo dono; fora do build |
| input        | adaptado para PrimeReact 10.9.9 unstyled; aguarda validação visual pelo dono; fora do build |
| inputfilter  | select nativo + campos Tailwind (tokens `--color-input-*`), autocomplete PrimeReact unstyled; depende de `utils` (pendente); aguarda validação visual pelo dono; fora do build |
| lightbox     | Lightbox3 com CSS original incorporado ao style.css e contêiner Tailwind; aguarda validação visual pelo dono; fora do build |
| loading      | Tailwind puro, sem PrimeReact (cinco indicadores em `template/` escolhidos por `type`: `border`, `grow`, `bars`, `pulse`, `orbit`; `fullscreen` e `children` para centro personalizado, ex.: `motion` no consumidor); aguarda validação visual pelo dono; fora do build |
| message      | Dialog PrimeReact 10.9.9 unstyled com Tailwind; aguarda validação visual pelo dono; fora do build |
| modal        | Dialog PrimeReact 10.9.9 unstyled com Tailwind, base compartilhada com Message; aguarda validação visual pelo dono; fora do build |
| multiselect  | PrimeReact 10.9.9 unstyled com Tailwind; aguarda validação visual pelo dono; fora do build |
| pdf          | react-pdf com Tailwind (tokens `--color-pdf-*`), modos total/pagination, largura responsiva e `appendTo` para paginação fora do iframe; aguarda validação visual pelo dono; fora do build |
| picklist     | PrimeReact 10.9.9 unstyled com Tailwind (tokens `--color-picklist-*`, base `os-panel`/`os-list-item`/`os-checkbox`); aguarda validação visual pelo dono; fora do build |
| radio        | radio nativo HTML com Tailwind; aguarda validação visual pelo dono; fora do build |
| select       | select nativo HTML com Tailwind; aguarda validação visual pelo dono; fora do build |
| switch       | checkbox nativo HTML com Tailwind; aguarda validação visual pelo dono; fora do build |
| table        | PrimeReact 10.9.9 unstyled com Tailwind (tokens `--color-table-*`), API 2.x preservada; ordenação simples/múltipla local e remota; cenários no sandbox; aguarda validação visual pelo dono; fora do build |
| tablepivot   | pendente                                                                                    |
| tabview      | PrimeReact 10.9.9 unstyled com Tailwind (tokens `--color-tabview-*`); aguarda validação visual pelo dono; fora do build |
| textarea     | PrimeReact 10.9.9 unstyled com Tailwind (tokens `--color-textarea-*` com fallback para Input); aguarda validação visual pelo dono; fora do build |
| tooltip      | PrimeReact 10.9.9 unstyled com Tailwind (tokens `--color-tooltip-*`), conteúdo React, alvo direto e transições `zoom`/`fade`/`slide`; aguarda validação visual pelo dono; fora do build |
| utils        | pendente                                                                                    |
