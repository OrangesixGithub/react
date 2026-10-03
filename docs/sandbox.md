# Sandbox (`../react-sandbox`)

O PDF está disponível em `npm run dev`, com URL editável e seleção dos modos `total` e `pagination`.
O exemplo usa `appendTo` apontando para o body da janela principal (mesma origem), para manter
a paginação visível também ao rolar a página externa ao iframe. Sem a prop, mantém sticky local.
Valide navegação por clique/teclado, limites da primeira/última página, troca de arquivo,
redimensionamento, seleção de texto, links, mensagens de erro e temas claro/escuro.
O worker e os recursos PDF.js continuam sendo carregados do unpkg, na versão usada pelo react-pdf.
Permanece fora do build até validação visual pelo dono.

O Lightbox está disponível em `npm run dev`, com a galeria Lightbox3 e seu CSS original incorporado ao `style.css` da biblioteca.
O `main.tsx` inicializa o host com `initializeLightbox()`: clicar nas imagens da prévia em iframe
abre o overlay no documento principal. Confira navegação, legendas, fechamento e retorno do foco ao iframe.
Valide abertura, Escape, clique na máscara, foco e temas claro/escuro; permanece fora do build até validação pelo dono.

Um ambiente Vite para ver e testar os componentes em tempo real enquanto eles são desenvolvidos. O sandbox tem o próprio `AGENTS.md`, com o padrão de código dele.

## Padrão das páginas de campos

- A prévia apresenta dois exemplos: `<Componente> controlado` (`Controlled`) e `<Componente> com HookForm` (`HookForm`), quando o componente suporta ambos os modos.
- Os valores começam vazios, usando o valor vazio adequado ao componente (`""`, `null` ou lista vazia).
- Cada exemplo exibe logo abaixo o valor atual, com `JSON.stringify`: `Valor do state:` ou `Valor do HookForm:`.
- Preserve o layout dos demais campos: seção em coluna com `gap-6` e cada exemplo em coluna com `gap-2`.
- Não acrescente exemplos extras de variações, tamanhos, múltiplos meses ou estados (`disabled`, `readonly`, erro) à página padrão, salvo solicitação do dono do projeto. Esses cenários continuam fazendo parte da validação da migração.
- Mantenha a referência de props na seção de documentação e o menu de componentes em ordem alfabética, inclusive na busca.

Use `src/components/input/Stage.tsx` e `src/components/calendar/Stage.tsx` do sandbox como referências.

## Modos

| Comando (em `react-sandbox/`) | Fonte dos componentes | Uso |
|---|---|---|
| `npm run dev` | `../react/src` (código-fonte) | Desenvolvimento com HMR |
| `npm run dev:package` | `../react/dist` (pacote gerado pelo build) | Validar o que será publicado, sem publicar |

Enquanto `input` estiver desligado em `build/components.ts`, a página dele usa `../react/src/input` também no modo `dev:package`; valide seu visual com `npm run dev`, que compila o CSS do fonte. Quando `dist/input` existir, o sandbox passa a usar automaticamente a versão compilada.

A mesma regra vale para `select`: enquanto `dist/select` não existir, a página usa `../react/src/select`.
Valide os estilos novos do select nativo com `npm run dev`. A habilitação no build depende da validação visual pelo dono.

A mesma regra vale para `radio`: enquanto `dist/radio` não existir, a página usa `../react/src/radio`.
Valide o visual com `npm run dev`; a habilitação no build depende da validação pelo dono.

A mesma regra vale para `switch`: enquanto `dist/switch` não existir, a página usa `../react/src/switch`.
Valide os estilos com `npm run dev`; a habilitação no build depende da validação pelo dono.

A mesma regra vale para `checkbox`: enquanto `dist/checkbox` não existir, a página usa `../react/src/checkbox`.
Valide com `npm run dev`; a habilitação no build depende da validação pelo dono.

A mesma regra vale para `multiselect`: enquanto `dist/multiselect` não existir, a página usa `../react/src/multiselect`.
Valide o campo e o painel com `npm run dev`; a habilitação no build depende da validação pelo dono.

A mesma regra vale para `textarea`: enquanto `dist/textarea` não existir, a página usa `../react/src/textarea`.
Valide com `npm run dev` (modos `Controlled` e `HookForm`, `autoResize`, erro, disabled e readonly); a habilitação no build depende da validação pelo dono.

## Como o modo `dev` liga o sandbox à lib

Em `react-sandbox/vite.config.ts`:
- `@orangesix/react/<comp>` → `../react/src/<comp>`: editar um arquivo em `react/src` atualiza o sandbox na hora.
- `@orangesix/react/style.css` → `../react/src/style/style.css`: o `@tailwindcss/vite` do sandbox compila o CSS da lib ao vivo. **Não é preciso rodar build na lib.**
- `resolve.dedupe` evita duas cópias de React e PrimeReact entre sandbox e biblioteca.
- O sandbox instala o PrimeReact 10.9.9 como consumidor e configura `PrimeReactProvider` de `primereact/api`, com `value={{ unstyled: true }}`, em `src/main.tsx`.
- `server.fs.allow` libera a leitura da pasta `../react`.
- As bordas dos painéis do sandbox usam `--color-shell-border`. Não reutilize `--color-border` nesse layout:
  esse token pertence ao tema dos componentes e uma definição no sandbox sobrescreve o valor de `theme.css`.

No sandbox os imports usam o nome do pacote (`@orangesix/react/button`), e não o alias curto dos consumidores (`@orangesix/button`).

## Fluxo de trabalho

1. Rodar `npm run dev` em `react-sandbox/`.
2. Editar o componente em `react/src/<comp>/`.
3. Validar o resultado no sandbox: variações, modos `Controlled`/`HookForm`, estados (disabled, readonly, erro).
   O botão de sol/lua no cabeçalho da prévia alterna o tema do conteúdo entre claro e escuro.
4. Habilitar o componente em `build/components.ts`, rodar `npm run build` na lib e conferir com `npm run dev:package`. Esse modo resolve `@orangesix/react/<comp>` → `react/dist/<comp>` pelo `package.json` da pasta, igual aos consumidores. Sem `react/dist`, o sandbox avisa para rodar o build.

A mesma regra vale para `autocomplete`: enquanto `dist/autocomplete` não existir, a página usa `../react/src/autocomplete`.
Valide os modos Controlled e HookForm, sugestões, template e estados com `npm run dev`; a habilitação depende da validação pelo dono.

A mesma regra vale para `editor`: enquanto `dist/editor` não existir, a página usa `../react/src/editor`.
Valide o modo Controlled e as opções da barra com `npm run dev`; a habilitação depende da validação pelo dono.

A mesma regra vale para `inputfilter`: enquanto `dist/inputfilter` não existir, a página usa `../react/src/inputfilter`.
Valide os tipos `text`, `number`, `date` e `autocomplete`, o erro e o estado desabilitado com `npm run dev`; a habilitação depende da validação pelo dono e de `utils` estar habilitado no build.

A mesma regra vale para `accordion`: enquanto `dist/accordion` não existir, a página usa `../react/src/accordion`.
Valide abrir/fechar, `multiple`, aba desabilitada e os temas claro/escuro com `npm run dev`; a habilitação depende da validação pelo dono.

A mesma regra vale para `tabview`: enquanto `dist/tabview` não existir, a página usa `../react/src/tabview`.
Valide troca de aba, ícones, aba desabilitada/fechável, `tabActiveRender` e os temas claro/escuro com `npm run dev`; a habilitação depende da validação pelo dono.

O Calendar está disponível no modo `npm run dev`, com os exemplos Controlled e HookForm, seguindo o padrão das páginas dos demais campos. Permanece fora do build até validação visual pelo dono.

O Message está disponível no sandbox com confirmação modal e conteúdo HTML. Valide confirmar, cancelar, fechamento por Escape/botão, foco e temas claro/escuro. Permanece fora do build até validação pelo dono.

O Modal está disponível no sandbox com cabeçalho, conteúdo e rodapé, usando a mesma base visual do Message.
Valide arraste, maximizar/restaurar, tamanhos, posições, clique na máscara, Escape, foco e temas claro/escuro.
Permanece fora do build até validação pelo dono.

A mesma regra vale para `picklist`: enquanto `dist/picklist` não existir, a página usa `../react/src/picklist`.
Valide seleção, os quatro botões de transferência, filtro, `disabled`, layout em coluna abaixo de `md` e os temas claro/escuro com `npm run dev`; a habilitação depende da validação pelo dono.

A mesma regra vale para `loading`: enquanto `dist/loading` não existir, a página usa `../react/src/loading`.
Valide os cinco indicadores (`border`, `grow`, `bars`, `pulse`, `orbit`), `text`, cores, `opacity`, `fullscreen` e o centro personalizado com `motion`
(instalado apenas no sandbox, que faz o papel do consumidor) com `npm run dev`; a habilitação depende da validação pelo dono.
