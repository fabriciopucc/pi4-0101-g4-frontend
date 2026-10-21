# Visão Geral dos Fluxos — QuemResolve

## 1. Objetivo

Este documento reúne os fluxos de negócio do sistema QuemResolve e descreve a interação entre usuários, frontend, backends e banco de dados.

## 2. Módulos do sistema

- **Frontend:** interface web desenvolvida em React.
- **Backend:** serviços desenvolvidos em Java.
- **Banco de dados:** PostgreSQL.
- **Canal de contato externo:** permite que o cliente entre em contato com o prestador por meio da opção cadastrada em seu perfil.

## 3. Fluxos documentados

| Código | Fluxo |
|---|---|
| E1 | Cadastro de usuário |
| E2 | Cadastro de prestador |
| E3 | Pesquisa de prestadores |
| E4 | Exibição da lista de prestadores |
| E5 | Consulta ao perfil do prestador |
| E6 | Avaliação de prestador |
| E7 | Contato com prestador |
| E8 | Atualização do perfil do prestador |
| E9 | Interface web responsiva |
| E10 | Comunicação em tempo real |

## 4. Contratos técnicos

Os contratos técnicos utilizados nos fluxos estão documentados nos arquivos CT1 a CT14, na pasta `docs/contratos/`.

## 5. Padrões de nomenclatura

- Mensagens e propriedades de comunicação: camelCase.
- Colunas do banco de dados: snake_case.
- Operações: verbo + objeto em camelCase.
- Eventos: objeto + ocorrido.
- Datas: ISO 8601.
- Valores monetários: valores decimais em reais.

## 6. Observações

Os fluxos descrevem o comportamento esperado do sistema. Os contratos técnicos detalham as entradas, saídas, regras e erros esperados nas interações entre os módulos.
