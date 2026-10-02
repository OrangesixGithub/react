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
