import { useState } from "react";

const useFiltros = () => {

  const [categoria, setCategoria] = useState("Todos");
  const [somenteMelhores, setSomenteMelhores] = useState(false);
  const [ordenacao, setOrdenacao] = useState("avaliacao");
  const [profissionalSelecionado, setProfissionalSelecionado] = useState(null);
  const [exibirProfissional, setExibirProfissional] = useState(false);
  const [busca, setBusca] = useState("");
  const [cidade, setCidade] = useState("Todas");
  const [precoMaximo, setPrecoMaximo] = useState("");
  const [unidade, setUnidade] = useState("Todas");

  const limparFiltros = () => {
    setBusca("");
    setCategoria("Todos");
    setCidade("Todas");
    setPrecoMaximo("");
    setUnidade("Todas");
    setSomenteMelhores(false);
    setOrdenacao("avaliacao");
  };

  return {
    categoria, setCategoria,
    somenteMelhores, setSomenteMelhores,
    ordenacao, setOrdenacao,
    profissionalSelecionado, setProfissionalSelecionado,
    exibirProfissional, setExibirProfissional,
    busca, setBusca,
    cidade, setCidade,
    precoMaximo, setPrecoMaximo,
    unidade, setUnidade,
    limparFiltros
  };
}

export default useFiltros;