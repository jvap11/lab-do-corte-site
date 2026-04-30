# Engenharia reversa - scissorsscotch.com

Data da análise: 2026-04-29  
Alvo: https://scissorsscotch.com/home  
Escopo: análise não invasiva de páginas e arquivos públicos. Não foram feitos testes de login, compras, envio de formulários ou fuzzing de endpoints.

## Resumo executivo

O site da Scissors & Scotch é uma aplicação web renderizada no servidor, com front-end clássico baseado em jQuery, Bootstrap 4 e componentes HtmlStream/HSCore. A infraestrutura observada responde por nginx/1.18.0 em Ubuntu e usa cookie de sessão HTTP. O sitemap público ainda aponta para `flask-boilerplate.appseed.us`, o que, somado ao padrão `/static/...`, sugere fortemente uma aplicação Flask/AppSeed customizada.

O produto comunicado é uma experiência de grooming masculino com bar/lounge: corte, serviços de barba/spa, bebida inclusa, memberships, gift cards, eventos em grupo, franquia e carreiras. O funil principal é: escolher loja -> criar/entrar em conta -> agendar serviço.

## Arquitetura e tecnologia aparente

Stack visível no cliente:

- Backend provável: Flask/AppSeed customizado, atrás de nginx em Ubuntu.
- Renderização: HTML server-side, não SPA.
- UI: Bootstrap 4.3.1, HtmlStream/HSCore, jQuery, jQuery Migrate, Popper.
- Componentes JS: Fancybox, Custombox modal, Select2, Slick Carousel, Typed.js, DZS Parallaxer, daterangepicker/moment em gift cards, jQuery Mask.
- Ícones/fontes: Font Awesome, Adobe Typekit.
- Mapa: Google Maps JavaScript API, usado para mostrar a unidade selecionada.
- Analytics/ads: Segment, Google Analytics 4, Google Tag Manager, Meta Pixel. Marker.io e Intercom aparecem comentados no HTML.
- Assets: muitos arquivos próprios sob `/static/ss-assets/front/ss-design/...` e `/static/front/...`.

Evidências públicas relevantes:

- Comentário no HTML identifica "Scissors & Scotch Website Dev | Quant Digital".
- O sitemap em `https://scissorsscotch.com/sitemap.xml` ainda contém URL de boilerplate Flask/AppSeed.
- O cabeçalho HTTP observado: `Server: nginx/1.18.0 (Ubuntu)`.
- Cookie de sessão observado: `session=...; HttpOnly; Path=/; Expires=...`; no GET analisado não apareceram flags `Secure` ou `SameSite`.

## Estrutura de navegação

Rotas públicas principais encontradas:

- `/home` e `/`
- `/services`
- `/memberships`
- `/gift-card`
- `/booking?step=0`
- `/account`
- `/account-appointments`
- `/select-shop`
- `/locations`
- `/contact`
- `/groups-and-events`
- `/suits-suck` como Terms

Domínios externos ligados:

- `careers.scissorsscotch.com`
- `franchise.scissorsscotch.com`
- `www.cognitoforms.com` para grupos/eventos
- Facebook, Instagram e Twitter/X

## Conteúdo e posicionamento

Mensagem central:

- Barber shop/grooming + bar privado.
- "Do yourself a favor" e variações como CTA/assinatura.
- Serviços tradicionais de barbearia com linguagem premium e descontraída.
- Bebida inclusa como diferencial: cocktail, coffee ou cold one.

Home:

- Hero com CTA de booking.
- Prova social: nota 4.9/5 e 4.000+ reviews Google.
- Blocos de review/testimonial.
- Bloco de loja selecionada com endereço, telefone e horários.
- Membership como upsell.
- Careers como recrutamento/cultura.
- Press/buzz como validação.

Services:

- Explica pacotes nomeados por idade de scotch: Ten Year, Fifteen Year, Twenty-Five Year.
- Reforça que os serviços incluem uma bebida.
- Preço/detalhe depende da seleção de loja.

Memberships:

- Posicionamento: "Crafted by us. Curated by you." e "Let's make things official".
- Benefícios citados: upkeeps gratuitos, eventos de membros, descontos especiais.
- Pricing condicionado à loja escolhida.
- Formulário de interesse com email/telefone.

Gift cards:

- Valores rápidos exibidos: 75, 100 e 150 dólares.
- Campos públicos do formulário: valor, data de envio, nome/email do destinatário, nome/email do remetente e mensagem.
- Posta para `/gift-card-data`.

Contact:

- Lista telefones por estado e unidade.
- Informa que membership é gerenciado localmente por cada unidade.

## Personalização por loja

O site é location-aware. A unidade exibida varia por sessão/seleção/localização. Em uma coleta a home mostrou Charlotte Uptown, NC; outras páginas renderizaram Summerlin, NV ou Overland Park, KS em modais de confirmação.

O seletor de loja usa chamadas client-side que submetem um formulário POST para `/change-shop` com:

- `shop_id`
- `preferred_shop`
- `preferred_company_id`

Exemplos de unidades públicas observadas no booking:

| Unidade | shop_id | preferred_company_id |
| --- | ---: | ---: |
| University Village, WA | 157239 | 142003 |
| Castle Rock, CO | 156736 | 122564 |
| Lowry, CO | 155123 | 122564 |
| Erie, CO | 157743 | 142463 |
| Fort Collins, CO | 157928 | 142640 |
| Denver Tech Center, CO | 135970 | 122564 |
| Highlands Ranch, CO | 157307 | 122564 |
| Parker, CO | 153818 | 122564 |
| Union Market, DC | 141159 | 126229 |
| Navy Yard, DC | 140955 | 126229 |
| West Midtown, GA | 155839 | 140708 |
| Ankeny, IA | 134901 | 122564 |
| West Des Moines, IA | 121731 | 122564 |
| Wheaton, IL | 158716 | 143373 |
| Lenexa, KS | 155476 | 119196 |
| Olathe, KS | 132957 | 119196 |
| Overland Park, KS | 129055 | 119196 |
| Prairie Village, KS | 153499 | 119196 |
| STL - Brentwood, MO | 156765 | 119196 |
| Lee's Summit, MO | 157756 | 119196 |
| Charlotte Uptown, NC | 157496 | 142242 |
| Lincoln, NE | 157435 | 142198 |
| Aksarben Village, NE | 141701 | 122559 |
| West Omaha, NE | 135967 | 122559 |
| Elkhorn, NE | 158608 | 122559 |
| Summerlin, NV | 158368 | 143047 |
| Oklahoma City, OK | 134940 | 122564 |
| Brentwood, TN | 139682 | 125217 |
| Franklin, TN | 154942 | 125217 |
| Austin, TX | 137064 | 140391 |
| Dallas Uptown, TX | 134547 | 121291 |
| Houston Heights, TX | 155554 | 140434 |
| Quarry Village, TX | 155562 | 140391 |
| The Colony, TX | 137653 | 121291 |
| Arlington, VA | 153724 | 126229 |
| Reston, VA | 154995 | 126229 |

## Formulários e endpoints públicos

Formulários encontrados no HTML:

| Fluxo | Endpoint | Método | Campos visíveis |
| --- | --- | --- | --- |
| Login | `/scotch-login` | POST | `email`, `password`, em alguns modais `company_id` |
| Cadastro modal | sem action em alguns blocos; rotas relacionadas `/register` | - | `email`, `password`, `confirmPassword` |
| Recuperar senha | rota relacionada `/forgot-password` | - | `email` |
| Lead primeira visita | `/home` | POST | `first_name`, `last_name`, `phone`, `email` |
| Carreiras | `/careers` | POST | `career_shop` |
| Serviços/primeira visita | `/first-visit` | POST | depende do modal; não enviado/testado |
| Membership | `/memberships` | POST | email/telefone e loja selecionada |
| Gift card | `/gift-card-data` | POST | amount, send_date, recipient/sender names/emails, message |
| Troca de loja | `/change-shop` | POST | `shop_id`, `preferred_shop`, `preferred_company_id` |

## Comportamento de front-end

- Alerta de gift card aparece por sessão e é escondido com `sessionStorage.dismissed`.
- Header muda ao scroll via HSHeader.
- Modais de login, signup, recovery, shop selection, careers e lead forms são renderizados no HTML inicial.
- Typed.js anima termos na home: "Daymakers.", "Story tellers.", "Food sharers.", "Car dancers.", "Group huggers."
- Google Maps é inicializado com `lat/lng` da unidade selecionada.
- A troca de loja cria dinamicamente um `<form>` e submete POST; depois tenta recarregar a página.

## Observações de segurança e qualidade

Pontos para revisar do lado do dono do site:

- Sitemap está errado/desatualizado e denuncia boilerplate Flask/AppSeed.
- `robots.txt` retornou 404.
- Client-side expõe chaves/IDs públicos de analytics/maps. Isso é comum, mas a chave de Maps deve estar restrita por HTTP referrer e APIs permitidas.
- O cookie de sessão observado não mostrou `Secure` ou `SameSite`; vale confirmar configuração em produção.
- Não vi tokens CSRF nos formulários públicos renderizados. Pode haver proteção server-side fora do HTML, mas visualmente não apareceu.
- Há scripts/CDNs de terceiros; recomendável CSP e/ou SRI onde viável.
- Alguns elementos têm IDs duplicados ou genéricos, por exemplo campos de modais repetidos. Isso aumenta fragilidade de JS/validação.
- Algumas mensagens/placeholder são informais e antigas, como `bezos@amazon.com`, o que pode ser intencional de marca, mas chama atenção.

## Como reproduzir uma versão inspirada

Para recriar legalmente sem copiar assets/textos proprietários:

1. Montar app server-rendered simples ou SPA estático com rotas: home, services, memberships, gift card, booking, contact.
2. Criar um dataset próprio de lojas com estado, nome, telefone, endereço, horários, `shopId` interno e `companyId`.
3. Implementar seleção de loja persistida em cookie/session/localStorage.
4. Fazer booking em etapas: selecionar loja -> login/signup -> escolher serviço -> escolher profissional/data/hora -> confirmar.
5. Usar componentes equivalentes, mas não idênticos: hero com vídeo/imagem, cards de serviços, CTA fixo de booking, formulário de gift card.
6. Substituir identidade visual e copy por uma versão original.
7. Instrumentar analytics de modo controlado e com consentimento/privacy policy.

## Fontes consultadas

- https://scissorsscotch.com/home
- https://scissorsscotch.com/services
- https://scissorsscotch.com/memberships
- https://scissorsscotch.com/gift-card
- https://scissorsscotch.com/booking?step=0
- https://scissorsscotch.com/contact
- https://scissorsscotch.com/groups-and-events
- https://scissorsscotch.com/sitemap.xml
