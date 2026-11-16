import styles from './Cabecalho.module.css';
import Logo from "@/components/utils/Logo";
import BotaoLink from '@/components/utils/BotaoLink';
import { Link } from 'react-router-dom';
import { useSessao } from '@/contexts/SessaoContext';
import useUsuario from '@/hooks/useUsuario';

export default function Cabecalho(){

  const {logado} = useSessao();
  const {sair} = useUsuario();

  return(
    <header className={styles.cabecalho}>
      <nav className={styles.navegacao} aria-label="Navegação principal">
        <Logo />

        <div className={styles.linksNavegacao}>
          <a className={styles.linkAtivo} href="#profissionais">
            Encontrar profissionais
          </a>
          
          {
            logado && (
              <Link to={"/perfil"}>
                Meu perfil
              </Link>
            )
          }
        </div>

        <div className={styles.botoes}>
          {
            logado ? (
              <button
                type='button'
                className={styles.botao}
                onClick={sair}
              >
                Sair
              </button>
            ) : (
              <>
                <BotaoLink
                  texto={"Cadastro"}
                  destino={"/cadastro"}
                  classeAdicional={"margemADireita"}
                />

                <BotaoLink
                  texto={"Login"}
                  destino={"/login"}
                />
              </>
            )
          }
        </div>
      </nav>
    </header>
  );
}