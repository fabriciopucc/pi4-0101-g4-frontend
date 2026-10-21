# CT13 — Assinar atualizações

## 1. Objetivo

Definir a mensagem WebSocket utilizada pelo frontend para solicitar atualizações de prestadores conforme critérios de pesquisa.

## 2. Responsáveis

- Emissor: Frontend.
- Receptor: Backend.

## 3. Operação

- Tipo: WebSocket.
- Canal: `/ws/prestadores`.
- Tipo de mensagem: `assinarAtualizacoes`.

## 4. Entrada

A mensagem de inscrição deve informar a categoria e pode incluir critérios de localização.

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| categoria | String | Sim | Categoria de serviço desejada |
| cidade | String | Não | Cidade de interesse |
| uf | String | Não | Unidade federativa |
| latitude | Decimal | Não | Latitude de referência |
| longitude | Decimal | Não | Longitude de referência |

## 5. Saída

Após processar a inscrição, o backend retorna os seguintes dados:

| Campo | Tipo | Descrição |
|---|---|---|
| inscricaoId | Identificador | Identificador da inscrição |
| inscrito | Booleano | Indica se a inscrição foi realizada |

## 6. Regras de negócio

- A categoria é obrigatória.
- Os critérios de localização devem seguir os parâmetros previstos na especificação.
- O backend processa a inscrição para permitir o envio de atualizações relevantes ao frontend.
- As mensagens devem ser trocadas pelo canal WebSocket definido neste contrato.

## 7. Erros e exceções

- Categoria ausente.
- Parâmetros inválidos.
- WebSocket indisponível.
- Falha ao processar a inscrição.

## 8. Fluxo relacionado

- E10 — Comunicação em tempo real.
