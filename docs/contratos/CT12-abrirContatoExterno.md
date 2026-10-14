# CT12 — Abrir contato externo

## 1. Objetivo

Definir o comportamento do frontend ao abrir o canal externo de contato de um prestador.

## 2. Responsáveis

- Emissor: Frontend.
- Receptor: Navegador ou aplicativo externo de destino.

## 3. Operação

- Tipo: Navegação externa.
- Origem dos dados: resposta do contrato CT9.
- Dado utilizado: `urlDestino`.

## 4. Entrada

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| urlDestino | String | Sim | Endereço do canal externo retornado pelo backend |

## 5. Saída esperada

Não existe uma resposta de API específica para este contrato.

O resultado esperado é a abertura do destino externo pelo navegador ou aplicativo apropriado, conforme o endereço recebido.

## 6. Regras de negócio

- O frontend deve utilizar o destino fornecido pelo contrato CT9.
- O endereço deve ser validado antes de ser aberto.
- O sistema deve respeitar os tipos de contato definidos na especificação.
- O contato ocorre fora do QuemResolve.

## 7. Erros e exceções

- URI inválida.
- Destino não disponível.
- Falha ao abrir o endereço.
- Navegador ou aplicativo incompatível com o destino.

## 8. Fluxo relacionado

- E7 — Contato com prestador.
