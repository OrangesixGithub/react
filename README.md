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
- PrimeReact 11

## PrimeReact 11 nos projetos consumidores

O PrimeReact 11 é uma `peerDependency` da Orange Six. Cada projeto consumidor instala o PrimeReact e configura sua chave PrimeUI uma vez na raiz:

```bash
npm install primereact@^11.1.0 @primereact/core@^11.1.0
```

```tsx
import { PrimeReactProvider } from "@primereact/core/config";

<PrimeReactProvider license={import.meta.env.VITE_PRIMEUI_LICENSE}>
    <App/>
</PrimeReactProvider>
```

Em projetos Vite, defina `VITE_PRIMEUI_LICENSE` na configuração de ambiente da aplicação. A chave não é incluída no pacote Orange Six. A licença MIT deste repositório não substitui a licença PrimeUI exigida para desenvolver com o PrimeReact 11; consulte os [termos oficiais](https://primeui.dev/licenses).

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

