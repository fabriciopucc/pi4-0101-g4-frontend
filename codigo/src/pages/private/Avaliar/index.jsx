import CabecalhoVoltar from '@/components/layout/CabecalhoVoltar';
import styles from './Avaliar.module.css';

import Container from "@/components/layout/Container";
import useAvaliacoes from "@/hooks/useAvaliacoes";
import { useParams } from "react-router-dom";

export default function Avaliar(){

  const {avaliacao, preencherAvaliacao, enviarFormularioAvaliar} = useAvaliacoes();
  const {id_prestador} = useParams();

  return(
    <>
      <CabecalhoVoltar
        destino={"/"}
      />

       <Container classeAdicional={"centralizar"}>
        <div className={styles.avaliacao}>
          <span className={styles.subtitulo}>
            Nos conte o que achou do atendimento
          </span>

          <h1 className={styles.titulo}>
            Avaliar
          </h1>

          <form onSubmit={(e) => enviarFormularioAvaliar(e, id_prestador)}>
            <div className={styles.campo}>
              <label>Comentário</label>
              <textarea 
                placeholder="Digite um comentário"
                name={"comentario"}
                onChange={(e) => preencherAvaliacao(e)}
                value={avaliacao.comentario}  
              ></textarea>
            </div>

            <div className={styles.campo}>
              <label>Nota</label>
              <select
                onChange={(e) => preencherAvaliacao(e)}
                name={"nota"}
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
              </select>
            </div>  

            <button
              className={styles.botao}
              disabled={!avaliacao.comentario}
            >
              Avaliar
            </button>
          </form>
        </div>
      </Container>
    </>
  );
}