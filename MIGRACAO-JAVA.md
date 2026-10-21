# Quem Resolve — entradas, saídas e migração do backend para Java

Este pacote contém o código React/TypeScript atual e o backend TypeScript que serve como referência. Não contém um backend Java implementado. Os dados do banco de produção não fazem parte do ZIP.

## Onde olhar primeiro

| Arquivo | Responsabilidade | Ponto de integração Java |
| --- | --- | --- |
| `app/page.tsx` | Tela React, formulários, estados e filtros | `request()` centraliza HTTP; o efeito com `new WebSocket()` centraliza atualização da lista |
| `app/globals.css` | Estilos responsivos | Permanece no frontend |
| `lib/api.ts` | Autenticação, regras, consultas, gravações e respostas JSON | Reimplementar como controladores, serviços e repositórios Java |
| `build/sites-worker.ts` | Entrada do servidor: `fetch(request, env, ctx)` | Encaminha `/api/*` para `api()` e trata `/api/live`; substituir este backend ao migrar |
| `db/schema.ts` | Definições das tabelas | Referência para entidades Java |
| `drizzle/0000_wonderful_white_queen.sql` | Estrutura SQL do banco atual | Referência de estrutura; adaptar tipos e sintaxe ao banco escolhido |
| `vite.config.ts` | Configuração do frontend e integração do servidor atual | Ponto para configurar um proxy de desenvolvimento para Java |

## Fluxo de entrada e saída

1. O cliente preenche um formulário em `app/page.tsx`.
2. O React chama `request(path, body)`. Com `body`, utiliza POST e JSON; sem `body`, utiliza GET.
3. O endereço atual é relativo: `/api/` + `path`, no mesmo domínio do frontend.
4. `build/sites-worker.ts` recebe a requisição e a encaminha para `api(req, env)` em `lib/api.ts`.
5. `api()` recebe os dados com `req.json()`, a consulta com `new URL(req.url).searchParams` e a sessão com o cookie `qr_session`.
6. O servidor verifica autenticação, papel e valores. Consultas e gravações usam a conexão `env.DB` com SQL parametrizado.
7. A função `j()` devolve `Response.json(...)`, status HTTP e, quando necessário, o cabeçalho `Set-Cookie`.
8. O React lê `r.json()`, apresenta `error` quando HTTP não é sucesso e atualiza os estados da tela.

## Contrato HTTP atual

Os métodos abaixo são os utilizados pelo frontend. O código atual nem sempre bloqueia explicitamente outros métodos; os controladores Java devem aceitar somente os métodos previstos.

| Método / rota | Entrada do cliente | Saída JSON de sucesso | Acesso |
| --- | --- | --- | --- |
| POST `/api/register` | `{name,email,password,role}` | `{user:{id,name,email,role}}` e cookie | Sem sessão; `role` é `client` ou `provider` |
| POST `/api/login` | `{email,password}` | `{user:{id,name,email,role}}` e cookie | Sem sessão |
| GET `/api/me` | Cookie de sessão | `{user,profile}` | Sem sessão: ambos são `null` |
| POST `/api/logout` | `{}` e cookie | `{ok:true}` e remoção do cookie | Pode ser chamado sem sessão |
| GET `/api/providers` | Sem corpo ou filtros de URL | `{providers:[...]}` | Consulta pública dentro da aplicação |
| POST `/api/profile` | Perfil completo descrito abaixo e cookie | `{ok:true}` | Prestador autenticado |
| GET `/api/reviews?id=ID` | ID do prestador na query; cookie opcional | `{reviews:[...],contacted:boolean}` | Leitura pública; `contacted` depende da sessão |
| POST `/api/contact` | `{id:ID_DO_PRESTADOR}` e cookie | `{url:"https://wa.me/..."}` | Cliente autenticado |
| POST `/api/review` | `{id,rating,comment,confirmed}` e cookie | `{ok:true}` | Cliente com contato registrado e atendimento confirmado |

Todos os sucessos HTTP atuais retornam 200. Erros retornam `{error:"mensagem"}`. Principais status: 400 dados inválidos; 401 sem sessão ou login inválido; 403 papel/origem inelegível; 404 prestador ou operação inexistente; 409 e-mail já cadastrado; 500 falha interna; 503 banco indisponível.

### Cadastro

```json
{
  "name": "Ana Silva",
  "email": "ana@example.com",
  "password": "senhaExemplo123",
  "role": "client"
}
```

Senha atual: 8 a 128 caracteres. Nome: 3 a 80 caracteres. E-mail é normalizado para minúsculas e deve ser único. A senha não aparece na resposta.

### Cadastro/atualização do perfil profissional

```json
{
  "category": "Eletricista,Encanador",
  "title": "Instalações e reparos residenciais",
  "bio": "Serviços oferecidos e experiência profissional.",
  "city": "Campinas",
  "region": "Taquaral, Cambuí e bairros próximos",
  "price": 120,
  "unit": "por serviço",
  "phone": "5519999999999",
  "lat": -22.90,
  "lng": -47.05,
  "radius": 20
}
```

`category` é uma string com categorias separadas por vírgula, sem espaços adicionais entre os itens, e não um array. Opções: Eletricista, Encanador, Limpeza, Pintor, Jardinagem, Montador, Ar-condicionado, Reformas.

`unit`: `por serviço`, `por hora`, `por diária` ou `a combinar`. `price`: 0 a 1.000.000. `radius`: 1 a 500 km. `phone`: 55 + DDD + número. `lat` e `lng` podem ser ambos `null`; quando preenchidos, os dois devem ser válidos. O servidor usa o ID da sessão para definir o dono do perfil, nunca um ID enviado pelo formulário.

### Objeto de prestador retornado

```json
{
  "user_id": "uuid-do-prestador",
  "name": "Rafael Mendes",
  "category": "Eletricista,Encanador",
  "title": "Instalações e reparos residenciais",
  "bio": "Descrição dos serviços",
  "city": "Campinas",
  "region": "Taquaral e Cambuí",
  "price": 120,
  "unit": "por serviço",
  "phone": "5519999999999",
  "lat": -22.90,
  "lng": -47.05,
  "radius": 20,
  "updated": 1791300000000,
  "rating": 4.5,
  "review_count": 2
}
```

O React espera nomes como `user_id` e `review_count`. Preserve esses nomes nos DTOs JSON Java ou ajuste o frontend. `updated`, `created` e `expires` são timestamps em milissegundos desde Unix epoch. Sem avaliações: `rating=0` e `review_count=0`.

`GET /api/me` retorna um usuário com `id,name,email,role` e um perfil com os campos persistidos (sem os agregados `name,rating,review_count` da listagem).

### Avaliações

```json
{
  "id": "uuid-do-prestador",
  "rating": 5,
  "comment": "Atendimento muito bom e serviço bem realizado.",
  "confirmed": true
}
```

Nota inteira de 1 a 5; comentário de 10 a 1.000 caracteres. Deve existir um contato anterior do cliente com o prestador. `confirmed` significa declaração do cliente, não comprovação independente do atendimento. Há uma avaliação por par cliente/prestador; nova submissão atualiza a avaliação anterior. A média é calculada no servidor.

Consulta:

```json
{
  "reviews": [{"rating":5,"comment":"Ótimo atendimento.","created":1791300000000,"name":"Ana Silva"}],
  "contacted": true
}
```

## WebSocket — `/api/live`

Frontend: efeito em `app/page.tsx` com `new WebSocket(...)`.
Servidor: ramo `/api/live` em `build/sites-worker.ts`.

- Endpoint: `ws://DOMINIO/api/live` em HTTP; `wss://DOMINIO/api/live` em HTTPS.
- O cliente envia a mensagem de texto **`sync`**, imediatamente após conectar e a cada 5 segundos.
- O servidor devolve **`{"providers":[...]}`**, usando os mesmos objetos da listagem HTTP.
- Falha de consulta: **`{"error":"Atualização indisponível"}`**.
- Ao desconectar, o frontend tenta reconectar em 5 segundos.
- O protocolo atual é WebSocket nativo, não STOMP nem Socket.IO. Implemente o mesmo protocolo no Java ou altere ambos os lados.
- Atualização atual: sincronização solicitada pelo cliente, não broadcast instantâneo após cada gravação.
- O servidor valida a origem da conexão; na migração, configure a origem do frontend.

## Pesquisa e localização: detalhe importante

Hoje `GET /api/providers` traz a lista completa. Categoria, texto, cidade/região, nota mínima, preço máximo, distância e ordenação são processados no React, na expressão `const list`.

`locate()` chama `navigator.geolocation.getCurrentPosition()`. A localização do cliente fica no estado React e não é enviada como filtro ao servidor. A localização do prestador é enviada em `POST /api/profile`. A função `distance()` calcula distância aproximada em linha reta, não distância por ruas.

Para levar a pesquisa ao Java, definir uma evolução do contrato, por exemplo `GET /api/providers?category=Eletricista&city=Campinas&lat=...&lng=...&maxPrice=...&minRating=...&sort=...`. Esses parâmetros ainda não existem como filtros no backend atual. Depois alterar `refresh()` e decidir como o WebSocket preservará os mesmos filtros. Perfis sem coordenadas não aparecem na busca por proximidade atual; continuam disponíveis na busca por cidade.

## Banco atual e equivalentes Java

| Tabela | Conteúdo | Regras a preservar |
| --- | --- | --- |
| `users` | Nome, e-mail, hash de senha, papel | E-mail único; IDs UUID; nunca expor o hash |
| `sessions` | Hash do token, usuário e expiração | Autenticação conferida no servidor |
| `profiles` | Serviços, categorias, região, preço, contato, coordenadas | Um perfil por prestador; apenas o dono edita |
| `contacts` | Cliente e prestador contatado | Chave composta; evita contatos duplicados |
| `reviews` | Cliente, prestador, nota, comentário e data | Chave composta; uma nota por cliente/prestador |

O banco atual é D1/SQLite. Para usar outro banco no Java, recrie o esquema por migrações adequadas ao banco escolhido. As definições Drizzle e o SQL são referência, não entidades Java prontas.

## Sessão e conexão com Java

Hoje login/cadastro devolvem cookie `qr_session` com `HttpOnly`, `Secure`, `SameSite=Lax`, `Path=/` e duração de 7 dias. O token é armazenado como hash SHA-256. A senha usa PBKDF2-HMAC-SHA256, 100.000 iterações, salt textual UTF-8 e saída de 256 bits no formato `salt:hex`.

Para manter contas existentes, a verificação Java precisa ser compatível com esse formato ou usar uma migração de senha. Não use os hashes como senhas. Não há exportação de usuários reais neste pacote.

A conexão que exige menos alterações no React mantém `/api/*` e `/api/live` no mesmo domínio, encaminhando essas rotas ao Java. Em desenvolvimento, pode-se usar proxy para o servidor Java.

Se o Java ficar em outro domínio/porta, alterar a URL em `request()` e no construtor de WebSocket. Para HTTP com cookies, adicionar `credentials: 'include'` e configurar CORS, cookies, HTTPS e validação de origem de acordo com a implantação. Não colocar senha, token de banco ou segredos no React. Regras de cliente/prestador devem continuar sendo verificadas no Java.

## Divisão sugerida de responsabilidades Java

- `AuthController` e serviço de autenticação: register, login, me, logout.
- `ProviderController` e serviço de perfis: providers e profile.
- `ContactController`: contact e geração do link externo.
- `ReviewController`: reviews e review, elegibilidade e média.
- Handler WebSocket: live e mensagem sync.
- Entidades/repositórios: User, Session, ProviderProfile, Contact, Review.

Essa divisão é um mapa de trabalho, não código Java já incluído.
