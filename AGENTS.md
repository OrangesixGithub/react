# @orangesix/react: guia para agentes de IA

Biblioteca de componentes React da Orange Six. A versão **3.x** encapsula o **PrimeReact 11** com estilo próprio (Tailwind v4) e precisa continuar compatível com os projetos que usam a **2.x**.

Leia este arquivo inteiro antes de alterar qualquer coisa. Os detalhes estão em `docs/`:

| Documento | Quando ler |
|---|---|
| [docs/build.md](docs/build.md) | Ao mexer em `vite.config.ts`, `build/`, `package.json` ou no formato do `dist/` |
| [docs/compatibilidade.md](docs/compatibilidade.md) | Antes de renomear, mover ou remover qualquer coisa exportada |
| [docs/componentes.md](docs/componentes.md) | Ao criar ou migrar um componente |
| [docs/sandbox.md](docs/sandbox.md) | Ao testar componentes no `../react-sandbox` |

## Regras inegociáveis

1. **Não quebrar os consumidores 2.x.** Os projetos importam `@orangesix/<componente>` através de um alias apontando para a pasta do componente no pacote. A estrutura `dist/<componente>/{index.mjs, index.d.ts, package.json, @types/}` é contrato público.
2. **Só ESM, com extensão `.mjs`.** Não gerar CommonJS. O PrimeReact 11 é ESM-only.
3. **Cada `src/<componente>/` tem um `package.json`** com `main`/`module` → `./index.mjs` e `types` → `./index.d.ts`. Não remover e não substituir por `exports` na raiz.
4. **Dependências nunca entram no bundle.** Tudo em `dependencies`/`peerDependencies` fica externo automaticamente (`build/external.ts`). Nova dependência de runtime vai em `dependencies`, e não em `devDependencies`.
5. **Um único build.** `npm run build` (vitest + `vite build`) gera JS, tipos, `style.css`, fontes e manifests. Não criar scripts de build paralelos. Erro de tipo em componente habilitado **falha o build**, de propósito; não contornar.
6. **Metadados só no `package.json` raiz** (`private: true`). O `dist/package.json` é derivado dele. Publicação **só pelas branches `master` (final) e `beta` (pré-release)**; demais branches não publicam (ver `docs/build.md`).
7. **Preservar a API pública da 2.x** (nomes de props, `mode="Controlled" | "HookForm"`, nomes exportados). Prop obsoleta recebe `@deprecated`, e não é removida.
8. **Sem Bootstrap, jQuery ou SCSS em código novo.** Estilo é Tailwind v4. Ícones: `primeicons`.
9. **Siga o padrão de código de `docs/componentes.md`** e rode `npx eslint <arquivo>` nos arquivos alterados.
10. **Só entra no `dist/` o que foi validado no sandbox.** Os componentes são ligados um a um em `build/components.ts`. Nunca habilite um componente que o dono do projeto não validou.
11. **Use `src/api/` como referência estrutural para as próximas migrações.** Siga os exports, a separação de tipos por assunto, os testes e as verificações descritos em `docs/componentes.md`.

## Comandos

```bash
npm run build      # testes + build completo em dist/
npm run test       # vitest com UI
npm run lint       # eslint
```

Para ver um componente em tempo real, rode `npm run dev` em `../react-sandbox`.

## Estado atual (3.0.0-beta)

- A estrutura do pacote e o build estão definidos e estáveis.
- **Os componentes ainda usam a API do PrimeReact 10** e estão sendo migrados um a um. Os erros de TypeScript que o `vite-plugin-dts` mostra no build vêm desse código legado e não impedem o build.
- `api` está habilitada em `build/components.ts` e seu build foi confirmado. Os próximos componentes entram após validação no sandbox.
- Ao migrar um componente, atualize a tabela de status em `docs/componentes.md`.
