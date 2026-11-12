import rotasPrivadas from "@/constants/rotasPrivadas";
import { useSessao } from "@/contexts/SessaoContext";
import { useLocation, useNavigate } from "react-router-dom"

const useRotas = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const {carregando, logado} = useSessao();


  const bloquearRotaPrivada = () => {
    if (!carregando && !logado) {
      navigate("/");
    }
  }

  const verificarSeRotaEPrivada = () => {
    let caminhoSemParametros = "/".concat(location.pathname.split("/")[1]);
    return rotasPrivadas.includes(caminhoSemParametros);
  }

  return {verificarSeRotaEPrivada, bloquearRotaPrivada};
}

export default useRotas;