import api from "@/service/api";
import { useState } from "react";
import useMessageBox from "./useMessageBox";
import useLoader from "./useLoader";

const useAvaliacoes = () => {

  const [avaliacoes, setAvaliacoes] = useState([]);
  const [avaliacao, setAvaliacao] = useState({
    nota: 1
  });
  const {exibirMessageBox, tratarErro} = useMessageBox();
  const {exibirCardLoader, esconderCardLoader} = useLoader();

  const preencherAvaliacao = (e) => {
    setAvaliacao(
      {...avaliacao, 
        [e.target.name] : (e.target.name == "nota") ? parseInt(e.target.value) : e.target.value
      }
    );
  }

  const buscarAvaliacoesDeUmPrestador = (id) => {
    api.get("/avaliacoes", {
      params: {
        id: id
      }
    })
    .then((resp) => {
      setAvaliacoes(resp.data.avaliacoes);
    })
    .catch((error) => {
      tratarErro(error);
    })
  }

  const avaliar = (id) => {
    exibirCardLoader();
    api.post("/avaliacao", {
      ...avaliacao,
        id_prestador : id,
        confirmado: true
    })
    .then(() => {
      exibirMessageBox("/", true, "Avaliação salva com sucesso!", "Prosseguir");
    })
    .catch((error) => {
      tratarErro(error);
    })
    .finally(() => {
      esconderCardLoader();
    });
  }

  const enviarFormularioAvaliar = (e, id) => {
    e.preventDefault();
    avaliar(id);
  }

  return{
    avaliacao, preencherAvaliacao,
    enviarFormularioAvaliar,
    avaliacoes, buscarAvaliacoesDeUmPrestador
  };
}

export default useAvaliacoes;