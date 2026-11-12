
import { useEffect, useState } from "react";
import api from "@/service/api";
import { useLocation } from "react-router-dom";
import useMessageBox from '../hooks/useMessageBox';
import { useSessao } from "@/contexts/SessaoContext";

export default function useUsuario() {
  const [usuario, setUsuario] = useState({
    nome: "",
    email: "",
    senha: "",
    role: "cliente"
  });
  const {exibirMessageBox, tratarErro} = useMessageBox();
  const {encerrarSessao, atualizarSessao} = useSessao();

  function preencherUsuario(event) {
    const { name, value } = event.target;

    setUsuario((atual) => ({
      ...atual,
      [name]: value
    }));
  }

  const fazerCadastro = () => {
    api.post("/cadastro", usuario)
    .then((resp) => {
      atualizarSessao(resp.data);
      exibirMessageBox("/", true, "Cadastrado com sucesso!", "Prosseguir");
    })
    .catch((error) => {
      tratarErro(error);
    });
  }

  const fazerLogin = () => {
    api.post("/entrar", {
      "email": usuario.email.trim(),
      "senha": usuario.senha.trim()
    })
    .then((resp) => {
      atualizarSessao(resp.data);
      exibirMessageBox("/", true, "Logado com sucesso!", "Prosseguir");
    })
    .catch((error) => {
      tratarErro(error);
    });
  }

  const sair = () => {
    api.post("/sair")
    .then(() => {
      encerrarSessao();
      exibirMessageBox("/", true, "Deslogado com sucesso!", "Prosseguir");
    })
    .catch((error) => {
      tratarErro(error);
    });
  }

  const [meusDados, setMeusDados] = useState({});
  const location = useLocation();

  useEffect(() => {
    if(location.pathname == "/perfil"){
      buscarMeusDados();
    }
  }, []);

  const buscarMeusDados = () => {
    api.get("/usuario-atual")
    .then((resp) => {
      setMeusDados(resp.data);
    })
    .catch((error) => {
      tratarErro(error);
    });
  }

  const enviarFormularioCadastro = (e) => {
    e.preventDefault();
    fazerCadastro();
  }
  
  const enviarFormularioLogin = (e) => {
    e.preventDefault();
    fazerLogin();
  }

  return {
    usuario,
    preencherUsuario,
    enviarFormularioLogin, enviarFormularioCadastro,
    sair,
    meusDados
  };
}