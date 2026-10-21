# E2 — Cadastro de prestador

## 1. Objetivo

Permitir que um usuário do tipo prestador cadastre seu perfil profissional no QuemResolve, informando serviços, categorias, região de atendimento, preço de referência e contato.

## 2. Atores

- Prestador
- Frontend
- Backend
- Banco de dados PostgreSQL

## 3. Pré-condições

- O usuário possui uma conta cadastrada.
- O usuário está autenticado.
- A conta pertence ao tipo prestador.

## 4. Fluxo principal

1. O prestador realiza a autenticação conforme o contrato CT14.
2. O backend identifica o usuário e verifica seus dados conforme o contrato CT2.
3. O prestador acessa a área de cadastro do perfil profissional.
4. O prestador informa nome profissional, descrição, categorias, serviços, região de atendimento, valor de referência e dados de contato.
5. O frontend envia os dados para o backend por meio do contrato CT3.
6. O backend valida os dados recebidos e verifica se o usuário pode cadastrar um perfil.
7. O backend solicita o armazenamento do perfil conforme o contrato CT4.
8. O backend retorna o resultado do cadastro.
9. O frontend apresenta a confirmação ao prestador.

## 5. Pós-condições

- O perfil profissional fica cadastrado no sistema.
- As informações do prestador podem ser utilizadas nas pesquisas e consultas de perfil.

## 6. Contratos envolvidos

- CT14 — Autenticar usuário.
- CT2 — Persistência de usuário.
- CT3 — Cadastrar perfil de prestador.
- CT4 — Persistência de perfil de prestador.

## 7. Fluxos de exceção

- Usuário não autenticado: o sistema solicita autenticação.
- Tipo de usuário inválido: o sistema impede o cadastro do perfil profissional.
- Perfil já existente: o sistema informa que o perfil já está cadastrado.
- Dados inválidos: o sistema informa os problemas encontrados.
- Erro de persistência: o sistema informa que não foi possível concluir o cadastro.

## 8. Diagrama de sequência

```mermaid
sequenceDiagram
    actor P as Prestador
    participant F as Frontend
    participant B as Backend
    participant DB as PostgreSQL

    P->>F: Informa credenciais
    F->>B: CT14 - Autenticar usuário
    B->>DB: CT2 - Consultar usuário
    DB-->>B: Dados do usuário
    B-->>F: Resultado da autenticação
    P->>F: Preenche perfil profissional
    F->>B: CT3 - Cadastrar perfil
    B->>B: Validar dados e permissões
    B->>DB: CT4 - Persistir perfil
    DB-->>B: Confirmação do registro
    B-->>F: Resultado do cadastro
    F-->>P: Exibe confirmação
    B->>B: Validar dados e permissões
    B->>DB: CT4 - Persistir perfil
    DB-->>B: Confirmação do registro
    B-->>F: Resultado do cadastro
    F-->>P: Exibe confirmação
