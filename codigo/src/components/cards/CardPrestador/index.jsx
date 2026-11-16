
import styles from './CardPrestador.module.css';
import { moeda } from "@/utils/moeda";

export default function CardPrestador({prestador,aoAbrir}) {

  const iniciais = (prestador.nome || "")
    .split(" ")
    .filter(Boolean)
    .map((parte) => parte[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  // Aceita categorias tanto em String quanto em Array
  const categorias = Array.isArray(prestador.categoria)
    ? prestador.categoria
    : (prestador.categoria || "").split(",").map(c => c.trim()).filter(Boolean);

  const nota = Number(prestador.nota) || 0;

  // Sistema de estrelas inteiras
  const estrelas = Math.round(nota);

  return (
    <article className={styles.cardProfissional}>
      <div className={styles.cabecalho}>

        <div className={styles.identificacao}>
          <span
            className={styles.avatar}
            style={{ backgroundColor: prestador.cor || "var(--cor-principal)" }}
          >
            {iniciais}
          </span>

          <div className={styles.informacoesNome}>
            <h3>{prestador.nome}</h3>
          </div>
        </div>
      </div>

      <div className={styles.avaliacao}>
       <div className={styles.estrelas}>
          {Array.from({ length: 5 }, (_, i) => (
            <span key={i} className={i < estrelas ? styles.estrelaAtiva : styles.estrelaInativa}>
              ★
            </span>
          ))}
        </div>

        <span>
          ({prestador.qauntidade_notas || 0} avaliações)
        </span>
      </div>

      <section className={styles.secao}>
        <span className={styles.tituloSecao}>Áreas de atuação</span>

        <div className={styles.categorias}>
          {categorias.map((categoria, i) => (
            <span key={i} className={styles.categoria}>
              {categoria}
            </span>
          ))}
        </div>
      </section>

      <section className={styles.secao}>
        <span className={styles.tituloSecao}>Área de atendimento</span>

        <div className={styles.localizacao}>
          <div>
            <span className={styles.icone}>⌖</span>
            <span>{prestador.cidade}</span>
          </div>

          <div>
            <span className={styles.icone}>◎</span>
            <span>Raio de {prestador.raio} km</span>
          </div>
        </div>
      </section>

      <div className={styles.rodape}>

        <div className={styles.preco}>
          <span>Preço anunciado</span>

          <strong>
            {moeda(prestador.preco)}
          </strong>

          <small>{prestador.unidade}</small>
        </div>

        <button
          type="button"
          className={styles.botaoPerfil}
          onClick={aoAbrir}
        >
          Ver perfil <span>↗</span>
        </button>

      </div>

    </article>
  );
}