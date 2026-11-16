
import styles from './Filtros.module.css';

export default function Filtros({
  somenteMelhores,setSomenteMelhores,
  ordenacao,setOrdenacao,
  busca,setBusca,
  cidade,setCidade,
  precoMaximo,setPrecoMaximo,
  unidade,setUnidade,
  cidadesDisponiveis,  limparFiltros
}) {

  return (
    <div className={styles.containerFiltros}>

      <input
        type="search"
        className={styles.campoBusca}
        placeholder="Buscar profissional..."
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
      />

      <div className={styles.filtrosSecundarios}>

        <select
          className={styles.filtroSelect}
          value={cidade}
          onChange={(e) => setCidade(e.target.value)}
        >
          <option value="Todas">Todas as cidades</option>

          {cidadesDisponiveis.map((cid) => (
            <option key={cid} value={cid}>{cid}</option>
          ))}
        </select>

        <input
          type="number"
          min="0"
          className={styles.filtroPreco}
          placeholder="Preço máximo (R$)"
          value={precoMaximo}
          onChange={(e) => setPrecoMaximo(e.target.value)}
        />

        <select
          className={styles.filtroSelect}
          value={unidade}
          onChange={(e) => setUnidade(e.target.value)}
        >
          <option value="Todas">Todas as cobranças</option>
          <option value="por serviço">Por serviço</option>
          <option value="por hora">Por hora</option>
          <option value="por diária">Por diária</option>
          <option value="a combinar">A combinar</option>
        </select>

        <select
          className={styles.ordenacao}
          aria-label="Ordenar profissionais"
          value={ordenacao}
          onChange={(e) => setOrdenacao(e.target.value)}
        >
          <option value="avaliacao">Melhor avaliação</option>
          <option value="preco">Menor valor de referência</option>
          <option value="nome">Nome: A–Z</option>
        </select>

        <button
          className={`${styles.filtro} ${
            somenteMelhores ? styles.filtroAtivo : ""
          }`}
          onClick={() => setSomenteMelhores(!somenteMelhores)}
          aria-pressed={somenteMelhores}
        >
          ★ Nota 4,8 ou mais
        </button>

        <button
          className={styles.filtroLimpar}
          onClick={limparFiltros}
        >
          Limpar filtros
        </button>
      </div>
    </div>
  );
}
