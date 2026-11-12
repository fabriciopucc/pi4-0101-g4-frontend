import { useEffect, useState } from "react";
import api from "@/service/api";

const usePrestadores = () => {

  const [prestadores, setPrestadores] = useState([]);

  const listarPrestadores = () => {
    api.get("/prestadores")
    .then((resp) => {
      setPrestadores(resp.data.prestadores);
    })
    .catch((error) => {
      console.log(error);
    })
  }

  useEffect(() => {
    listarPrestadores();
  }, []);

  return{prestadores};
}

export default usePrestadores;