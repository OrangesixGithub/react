# Sandbox (`../react-sandbox`)

Um ambiente Vite para ver e testar os componentes em tempo real enquanto eles são desenvolvidos. O sandbox tem o próprio `AGENTS.md`, com o padrão de código dele.

## Modos

| Comando (em `react-sandbox/`) | Fonte dos componentes | Uso |
|---|---|---|
| `npm run dev` | `../react/src` (código-fonte) | Desenvolvimento com HMR |
| `npm run dev:package` | `../react/dist` (pacote gerado pelo build) | Validar o que será publicado, sem publicar |

## Como o modo `dev` liga o sandbox à lib

Em `react-sandbox/vite.config.ts`:
- `@orangesix/react/<comp>` → `../react/src/<comp>`: editar um arquivo em `react/src` atualiza o sandbox na hora.
- `@orangesix/react/style.css` → `../react/src/style/style.css`: o `@tailwindcss/vite` do sandbox compila o CSS da lib ao vivo. **Não é preciso rodar build na lib.**
- `resolve.dedupe: ["react", "react-dom"]` evita duas cópias do React.
- `server.fs.allow` libera a leitura da pasta `../react`.

No sandbox os imports usam o nome do pacote (`@orangesix/react/button`), e não o alias curto dos consumidores (`@orangesix/button`).

## Fluxo de trabalho

1. Rodar `npm run dev` em `react-sandbox/`.
2. Editar o componente em `react/src/<comp>/`.
3. Validar o resultado no sandbox: variações, modos `Controlled`/`HookForm`, estados (disabled, readonly, erro).
4. Habilitar o componente em `build/components.ts`, rodar `npm run build` na lib e conferir com `npm run dev:package`. Esse modo resolve `@orangesix/react/<comp>` → `react/dist/<comp>` pelo `package.json` da pasta, igual aos consumidores. Sem `react/dist`, o sandbox avisa para rodar o build.
