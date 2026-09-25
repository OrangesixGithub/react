# Sandbox (`../react-sandbox`)

Um ambiente Vite para ver e testar os componentes em tempo real enquanto eles são desenvolvidos. O sandbox tem o próprio `AGENTS.md`, com o padrão de código dele.

## Modos

| Comando (em `react-sandbox/`) | Fonte dos componentes | Uso |
|---|---|---|
| `npm run dev` | `../react/src` (código-fonte) | Desenvolvimento com HMR |
| `npm run dev:package` | `../react/dist` (pacote gerado pelo build) | Validar o que será publicado, sem publicar |

Enquanto `input` estiver desligado em `build/components.ts`, a página dele usa `../react/src/input` também no modo `dev:package`; valide seu visual com `npm run dev`, que compila o CSS do fonte. Quando `dist/input` existir, o sandbox passa a usar automaticamente a versão compilada.

## Como o modo `dev` liga o sandbox à lib

Em `react-sandbox/vite.config.ts`:
- `@orangesix/react/<comp>` → `../react/src/<comp>`: editar um arquivo em `react/src` atualiza o sandbox na hora.
- `@orangesix/react/style.css` → `../react/src/style/style.css`: o `@tailwindcss/vite` do sandbox compila o CSS da lib ao vivo. **Não é preciso rodar build na lib.**
- `resolve.dedupe` evita duas cópias de React e PrimeReact entre sandbox e biblioteca.
- O sandbox instala o PrimeReact 11 como consumidor e configura `PrimeReactProvider` em `src/main.tsx`.
- `server.fs.allow` libera a leitura da pasta `../react`.

No sandbox os imports usam o nome do pacote (`@orangesix/react/button`), e não o alias curto dos consumidores (`@orangesix/button`).

## Fluxo de trabalho

1. Rodar `npm run dev` em `react-sandbox/`.
   Para testar com uma chave PrimeUI válida, defina `VITE_PRIMEUI_LICENSE` no `.env.local` do sandbox.
2. Editar o componente em `react/src/<comp>/`.
3. Validar o resultado no sandbox: variações, modos `Controlled`/`HookForm`, estados (disabled, readonly, erro).
   O botão de sol/lua no cabeçalho da prévia alterna o tema do conteúdo entre claro e escuro.
4. Habilitar o componente em `build/components.ts`, rodar `npm run build` na lib e conferir com `npm run dev:package`. Esse modo resolve `@orangesix/react/<comp>` → `react/dist/<comp>` pelo `package.json` da pasta, igual aos consumidores. Sem `react/dist`, o sandbox avisa para rodar o build.
