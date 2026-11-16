
import { Star } from "lucide-react";
import styles from "./CardAvaliacao.module.css";

export default function CardAvaliacao({ avaliacao }) {

  const renderizarEstrelas = (nota) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={styles.estrela}>
        <Star
          className={i < nota ? styles.cheia : styles.vazia}
        />
      </span>
    ));
  };

  const data = new Date(avaliacao.criado).toLocaleDateString("pt-BR");

  return (
    <div 
      className={styles.card}
      key={avaliacao.criado}
    >

      <div className={styles.cabecalho}>
        <strong>{avaliacao.nome}</strong>
        <span>{data}</span>
      </div>

      <div className={styles.nota}>
        <div className={styles.estrelas}>
          {renderizarEstrelas(avaliacao.nota)}
        </div>

        <span>{avaliacao.nota.toFixed(1)}</span>
      </div>

      <p className={styles.comentario}>
        {avaliacao.comentario}
      </p>

    </div>
  );
}
