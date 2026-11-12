import { useSessao } from "@/contexts/SessaoContext";
import useRotas from "@/hooks/useRotas";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function PrivatePage({children}){

  const {logado, carregando} = useSessao();
  const location = useLocation();
  const {bloquearRotaPrivada} = useRotas();

  useEffect(() => {
    bloquearRotaPrivada();
  }, [location.pathname, logado, carregando]);

  return(
    <>
      {logado && children}
    </>
  );
}