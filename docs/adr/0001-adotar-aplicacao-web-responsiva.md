# ADR 0001: Adotar aplicação web responsiva

**Status:** aceito

**Contexto:** O QuemResolve permite cadastrar usuários, pesquisar prestadores e consultar perfis e avaliações. O entregável E9 exige uma interface adaptada a computadores e dispositivos móveis. O grupo dispõe de 360 horas-pessoa, e aplicativos móveis nativos estão fora do escopo.

**Decisão:** Desenvolver uma aplicação web responsiva, acessível pelo navegador, para clientes e prestadores. Adaptar as telas a computadores e dispositivos móveis.

**Alternativas consideradas:**
- Aplicativos nativos para Android e iOS: descartados por acrescentar desenvolvimento, testes e manutenção além do escopo e do tempo disponível.
- Site exclusivo para computadores: descartado por não atender ao entregável E9.

**Consequências:**
- Positivas: os mesmos fluxos de cadastro, pesquisa e consulta de perfis poderão ser utilizados em computadores e celulares, sem instalar aplicativos.
- Negativas: será necessário testar diferentes navegadores e tamanhos de tela; o acesso à localização dependerá de permissão, exigindo também a opção de informar a localização manualmente.
