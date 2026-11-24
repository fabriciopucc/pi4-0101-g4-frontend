# QuemResolve

Aplicação web responsiva que conecta clientes a prestadores de serviços locais. O sistema permite que clientes encontrem profissionais, consultem seus perfis e avaliações e iniciem o contato pelo WhatsApp. Prestadores podem criar e atualizar seus perfis profissionais para serem encontrados.

## Integrantes

| Integrante | RA | Responsabilidade |
|---|---|---|
| Bruno Apis | 25003368 | Objetivos do projeto |
| Fabrício Ferreira |25000040 | Visão geral, arquitetura, telas e anexos |
| Leonardo Salles | 25000446 | Testes |
| Matheus Barbosa | 25001218 | - |
| Matheus Vinicius | 25003297 | Requisitos, banco de dados e contratos |
| Matheus Pires | 25004875 | Contratos e decisões arquiteturais (ADR) |

## Repositórios

| Repositório | Conteúdo | Link |
|---|---|---|
| Frontend (principal) | Interface web | [Frontend](https://github.com/fabriciopucc/pi4-0101-g4-frontend) |
| Backend 1 | API intermediária HTTP/WebSocket | [Backend 1](https://github.com/fabriciopucc/pi4-0101-g4-backend-1) |
| Backend 2 | Acesso aos dados por socket TCP | [Backend 2](https://github.com/fabriciopucc/pi4-0101-g4-backend-2) |

### Releases v1.0

- [Frontend](https://github.com/fabriciopucc/pi4-0101-g4-frontend/releases/tag/v1.0)
- [Backend 1](https://github.com/fabriciopucc/pi4-0101-g4-backend-1/releases/tag/v1.0)
- [Backend 2](https://github.com/fabriciopucc/pi4-0101-g4-backend-2/releases/tag/v1.0)

## Como executar o projeto

O projeto está dividido em três repositórios Git independentes. Para executar a aplicação completa, é necessário clonar os três repositórios e manter a estrutura de diretórios indicada abaixo.

### 1. Pré-requisitos

Antes de iniciar, certifique-se de possuir as seguintes ferramentas instaladas:

- [Git](https://git-scm.com/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### 2. Criar a pasta do projeto

Abra um terminal e crie uma pasta para organizar os três repositórios:

```bash
mkdir QuemResolve
cd QuemResolve
```

### 3. Clonar os repositórios

Clone primeiro o repositório do frontend, que contém o arquivo `docker-compose.yml` e será utilizado como diretório principal da execução:

```bash
git clone https://github.com/fabriciopucc/pi4-0101-g4-frontend.git
```

Em seguida, clone os dois repositórios de backend:

```bash
git clone https://github.com/fabriciopucc/pi4-0101-g4-backend-1.git

git clone https://github.com/fabriciopucc/pi4-0101-g4-backend-2.git
```

Ao finalizar, a estrutura de diretórios deverá ser semelhante a esta:

```text
QuemResolve/
│
├── pi4-0101-g4-frontend/
│   ├── docker-compose.yml
│   ├── .env.example
│   └── codigo/
│       └── Dockerfile
│
├── pi4-0101-g4-backend-1/
│   └── codigo/
│       └── backend-intermediario/
│           └── Dockerfile
│
└── pi4-0101-g4-backend-2/
    └── codigo/
        └── backend-dados/
            └── Dockerfile
```

**Importante:** mantenha os nomes das pastas e a organização dos diretórios. O `docker-compose.yml` utiliza caminhos relativos para localizar os Dockerfiles dos três serviços.

### 4. Configurar as variáveis de ambiente

Entre na pasta do frontend, onde está localizado o `docker-compose.yml`:

```bash
cd pi4-0101-g4-frontend
```

Crie o arquivo `.env` a partir do modelo disponibilizado:

```bash
cp .env.example .env
```

No Windows, utilizando o Prompt de Comando:

```cmd
copy .env.example .env
```

O arquivo `.env` deve conter as seguintes variáveis:

```env
MYSQL_ROOT_PASSWORD=root123456
MYSQL_USER=quemresolve_app
MYSQL_PASSWORD=app123456
```

Essas variáveis são utilizadas pelo Docker Compose para configurar o acesso ao banco de dados MySQL.

**Atenção:** os valores apresentados são exemplos para execução local. Não compartilhe credenciais reais nem versione o arquivo `.env` no Git. O repositório deve disponibilizar apenas o arquivo-modelo `.env.example`.

### 5. Construir e iniciar a aplicação

Certifique-se de estar na pasta `pi4-0101-g4-frontend`, onde está localizado o `docker-compose.yml`.

Execute o comando:

```bash
docker compose up --build
```

O Docker irá construir as imagens necessárias e iniciar automaticamente os serviços da aplicação:

- **MySQL:** banco de dados responsável pelo armazenamento das informações.
- **Backend de dados:** responsável pela comunicação com o banco de dados.
- **Backend intermediário:** responsável por receber as requisições HTTP e intermediar a comunicação entre o frontend e o backend de dados.
- **Frontend:** interface web da aplicação, disponibilizada pelo servidor Nginx.

Na primeira execução, o processo pode levar alguns minutos, pois o Docker precisará baixar as imagens e construir os serviços.

### 6. Acessar a aplicação

Após a inicialização dos serviços, abra o navegador e acesse:

**http://localhost:8082**

A aplicação estará disponível para utilização.

## Arquitetura da aplicação

A aplicação é composta por quatro serviços principais, organizados da seguinte maneira:

```text
                 CLIENTE
                    |
                    v
             FRONTEND (React)
                    |
                    v
         BACKEND INTERMEDIÁRIO
             (API HTTP)
                    |
                    v
            BACKEND DE DADOS
                 (TCP)
                    |
                    v
               MYSQL 8.4
```

O frontend realiza as requisições à API HTTP disponibilizada pelo Backend intermediário. Esse serviço processa as solicitações e realiza a comunicação com o Backend de dados, que é responsável pelas operações no banco de dados MySQL.

A comunicação entre os serviços ocorre por meio da rede interna criada pelo Docker Compose.

## Portas utilizadas

| Serviço | Porta interna | Acesso externo |
|---|---:|---|
| Frontend / Nginx | 80 | `localhost:8082` |
| Backend intermediário | 8080 | Não publicada no host |
| Backend de dados | 8081 | Não publicada no host |
| MySQL | 3306 | `127.0.0.1:3307` |

As portas dos backends não são publicadas diretamente no computador. A comunicação entre esses serviços ocorre pela rede interna do Docker.

## Comandos úteis do Docker Compose

Para iniciar os serviços em segundo plano:

```bash
docker compose up -d
```

Para verificar os serviços em execução:

```bash
docker compose ps
```

Para visualizar os logs de todos os serviços:

```bash
docker compose logs -f
```

Para visualizar os logs de um serviço específico:

```bash
docker compose logs -f backend-1
```

```bash
docker compose logs -f backend-2
```

```bash
docker compose logs -f frontend
```

Para parar os serviços:

```bash
docker compose down
```

Para parar os serviços e remover também os dados persistidos do banco de dados:

```bash
docker compose down -v
```

**Atenção:** o último comando remove o volume `dados_mysql`, apagando os dados armazenados no banco de dados.

## Limitações conhecidas

- A implementação de comunicação em tempo real via WebSocket é parcial.
- A atualização automática de informações no frontend ainda possui limitações.
- A busca por localização geográfica utilizando GPS e coordenadas não está completamente implementada.
- Os filtros de pesquisa são executados no frontend.
- A negociação e o pagamento pelos serviços acontecem fora da plataforma.

## Documentação

Para conhecer mais detalhes sobre os requisitos, a arquitetura, o desenvolvimento e as decisões técnicas do sistema, consulte o Documento de Projeto do QuemResolve.

---
- [Documento de projeto](https://github.com/fabriciopucc/pi4-0101-g4-frontend/blob/main/docs/documento-de-projeto.md)
