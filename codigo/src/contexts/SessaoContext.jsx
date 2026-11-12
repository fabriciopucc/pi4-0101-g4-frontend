
import { createContext, useContext, useEffect, useState } from "react";
import api from "@/service/api";

const SessaoContext = createContext(null);

export function SessaoProvider({ children }) {
    const [sessao, setSessao] = useState(null);
    const [carregando, setCarregando] = useState(true);

    async function verificarSessao() {
      try {
        const resposta = await api.get("/usuario-atual");

        setSessao({
          id: resposta.data.usuario.id,
          role: resposta.data.usuario.role
        });

      } catch (erro) {
        setSessao(null);
      } finally {
        setCarregando(false);
      }
    }

    useEffect(() => {
        verificarSessao();
    }, []);

    function atualizarSessao(dados) {
      setSessao({
        id: dados.id,
        role: dados.role
      });
    }

    function encerrarSessao() {
      setSessao(null);
    }

    return (
      <SessaoContext.Provider
        value={{
          sessao,
          logado: !!sessao,
          carregando,
          verificarSessao,
          atualizarSessao,
          encerrarSessao
        }}
      >
        {children}
      </SessaoContext.Provider>
    );
}

export function useSessao() {
  return useContext(SessaoContext);
}