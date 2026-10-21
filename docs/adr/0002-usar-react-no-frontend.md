# ADR 0002: Usar React no frontend

**Status:** aceito

**Contexto:** O QuemResolve precisa de telas para cadastros, pesquisa de prestadores, perfis e avaliações. Essas telas compartilham formulários, filtros e cartões de prestadores. A interface precisa refletir alterações nos dados durante o uso.

**Decisão:** Utilizar React para desenvolver o frontend. Organizar a interface em componentes reutilizáveis e gerenciar seu estado para apresentar dados e interações.

**Alternativas consideradas:**
- HTML, CSS e JavaScript sem framework: descartados por exigir mais controle manual da atualização da interface e da reutilização de elementos.
- Angular: descartado nesta proposta por introduzir uma estrutura mais extensa e conceitos adicionais para as funcionalidades previstas.
- Vue.js: alternativa viável, não selecionada porque o grupo definiu React como tecnologia do frontend.

**Consequências:**
- Positivas: formulários, filtros e cartões poderão ser reutilizados entre telas; alterações no estado poderão atualizar os resultados apresentados sem recarregar a página inteira.
- Negativas: o grupo precisará compreender componentes, estado e efeitos e manter dependências e ferramentas de build; responsividade, roteamento e integração com WebSocket exigirão implementação ou integração adicional.
