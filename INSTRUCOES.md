# Instruções para editar o site

Este site foi feito em HTML, CSS e JavaScript puro. Você pode editar os arquivos com qualquer editor de texto, como VS Code, Bloco de Notas ou Notepad++.

## Arquivos principais

- `index.html`: textos, seções, links, formulário e estrutura da página.
- `estilos.css`: cores, tamanhos, espaçamentos, fontes e aparência.
- `animacoes.js`: menu mobile, animações, carrossel e WhatsApp.
- `imagens/`: logo, favicons e fotos do site.

## Como abrir o site no computador

1. Abra a pasta do projeto.
2. Dê dois cliques no arquivo `index.html`.
3. O site será aberto no navegador.
4. Sempre que editar algo, salve o arquivo e atualize a página.

## Como alterar os textos

1. Abra `index.html`.
2. Procure pelo texto que deseja mudar usando `Ctrl + F`.
3. Troque apenas o texto entre as tags.

Exemplo:

```html
<h1>Seu visual no próximo nível</h1>
```

Você pode trocar para:

```html
<h1>Beleza premium para todos os estilos</h1>
```

As seções estão comentadas no arquivo:

- `TOPO / MENU`
- `BANNER INICIAL`
- `SOBRE O NEGÓCIO`
- `NOSSOS SERVIÇOS`
- `AVALIAÇÕES / CARROSSEL`
- `GALERIA`
- `ONDE ESTAMOS`
- `FALE CONOSCO`
- `RODAPÉ`

## Como trocar as fotos

1. Abra a pasta `imagens/`.
2. Substitua a imagem desejada por outra com o mesmo nome.
3. Mantenha a extensão igual, por exemplo `.jpg` ou `.png`.
4. Atualize a página no navegador.

Fotos da galeria:

- `galeria-01.jpg`
- `galeria-02.jpg`
- `galeria-03.jpg`
- `galeria-04.jpg`
- `galeria-05.jpg`
- `galeria-06.jpg`

Imagem do banner:

- `hero-bg.jpg`

Imagem da seção sobre:

- `sobre-equipe.jpg`

Dica: use imagens leves, de preferência com menos de 500 KB cada. Isso ajuda o site a carregar rápido.

## Como substituir a logo

A logo está na pasta `imagens/` com estes nomes:

- `logo-original.png`
- `logo.png`
- `logo-small.png`
- `favicon-16x16.png`
- `favicon-32x32.png`
- `apple-touch-icon.png`

Para trocar a logo:

1. Coloque sua nova logo em PNG com fundo transparente.
2. Salve uma versão maior como `logo.png`.
3. Salve uma versão menor como `logo-small.png`.
4. Para favicon, use versões pequenas:
   - `favicon-16x16.png`
   - `favicon-32x32.png`
   - `apple-touch-icon.png`
5. Mantenha os nomes iguais para não precisar mexer no código.

Se a logo ficar muito grande ou pequena no topo, abra `estilos.css` e procure por:

```css
.marca img
```

Altere o valor de `width`.

## Como alterar WhatsApp

Abra `animacoes.js` e encontre esta linha:

```js
const WHATSAPP_LINK = "https://wa.me/5511952927991?text=Olá!%20Gostaria%20de%20saber%20mais%20informações";
```

Troque `5511952927991` pelo número desejado.

Formato:

- `55`: Brasil
- `11`: DDD
- `999999999`: número

Exemplo:

```js
const WHATSAPP_LINK = "https://wa.me/5511987654321?text=Olá!%20Gostaria%20de%20saber%20mais%20informações";
```

No formulário de contato, também existe um link de WhatsApp dentro do próprio `animacoes.js`. Procure por:

```js
window.open(`https://wa.me/5511952927991?text=${texto}`, "_blank", "noopener");
```

Troque o número ali também.

## Como alterar Instagram e Facebook

Abra `index.html` e procure por:

```html
https://instagram.com/nomeaqui
```

Troque pelo Instagram real.

Depois procure por:

```html
https://facebook.com/nomeaqui
```

Troque pelo Facebook real.

Esses links aparecem no topo e no rodapé.

## Como adicionar ou remover avaliações

Abra `index.html` e procure por:

```html
<div class="depoimento">
```

Cada bloco desse é uma avaliação.

Para adicionar uma nova avaliação, copie um bloco inteiro:

```html
<div class="depoimento">
  <p>"Texto do depoimento aqui."</p>
  <strong>Nome da pessoa</strong>
  <span>Tipo de serviço</span>
</div>
```

Cole junto dos outros depoimentos e edite os textos.

Para remover, apague o bloco completo do depoimento que não quiser.

## Como adicionar ou remover serviços

Abra `index.html` e procure por:

```html
<article class="servico-card reveal">
```

Cada bloco é um serviço.

Para adicionar, copie um bloco completo, cole junto dos outros e edite número, título e descrição.

Para remover, apague o bloco completo.

## Como alterar endereço e mapa

Abra `index.html` e procure por:

```html
Rua Exemplo, 123 - Centro
```

Troque pelo endereço real.

Para alterar o mapa, procure por:

```html
https://www.google.com/maps?q=Rua%20Exemplo%20123%20Sao%20Paulo&output=embed
```

Entre no Google Maps, pesquise seu endereço, copie um link de compartilhamento/incorporação e substitua esse endereço.

## Como alterar cores

Abra `estilos.css` e procure por:

```css
:root {
```

As principais cores estão ali:

- `--preto`
- `--laranja`
- `--laranja-2`
- `--pessego`
- `--branco`
- `--cinza`

Troque com cuidado para manter contraste e leitura.

## Como publicar grátis na internet

### Opção 1: Netlify

1. Acesse `https://www.netlify.com/`.
2. Crie uma conta.
3. Clique para adicionar um novo site.
4. Arraste a pasta do projeto para a área de upload.
5. O Netlify vai gerar um link público.

### Opção 2: Vercel

1. Acesse `https://vercel.com/`.
2. Crie uma conta.
3. Clique em adicionar projeto.
4. Envie os arquivos ou conecte um repositório do GitHub.
5. A Vercel vai gerar um link público.

### Opção 3: GitHub Pages

1. Crie uma conta em `https://github.com/`.
2. Crie um repositório novo.
3. Envie os arquivos do site.
4. Vá em `Settings` > `Pages`.
5. Escolha a branch principal e salve.
6. O GitHub vai criar um link público.

## Como conectar domínio próprio

1. Compre um domínio em empresas como Registro.br, GoDaddy, Hostinger ou Cloudflare.
2. Publique o site no Netlify, Vercel ou outro serviço.
3. No painel da hospedagem, procure por `Domains` ou `Domínios`.
4. Adicione seu domínio.
5. A plataforma vai mostrar registros DNS.
6. Copie esses registros para o painel onde comprou o domínio.
7. Aguarde a propagação. Pode levar de alguns minutos até 48 horas.

## Checklist antes de publicar

- Trocar número do WhatsApp.
- Trocar Instagram e Facebook.
- Trocar endereço e mapa.
- Trocar fotos da galeria.
- Revisar textos dos serviços.
- Revisar depoimentos reais.
- Testar em celular e computador.
- Clicar em todos os botões.
