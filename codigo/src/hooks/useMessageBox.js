
import { useLocation, useNavigate } from "react-router-dom";
import { MessageBoxContext } from "@/contexts/MesageBoxContext";
import { useContext } from "react";


const useMessageBox = () => {

  const {visibilidadeMessageBox, tornarVisivelMessageBox, esconderMessageBox} = useContext(MessageBoxContext);

  const navigate = useNavigate();
  const location = useLocation();

  const exibirMessageBox = (destino, sucesso, msg, txtBotao) => {
    tornarVisivelMessageBox();
    navigate(
      (destino) ? destino : '', {
      state: {
        sucesso: sucesso,
        msg: msg,
        txtBotao: txtBotao
      }
    });
  }

  const state = location.state;

  const dados = (state) && {
    sucesso: state.sucesso,
    msg: state.msg,
    txtBotao: state.txtBotao
  };

  const tratarErro = (error, destino) => {
     exibirMessageBox((destino) ? destino : "", false, error.response.data.error, "Entendido");
  }

  return{visibilidadeMessageBox, exibirMessageBox, dados, esconderMessageBox, tratarErro};
}

export default useMessageBox;