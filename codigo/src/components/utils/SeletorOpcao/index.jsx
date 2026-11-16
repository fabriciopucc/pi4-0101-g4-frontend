import { useLocation } from 'react-router-dom';
import styles from './SeletorOpcao.module.css';

export default function SeletorOpcao({exibirConteudo, setExibirConteudo}){

  const location = useLocation();

  return(
    <div className={styles.cabecalho}>
      <span
        onClick={() => setExibirConteudo("dados")}
        className={styles.opcao+" "+styles[(exibirConteudo == "dados") ? "opcaoSelecionada" : ""]}
      >
        {location.pathname == "/perfil" ? "Meus dados" : "Dados"}
      </span>

      <span
        onClick={() => setExibirConteudo("avaliacoes")}
        className={styles.opcao+" "+styles[(exibirConteudo == "avaliacoes") ? "opcaoSelecionada" : ""]}
      >
        {location.pathname == "/perfil" ? "Avaliações recebidas" : "Avaliações"}
      </span>
    </div>
  );
}