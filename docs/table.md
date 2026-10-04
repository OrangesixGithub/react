# Table

`Table` preserva o import `@orangesix/table`, as props da 2.x e o manifesto da pasta.
A implementação usa DataTable/Column do PrimeReact 10.9.9 em modo unstyled.
Os tipos ficam em `src/table/@types/`, os estilos em `variants.ts` e os tokens
em `src/style/components/table.css`. Os helpers de `core/` adaptam cada recurso
separadamente. O componente permanece desligado em `build/components.ts` até
validação do dono no sandbox.

## Dados e identificação

`data` contém os registros e `column` define as colunas. Cada `column[].id` é
o campo do registro, inclusive caminhos como `cliente.nome`. `dataKey` define
a identidade dos registros e tem padrão `id`; use valores únicos e estáveis.
`className` continua aplicada à tabela HTML; `id` e `css` vão para o contêiner
do DataTable. `size` controla a largura do Box.

`column[].className` é aplicada às células de cabeçalho, corpo e rodapé. `alignHeader`
usa `align` como padrão. `frozen=true` congela a coluna à direita e ativa o
layout com rolagem; `false` não congela. O consumidor pode definir larguras
em `column[].style`. Marcadores `p-frozen-column` são mantidos no DOM porque
o PrimeReact os usa para calcular o deslocamento de colunas congeladas adjacentes;
os estilos continuam próprios, sem temas PrimeReact.

## Paginação e ordenação

Sem `lazy`, o PrimeReact pagina e ordena os dados localmente. Com `lazy`, o
consumidor fornece somente a página atual em `data` e atualiza:

- `lazy.paginationPage`: página atual, começando em **1**;
- `lazy.paginationTotal`: total de registros antes da paginação;
- `lazy.sortField` e `lazy.sortOrder`: ordenação aplicada pelo servidor;
- `paginatorRow`: quantidade de registros da página.

`onPaginator(pagina, quantidade)` usa a quantidade recebida no evento para
calcular a página. Alterar a quantidade reinicia na página 1, inclusive em
modo remoto. `rowsPerPageOptions` personaliza as quantidades disponíveis; o
padrão é `[5, 10, 15, 20, 25, 50, 100]`. `paginatorRow` aceita qualquer número
e define a quantidade inicial (padrão 10); inclua esse valor nas opções.
Por exemplo, use `rowsPerPageOptions={[3, 6, 12]}` com `paginatorRow={3}`.
`onSort(campo, direcao)` mantém os valores do PrimeReact; a aplicação decide
se reinicia a página após mudar a ordenação.

### Ordenação por várias colunas

`sortMode="multiple"` habilita a ordenação múltipla do
[PrimeReact 10.9.9](https://v10.primereact.org/datatable/#sort).
Use Ctrl + clique no Windows/Linux ou ⌘ + clique no Mac para adicionar
uma coluna; o clique sem modificador passa a ordenar somente por ela.
Cada coluna precisa de `sort: true`. Os números junto aos ícones indicam
a prioridade dos critérios.

`multiSortMeta` recebe uma lista `TableSortMeta[]`, com `field` e `order`
(1 crescente, -1 decrescente). A primeira posição tem maior prioridade;
as seguintes desempatarão os registros. Sem callback, essa lista define
a ordenação inicial e o PrimeReact gerencia as alterações locais.
Com `onMultiSort`, a ordenação é controlada: atualize `multiSortMeta` com
a lista recebida. O callback `onSort(campo, direcao)` continua sendo usado
para ordenação simples remota, com `sortMode="single"` como padrão.

```tsx
const [sort, setSort] = useState<TableSortMeta[]>([
    { field: "team", order: 1 },
    { field: "salary", order: -1 },
]);

<Table
    data={data}
    column={columns}
    sortMode="multiple"
    multiSortMeta={sort}
    onMultiSort={setSort}
/>
```

No modo remoto, forneça `lazy.multiSortMeta`, atualize os critérios em
`onMultiSort` e aplique todos eles no servidor **antes** de paginar.
O consumidor continua responsável por reiniciar a página após ordenar.
`lazy.multiSortMeta` tem prioridade sobre `multiSortMeta` quando ambos são
informados. Os cenários `MultipleSort` e `LazyMultipleSort` no sandbox
demonstram ordenação local controlada e simulação remota, respectivamente.

O seletor de quantidade é HTML nativo e encaminha a mudança ao callback do
template do PrimeReact com valor numérico. A declaração `PaginatorChangeEvent`
da v10 informa string, mas sua implementação usa esse valor como `rows`
numérico; a adaptação de tipo fica restrita a esse ponto.

## Seleção, expansão e agrupamento

`selection` é controlada pelo consumidor. `onSelection` recebe registro ou
`null` em seleção simples, e uma lista em `selectionMode="checkbox"`.
`onRowSelect` e `onRowUnselect` recebem os eventos originais do PrimeReact
ao selecionar ou desmarcar uma linha (`originalEvent`, `data` e `type`).
Use esses callbacks para reagir à ação; a atualização do valor selecionado
continua em `onSelection`.

Para expandir linhas, forneça `rowExpandable` e atualize seu estado com
`onRowExpandable(event)` usando `event.data`. Sem `rowExpandableAttr`, todas
as linhas podem expandir; com ele, somente as que possuem o campo informado.
`rowExpansionTemplate` recebe o registro e as opções originais do PrimeReact.

`rowGroup` informa o campo de agrupamento. Os dados devem estar contíguos por
grupo. `rowGroupMode="subheader"` usa cabeçalhos e rodapés de grupo e permite
expansão. Nesse caso, use uma **lista de registros** em `rowExpandable`;
mapas de chaves são suportados pelo PrimeReact quando `dataKey === rowGroup`.
`rowGroupMode="rowgroup"` preserva a grafia da 2.x e é traduzido para `rowspan`,
que também pode ser usado explicitamente.

## Edição e reordenação

`edit=true` ativa edição de células. `column[].editor` fornece o campo e
`onEditorComplete` recebe o evento original. O consumidor atualiza `data`.

`reorder` aceita `rows`, `columns` ou `all`. As colunas auxiliares de seleção,
expansão e arraste não podem ser reordenadas. `onReorder` recebe a nova ordem
das linhas com novos objetos, sem alterar os objetos originais; o atributo
`reorderRowsAttr` (padrão `order`) recebe posições começando em 1.
O arraste das colunas permanece gerenciado pelo PrimeReact.

## Estilos e compatibilidade

O cabeçalho usa títulos pequenos em maiúsculas e fundo uniforme. As linhas
têm divisórias finas e texto secundário; templates podem destacar conteúdos
com `text-table-text-strong`. `column[].footer` permite um rodapé por coluna,
com o mesmo alinhamento do corpo, para totais calculados pelo consumidor.
Sem `styleStriped`, o fundo é uniforme; com `styleStriped=true`, as linhas
alternadas têm contraste suave (3% no tema claro e 2% no escuro).

`styleSize` aceita `small`, `normal` e `large`; `styleStriped`, `styleResizable`
e `styleType="bordered"` preservam os nomes existentes. Cores podem ser
personalizadas pelos tokens `--color-table-*`, com padrões claro e escuro.
`iconPrefix` tem padrão `bi bi-` e aceita `pi pi-` explicitamente.

`templeteHeader` mantém a grafia da 2.x. `cellRender` continua encaminhada
como `cellMemo`. `bootstrapTableStyle`, em `table/styled`, permanece como
alias obsoleto de `tableStyle` para preservar imports profundos existentes.

## Validação

O sandbox tem uma única tabela com seletor de cenários: seleção simples,
checkbox, expansão, edição, reordenação, grupos expansíveis, `rowgroup` e
paginação/ordenação remotas. Há controles de listras, bordas, congelamento
e estado vazio, nas prévias normal e iframe.

Os controles usam `Select` e `Checkbox` da biblioteca. `table/Stage.tsx` apenas
seleciona o exemplo e sua aparência. Cada cenário tem um componente em
`table/variants/`, com estado próprio: `SingleSelection`, `CheckboxSelection`,
`Expansion`, `CellEditing`, `Reorder`, `ExpandableGroups`, `RowspanGroups` e
`LazyPagination`, `MultipleSort` e `LazyMultipleSort`. O editor do cenário de edição usa `Input` do pacote.
Os arquivos `data.ts`, `columns.tsx`, `base.ts` e `types.ts` compartilham os dados,
templates e props de aparência; paginação, seleção e demais comportamentos
ficam explícitos no componente de cada cenário.

Na migração foram conferidos os tipos do Table, ESLint, build da biblioteca,
build do sandbox e interações de seleção, paginação local/remota (incluindo
troca para 25), ordenação remota, expansão de linhas/grupos, edição e rowspan
no navegador. A ordenação múltipla foi conferida em modo local controlado e
simulação remota: prioridade, desempate, Ctrl + clique, clique simples e
reinício da página na simulação remota. A conferência final de arraste de linhas/colunas,
redimensionamento, foco por teclado, congelamento e temas cabe ao dono antes
de habilitar o componente no build. Não foram adicionados testes automatizados.
