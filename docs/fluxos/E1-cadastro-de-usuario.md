# E1 — Cadastro de usuário

## 1. Objetivo

Permitir que uma pessoa crie uma conta no QuemResolve como cliente ou prestador de serviços.

## 2. Atores

- Usuário
- Frontend
- Backend
- Banco de dados PostgreSQL

## 3. Pré-condições

- O usuário acessa a tela de cadastro.
- O e-mail informado ainda não está cadastrado no sistema.
- Os dados necessários para o cadastro estão disponíveis.

## 4. Fluxo principal

1. O usuário informa nome, e-mail, senha e tipo de conta.
2. O frontend envia os dados para o backend por meio do contrato CT1.
3. O backend valida os campos recebidos e verifica se o e-mail já está cadastrado.
4. O backend solicita o armazenamento dos dados do usuário conforme o contrato CT2.
5. O banco de dados registra o usuário, armazenando a senha como hash.
6. O backend retorna o resultado do cadastro.
7. O frontend apresenta a confirmação ao usuário.

## 5. Pós-condições

- O usuário fica registrado no sistema.
- Os dados cadastrados ficam disponíveis para as funcionalidades que dependem da conta.

## 6. Contratos envolvidos

- CT1 — Cadastrar usuário.
- CT2 — Persistência de usuário.

## 7. Fluxos de exceção

- E-mail já cadastrado: o sistema informa que o endereço de e-mail já está em uso.
- Dados inválidos: o sistema informa que os dados precisam ser corrigidos.
- Erro interno: o sistema informa que não foi possível concluir o cadastro.

## 8. Diagrama de sequência

```mermaid
sequenceDiagram
    actor U as Usuário
    participant F as Frontend
    participant B as Backend
    participant DB as PostgreSQL

    U->>F: Preenche os dados do cadastro
    F->>B: CT1 - Cadastrar usuário
    B->>B: Validar dados e verificar e-mail
    B->>DB: CT2 - Persistir usuário
    DB-->>B: Confirmação do registro
    B-->>F: Resultado do cadastro
    F-->>U: Exibe confirmação
