<h1 align="center">
  <br>
  <a href="https://embrapa.br" target="_blank"><img src="https://raw.githubusercontent.com/embrapa-status/pwa/master/src/assets/logo.png" alt="Embrapa" width="400"></a>
  <br>
  Embrapa Digital Services Status
  <br>
</h1>

<h4 align="center">Ferramenta de verificação do status dos principais serviços digitais corporativos e das unidades descentralizadas da Embrapa</h4>

## Getting Started

Instale a versão mais recente do [NodeJS](https://nodejs.org/) e, em seguida, o [Vue CLI](https://cli.vuejs.org/):

```
npm install -g @vue/cli
```

Feito isso, clone este projeto, acesse a pasta pelo console e execute:

```
npm install
```

Para rodar a aplicação (em ambiente de desenvolvimento) execute:

```
npm run serve
```

## Adicionando Serviços

Para adicionar novos serviços à ferramenta, acesse o diretório ```/src/settings/services``` e edite o arquivo ```corporate.json``` para incluir serviços corporativos e  ```local.json``` para incluir serviços de unidades descentralizadas.

> **Atenção!** Utilize um plugin para **ESLint** em sua IDE de desenvolvimento de forma a manter o estilo padronizado do código e mitigar erros de implementação.

Para enviar suas alterações para o repositório, você deve criar um *merge request*. Existem duas formas de fazer isso. A primeira, é solcitar acesso ao repositório. Para isso, entre em contato comigo via WhastApp](https://whats.link/carromeu). A segunda, é criando primeiramente seu próprio *fork* do projeto. Veja a [documentação do GitHub](https://docs.gitlab.com/ee/user/project/merge_requests/creating_merge_requests.html) para maiores informações.

## Informações Importantes

A ferramenta é um [PWA](https://blog.rocketseat.com.br/pwa-o-que-e-quando-utilizar/) (do inglês, *Progressive Web Application*). Assim, todas as chamadas aos serviços remotos que estão sendo testados são realizados diretamente do dispositivo cliente em que a aplicação é instalada, ou seja, do dispositivo do usuário final. Não existe, portanto, um *backend* com uma aplicação remota associada a esta ferramenta. O [GitHub Pages](https://pages.github.com/), neste caso, faz papel apenas de servidor web, provendo os arquivos que são cacheados no dispositivo cliente, sem qualquer código *server-side*.

O primeiro teste que a ferramenta executa é para verificar se o usuário está [com acesso à internet](https://www.w3schools.com/jsref/prop_nav_online.asp).

Em seguida é utilizada a [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) para testar o acesso aos serviços remotos listados nos arquivos de configuração da ferramenta (```corporate.json``` e ```local.json```). Como, na prática, a aplicação roda diretamente do navegador e acessa URLs remotas às quais não poderíamos ter controle, foi necessário atentar-se para prevenir o bloqueio do acesso devido à política de [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) e também em relação ao formato dos recursos diagnosticados. Assim, optou-se por utilizar o método ```HEAD``` nos domínios e subdomínios das aplicações.
