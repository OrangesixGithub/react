<div align="center">
  <h1>@Orangesix/React</h1>
  <p>Uma biblioteca moderna de componentes UI React</p>
</div>

## 🚀 Visão Geral

@Orangesix/React é uma biblioteca de componentes UI rica e premium para React. Oferece uma extensa coleção de
componentes flexíveis e personalizáveis para criar aplicações web modernas e responsivas.

## ✨ Características

- 📦 Conjunto completo de componentes UI
- 🎨 Temas personalizáveis
- 🌐 Design responsivo
- ♿ Acessibilidade
- 🛠️ Fácil integração

## 🔄 Pacotes

- React >= 19.1.0
- ReactDOM >= 19.1.0
- PrimeReact 10.9.9

## PrimeReact 10.9.9 e Tailwind v4 nos projetos consumidores

O PrimeReact 10.9.9 é uma `peerDependency` fixada da Orange Six. Cada projeto consumidor instala essa versão e configura o modo unstyled uma vez na raiz:

```bash
npm install primereact@10.9.9
```

```tsx
import { PrimeReactProvider } from "primereact/api";

<PrimeReactProvider value={{ unstyled: true }}>
    <App/>
</PrimeReactProvider>
```

Importe `@orangesix/react/style.css` uma vez na entrada da aplicação. Os componentes modernizados usam estilos próprios com Tailwind v4, sem importar temas CSS do PrimeReact. A versão 10.9.9 do PrimeReact é distribuída sob [licença MIT](https://github.com/primefaces/primereact/blob/10.9.9/LICENSE.md).

## 🤝 Contribuição

Contribuições são sempre bem-vindas! Por favor, leia nossas diretrizes de contribuição antes de submeter um PR.

## 📄 Licença

Este projeto está licenciado sob a Licença MIT.

## 🌟 Suporte

- Reporte problemas através das [Issues](https://github.com/OrangesixGithub/react/issues)

---

<div align="center">
  <p>Desenvolvido com ❤️ pela equipe OrangeSix</p>
</div>

