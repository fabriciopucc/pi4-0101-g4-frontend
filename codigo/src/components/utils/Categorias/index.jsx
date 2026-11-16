import styles from './Categorias.module.css';


export default function Categorias({categorias, categoria, setCategoria}){

  return(
    <section className={styles.secaoCategorias}>
      <div className={styles.tituloSecao}>
        <h2>O que precisa resolver?</h2>
        <p>Um profissional para cada necessidade.</p>
      </div>

      <div className={styles.listaCategorias}>
        {categorias.map((item) => (
          <button
            key={item.nome}
            className={styles.categoria+" "+styles[(categoria === item.nome) ? "categoria-ativa" : ""]}
            onClick={() => setCategoria(item.nome)}
            aria-pressed={categoria === item.nome}
          >
            <span className={styles.categoriaIcone} aria-hidden="true">
              {item.icone}
            </span>
            <span>{item.nome}</span>
          </button>
        ))}
      </div>
    </section>
  );
}