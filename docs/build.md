# Build e estrutura do pacote

## Formato

- **Somente ESM, extensão `.mjs`**, como no PrimeReact 11. Com `.mjs` o arquivo é ESM independente do campo `"type"`, e funciona em bundlers e no Node puro.
- **Não gerar CommonJS.** O PrimeReact 11 não tem build CJS, então um `.cjs` do pacote não funcionaria de qualquer forma. Se algum dia for necessário, bastaria adicionar `"cjs"` em `build.lib.formats`.

## Estrutura do repositório

```
react/
  build/                ← código que roda apenas no build (não é publicado)
    components.ts       ← lista de componentes habilitados no build + validação de dependências
    entries.ts          ← componentes habilitados → entrada "<comp>/index"
    external.ts         ← dependencies/peerDependencies (e subpaths) ficam fora do bundle
    manifest.ts         ← emite dist/package.json, README.md, LICENSE e dist/<comp>/package.json
    style.ts            ← emite style.css (Tailwind) e as fontes do primeicons
    types.ts            ← gera os .d.ts e FALHA o build se houver erro de tipo
  src/
    <componente>/       ← um diretório por componente (ver docs/componentes.md)
    style/style.css     ← entrada do CSS do pacote
  vite.config.ts        ← apenas compõe os plugins de build/
  vitest.config.ts      ← testes (separado: não depende da lista de componentes)
```

Regras:
- **O `vite.config.ts` só compõe.** Qualquer lógica nova de build vira um arquivo em `build/`, exportando uma função ou um plugin (`name: "orangesix:<nome>"`).
- **Imports de `build/` são relativos e incluem a extensão** (`./build/style.ts`). Não criar alias (`#build`, `@build`), por decisão do projeto.
- **Todo arquivo do `dist/` passa pelo pipeline do Vite.** Plugins emitem arquivos com `this.emitFile` no `generateBundle`, nunca com `fs.writeFileSync` no `closeBundle`. Assim tudo aparece no relatório do build e respeita o `emptyOutDir`. Não usar plugins de cópia.

## Componentes habilitados (`build/components.ts`)

O build **só gera o que está habilitado**. Cada componente é ligado depois de ser validado no sandbox, descomentando a linha dele:

```ts
export const components: string[] = [
    "api",
    "box",
    // "button",   ← ainda não validado: fora do dist/
];
```

A lista controla tudo o que vai para o `dist/`:
- as entradas JS (`build/entries.ts`);
- os `package.json` de cada pasta (`build/manifest.ts`);
- os `.d.ts` e a checagem de tipos (`build/types.ts`);
- o `style.css`, que varre apenas as pastas habilitadas.

Validação feita ao carregar o `vite.config.ts` (o build para com erro):
- **Lista vazia:** "Nenhum componente habilitado".
- **Nome inexistente em `src/`.**
- **Dependência interna desligada:** o build analisa os imports relativos entre pastas. Se `input` importa `../box`, o erro é `"input" depende de "box", que não está habilitado.`

Ordem natural de habilitação: `api` → `box` → os demais, porque quase todos dependem desses dois.

## Checagem de tipos

O `build/types.ts` usa o hook `afterDiagnostic` do `vite-plugin-dts`. **Qualquer erro de tipo em um componente habilitado falha o build**, com a lista de erros. Componentes desligados não são checados. Por isso um componente só pode ser habilitado quando estiver sem erros de tipo.

## Saída (`dist/`)

```
dist/
  package.json          ← gerado a partir do package.json raiz (ver "Metadados")
  README.md
  LICENSE
  style.css             ← CSS único do pacote (Tailwind + primeicons)
  fonts/                ← fontes do primeicons, referenciadas por style.css
  <componente>/
    index.mjs           ← entrada pública do componente
    index.d.ts
    package.json        ← { main, module: "./index.mjs", types: "./index.d.ts" }
    @types/index.d.ts   ← tipos públicos (há consumidores importando daqui)
    <interno>.mjs       ← demais módulos (preserveModules), ex.: box.mjs, core/controlled.mjs
    <interno>.d.ts
```

- `preserveModules` + `preserveModulesRoot: "src"` mantém um arquivo por módulo, espelhando `src/`.
- O `dist/` é apagado a cada build (`emptyOutDir`).

## Metadados (`package.json`)

- **O `package.json` raiz é a fonte única** de nome, versão, descrição, autor, licença, repositório, keywords e dependências. Ele tem `"private": true` para impedir `npm publish` acidental na raiz.
- **O `dist/package.json` é gerado** (`build/manifest.ts`) copiando os campos publicáveis do raiz e acrescentando:
  - `"type": "module"`;
  - `"style": "./style.css"`;
  - `"sideEffects": ["*.css"]`, que permite tree-shaking nos consumidores (só o CSS tem efeito colateral).
- Para mudar um metadado, edite o `package.json` raiz, e não o `build/manifest.ts`.
- O **`package-lock.json` é versionado.** O CI instala com `npm ci`, e o build usa exatamente as mesmas versões em qualquer máquina.

## Dependências externas

`build/external.ts` marca como externo todo nome listado em `dependencies` e `peerDependencies`, além dos subpaths (`primereact/button`, `react/jsx-runtime`) e `@primereact/*`. Consequências:
- **Não existe lista manual de externos.** Não recriar o antigo `vite.external.json`.
- **Uma dependência de runtime em `devDependencies` seria embutida no bundle.** Sempre declare onde ela é usada.

## CSS

- A entrada é `src/style/style.css`. O `build/style.ts` usa a API do Tailwind (`@tailwindcss/node` + `@tailwindcss/oxide`), varre as classes usadas nos componentes habilitados e emite `style.css` minificado.
- As fontes do `primeicons` são emitidas em `fonts/`. O `style.css` as referencia como `./fonts/...`.
- O consumidor importa **uma vez**: `@orangesix/react/style.css`.
- Não usar a CLI do Tailwind nem scripts como `build:css`.

## Scripts

| Script | O que faz |
|---|---|
| `npm run build` | `vitest run` + `vite build` (JS, `.d.ts` com checagem de tipos, `style.css`, fontes, manifests) |
| `npm run build:dev` | Só o `vite build`, sem testes |
| `npm run test` | Vitest com UI |
| `npm run lint` / `lint:fix` | ESLint |

## Publicação (`.github/workflows/publish.yml`)

A publicação é disparada **somente por push nas branches `master` e `beta`**. As demais branches (ex.: `3.0`, onde acontece o desenvolvimento) não disparam nada.

| Branch | Versão exigida | NPM dist-tag | GitHub |
|---|---|---|---|
| `beta` | com sufixo (`3.0.0-beta.2`) | `beta` | tag + pré-release |
| `master` | final (`3.0.0`) | `latest` | tag + release |

Para publicar:
1. Atualize a `version` no `package.json` e faça o commit.
2. Leve o commit para `beta` ou `master` (merge/push).

O workflow então:
- **valida a versão para a branch** e falha se `master` tiver sufixo ou se `beta` não tiver;
- **pula tudo se a versão já estiver publicada no NPM**. Um push sem mudar a versão não publica e não dá erro;
- instala com `npm ci`, roda `lint` e `build`;
- publica o `dist/` no NPM com o dist-tag da branch;
- cria a tag `<versão>` e o release no GitHub.

Não crie tags de versão manualmente: o workflow cria.
