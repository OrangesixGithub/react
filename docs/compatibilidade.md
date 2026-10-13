# Compatibilidade com os consumidores

A 3.x precisa entrar nos projetos que usam a 2.x (ex.: `diretriz-crm`, hoje na 2.4.0) **sem alterar os imports existentes dos componentes**. A aplicação instala o PrimeReact 10.9.9 e configura o modo unstyled no provider da raiz.

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

### Lightbox em rotas abertas por iframe

Na entrada principal da aplicação Inertia (fora dos iframes), inicialize o host uma vez:

```ts
import "@orangesix/react/style.css";
import { initializeLightbox } from "@orangesix/lightbox";

initializeLightbox();
```

O componente mantém `<Lightbox html={html}/>` dentro de cada rota. Ao clicar numa imagem,
encaminha a galeria à janela ancestral mais alta que inicializou o host e é acessível pela
política de mesma origem. O overlay da Lightbox3 é criado no documento dessa janela,
preservando navegação e legendas. As URLs são resolvidas na rota de origem antes do envio.
Ao fechar, o foco retorna ao link original; ao desmontar ou trocar o HTML, a galeria aberta é fechada.
Sem host acessível (inclusive em iframe de outra origem), a galeria continua abrindo localmente.
O CSS do pacote deve estar importado também na janela principal.

A prop `appendTo` permite escolher o destino explicitamente, no padrão dos overlays do PrimeReact:

```tsx
// Body local, mesmo dentro de um iframe.
<Lightbox html={html} appendTo={() => document.body}/>

// Documento principal (mesma origem; host inicializado nele).
<Lightbox html={html} appendTo={() => window.top?.document.body ?? document.body}/>

// Elemento específico, resolvido ao clicar na imagem.
<Lightbox html={html} appendTo={() => document.getElementById("overlays")}/>

// Contêiner do próprio componente.
<Lightbox html={html} appendTo="self"/>
```

Também aceita um `HTMLElement` diretamente. Callback que retorna `null` usa o body local.
Sem `appendTo`, mantém a escolha automática do host ancestral ou do body local.
A prop define onde o overlay é inserido; o posicionamento original da Lightbox3 continua
fixo em relação ao viewport da janela de destino. Destino em outra janela sem host
inicializado não abre a galeria e registra uma mensagem no console.

### Estilos e provider

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
npm install primereact@10.9.9
```

Envolver a aplicação uma vez com o provider do PrimeReact em modo unstyled:
```tsx
import { PrimeReactProvider } from "primereact/api";

<PrimeReactProvider value={{ unstyled: true }}>
    <App/>
</PrimeReactProvider>
```

Outros requisitos da 3.x: **React 19** (versão atualmente adotada pela Orange Six) e `react-hook-form` ^7.

Não importar temas ou `primereact/resources/primereact.min.css`: os estilos dos componentes modernizados vêm do Tailwind v4 da Orange Six.

### TablePivot (`@orangesix/tablepivot`): API nova, sem compatibilidade com a 2.x

Exceção à regra de preservar a API 2.x, por decisão do dono do projeto: o TablePivot ganhou uma API mais simples e os
consumidores ajustam o uso ao migrar. O WebDataRocks foi substituído pelo [Perspective](https://perspective-dev.github.io/)
(Apache-2.0), sem o bloqueio da versão gratuita para dados acima de ~10 MB. O import continua o mesmo.

```tsx
<TablePivot
    data={vendas}
    rows={["regiao", "estado"]}
    columns={["ano"]}
    values={["valor", { field: "quantidade", aggregation: "avg" }]}
    filters={{ regiao: ["Sul", "Sudeste"] }}
    labels={{ regiao: "Região", valor: "Faturamento" }}
    title="Vendas por região"
    onChange={layout => salvar(layout)}/>
```

| 2.x | 3.x |
|---|---|
| `pivotDataSource` | `data` |
| `pivotSlice.rows` / `columns` (`{ uniqueName }`) | `rows` / `columns` (lista de campos) |
| `pivotSlice.measures` | `values`: `"campo"` ou `{ field, aggregation }` (`sum`, `count`, `avg`, `min`, `max`, `distinct`) |
| `caption` | `labels` (`{ campo: "Nome" }`) |
| `sort` na hierarquia | `sort` (`{ campo: "desc" }`) |
| `pivotOptions.grid.title` | `title` |
| `expands.expandAll` | `expanded` |
| `pivotCustomizeCell` | `styleCell(cell, meta)` |
| `ref.webdatarocks.expandAllData` / `collapseAllData` | `ref.expandAll()` / `ref.collapseAll()` (também `ref.exportCsv()`) |
| `ref.webdatarocks.updateData` / `setReport` | atualizar as props `data` e `rows`/`columns`/`values` |
| `toolbarOptions`, demais `pivotOptions` | removidos (`toolbar={false}` oculta a barra) |

- `onChange` devolve `{ rows, columns, values, filters, sort }` no mesmo formato das props: basta salvar e reaplicar.
- **Visões salvas.** O botão **Visões** salva o layout, a formatação condicional e a expansão no `localStorage` do
  navegador, para reabrir na próxima sessão; "Restaurar padrão" volta às props. Informe `storageKey` (uma por tela)
  para não misturar as visões de pivots diferentes; sem a prop, a chave é o `id`. Aplicar uma visão chama `onChange`
  e `onConditionalFormattingChange`. Dados novos mantêm o layout atual; só a troca das props de layout o redefine.
- **Modal fora do iframe.** Um pivot criado em um iframe e renderizado na janela principal (ex.: `Modal` com
  `appendTo={() => window.parent.document.body}`) precisa do motor dessa janela, porque o elemento e os estilos do
  Perspective pertencem ao documento que os cria. Na entrada da aplicação principal (fora dos iframes), chame uma vez:

  ```ts
  import "@orangesix/react/style.css";
  import { initializeTablePivot } from "@orangesix/tablepivot";

  initializeTablePivot();
  ```

  O WASM continua sendo baixado só quando um pivot é exibido. Sem essa chamada, o pivot mostra um aviso no lugar da
  grade. Com `appendTo="self"` (modal dentro do próprio iframe), nada muda.
- O motor (WASM) só é baixado nas telas que usam o pivot. No Vite do consumidor, os arquivos `.wasm` são resolvidos
  pelos imports `?url` do pacote, sem configuração extra no modo dev (validado no sandbox).
- O usuário configura o pivot pelo botão **Campos** (Filtros, Colunas, Linhas e Valores, com arrastar e soltar,
  ordenação, filtro de valores e operações). A hierarquia de linhas começa recolhida no primeiro nível.
- **Formatação condicional:** o botão com ícone de paleta abre o editor de regras numéricas. Cada regra escolhe um
  campo ou todos os valores, comparação, limite/intervalo e estilo. Aplicar confirma as alterações; Cancelar e Escape
  descartam o rascunho. Aplicar sem regras remove a formatação. A última regra correspondente tem prioridade.
  A família e o tamanho da fonte seguem sempre o tema.
  As regras não alteram os dados nem o CSV; styleCell continua disponível e é executado depois da classificação.
  Para salvar, use onConditionalFormattingChange e reaplique pela prop conditionalFormatting:

  ```tsx
  <TablePivot
      conditionalFormatting={[{
          field: "valor",
          operator: "lt",
          value: 1000,
          includeTotals: false,
          style: { color: "#dc2626", bold: true },
      }]}
      data={vendas}
      rows={["regiao"]}
      values={["valor"]}
      onConditionalFormattingChange={regras => salvar(regras)}/>
  ```

- height define a altura máxima do componente (padrão: 500), incluindo a barra. Com poucas linhas, a tabela
  ocupa somente a altura necessária; ao atingir o limite, a grade mantém sua rolagem. Tela cheia usa a altura do viewport.
- Exportação: **CSV** (estrutura e números no padrão pt-BR, `;`, UTF-8 com BOM; sem cores, por ser texto puro) e
  **Excel .xlsx** (números como número, cabeçalhos mesclados, hierarquia com recuo, total e formatação condicional;
  biblioteca ExcelJS carregada só ao exportar). **Copiar tabela** leva a tabela com a formatação para colar no Excel.

### Utils (`@orangesix/utils`)

Os nomes e as assinaturas continuam iguais. Mudanças de comportamento em relação à 2.x:

- **Sem jQuery.** O pacote não depende mais de `jquery`. `getElementDOM(seletor, timeout, true)` retorna `Element[]` em vez de um objeto jQuery. Com `all = false`, continua retornando o elemento.
- **`windowMessageEvent()`** aceita só mensagens da mesma origem e registra um único listener, mesmo se for chamado várias vezes. Ele retorna uma função que remove o listener. **`sendMessage`** envia só para a mesma origem: a janela principal e o iframe precisam estar no mesmo domínio.
- **Snackbar.** O card novo (ícone, título e texto) renderiza o HTML de `message.title`, `message.text` e `message.message`. O CSS da node-snackbar já vem no `style.css`. O SweetAlert também aceita HTML no título e no conteúdo, inclusive nos toasts. Os atributos do ícone continuam escapados.
- **SweetAlert como toast.** `post(rota, body, form, { messageLibrary: "sweetAlert" })` mostra o `message` da resposta como toast do SweetAlert no canto, no mesmo card da snackbar, com a barra de tempo na cor do tipo. O padrão continua sendo a snackbar. `response(data, form, "sweetAlert")` faz o mesmo. Chamar `message({ library: "sweetAlert", type: "toast" })` sem `options` também usa esse card novo; com `options`, mantém a configuração do consumidor, como na 2.x.
- **`response()`.** Os erros aparecem nos campos 3.x (`{name}-feedback`) e no padrão 2.x (`#j_feedback`). `field` (`messageType` e `disabled`) agora é tratado. `redirect` só aceita `http(s)` e caminhos relativos.
- **`post()`** não registra mais interceptors no axios global. As metas `react-base` e `csrf-token` são lidas a cada chamada. Sem `react-base`, a URL é relativa (`/rota`).
- **`handleNumber`** entende o formato BR (`"1.234,56"` → `1234.56`). O modo `money` usa o padrão pt-BR (`R$ 1.234,56`, e não mais `R$ 1 234,56`). Entrada vazia retorna `""`, e o sinal negativo é mantido.
- **`handleDateFormat`** aceita data sem hora em padrões com hora e timestamps do Laravel (`...T10:30:00.000000Z`). **`handleHours`** completa os minutos (`"8.3"` → `08:30`).
- **`getCep`** usa `fetch`, sem os headers padrão do axios do projeto. CEP inválido ou inexistente retorna o objeto vazio, sem fazer a requisição. O tipo novo é `IUtilsHelperResponse["cep"]`; `gep_cep` continua como `@deprecated`.
- Herdado da 2.x, sem mudança: uma falha de rede no `post` não mostra mensagem, e `errors: null` na resposta suprime a snackbar de `message`.
