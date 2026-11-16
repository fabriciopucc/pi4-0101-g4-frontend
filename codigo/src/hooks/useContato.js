import api from "@/service/api";
import { useState } from "react";
import useMessageBox from "./useMessageBox";
import useLoader from "./useLoader";

const useContato = () => {

  const [contato, setContato] = useState("");
  const {tratarErro} = useMessageBox();
  const {exibirCardLoader, esconderCardLoader} = useLoader();

  const solicitarContato = (id) => {
    exibirCardLoader();
    api.post("/contato", { id })
    .then((resp) => {
      window.location.href = resp.data.url;
    })
    .catch((error) => {
      tratarErro(error);
    })
    .finally(() => {
      esconderCardLoader();
    });
  };
  
  return{contato, solicitarContato};
}

export default useContato;