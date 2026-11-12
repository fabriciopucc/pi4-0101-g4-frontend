import api from "@/service/api";
import { useState } from "react";
import useMessageBox from "./useMessageBox";
import { useNavigate } from "react-router-dom";

const useContato = () => {


  const [contato, setContato] = useState("");
  const {tratarErro} = useMessageBox();
  const navigate = useNavigate();

  const solicitarContato = (id) => {
    console.log("ID enviado:", id);

    api.post("/contato", { id })
    .then((resp) => {
      //navigate(resp.data.url)
      window.location.href = resp.data.url;
      //setContato(resp.data.url);
    })
    .catch((error) => {
      tratarErro(error);
    });
  };
  
  return{contato, solicitarContato};
}

export default useContato;