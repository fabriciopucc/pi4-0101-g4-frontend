import styles from "./Home.module.css";

import usePrestadores from "@/hooks/usePrestadores";
import categorias from "@/constants/categorias";
import Cabecalho from "@/components/layout/Cabecalho";
import CardPrestador from "@/components/cards/CardPrestador";
import Rodape from "@/components/layout/Rodape";
import Hero from "@/components/elements/Hero";
import BannerPrestador from "@/components/elements/BannerPrestador";
import InformacoesPrestador from "@/components/utils/InformacoesPrestador";
import Categorias from "@/components/utils/Categorias";
import Filtros from "@/components/utils/Filtros";
import useFiltros from "@/hooks/useFiltros";

function Home() {

  const {prestadores} = usePrestadores();

  const cidadesDisponiveis = [
    ...new Set(
      prestadores
        .map((profissional) => profissional.cidade)
        .filter(Boolean)
    )
  ].sort((a, b) => a.localeCompare(b, "pt-BR"));

  const{
    categoria, setCategoria,
    somenteMelhores, setSomenteMelhores,
    ordenacao, setOrdenacao,
    profissionalSelecionado, setProfissionalSelecionado,
    exibirProfissional, setExibirProfissional,
    busca, setBusca,
    cidade, setCidade,
    precoMaximo, setPrecoMaximo,
    unidade, setUnidade,
    limparFiltros
  } = useFiltros(prestadores);

  const listaFiltrada = prestadores.filter((profissional) => {
    const textoBusca = busca.toLowerCase().trim();

    // Busca por nome, titulo ou biografia
    const correspondeBusca = !textoBusca ||
      profissional.nome?.toLowerCase().includes(textoBusca) ||
      profissional.titulo?.toLowerCase().includes(textoBusca) ||
      profissional.biografia?.toLowerCase().includes(textoBusca);

    // Categorias (aceita múltiplas categorias)
    const categoriasProfissioanl = String(profissional.categoria || "").split(",").map((cat) => cat.trim());
    const correspondeCategoria = categoria === "Todos" || categoriasProfissioanl.includes(categoria);

    // Cidade
    const correspondeCidade = cidade === "Todas" || profissional.cidade?.toLowerCase() === cidade.toLowerCase();

    // Preço máximo
    const correspondePreco = precoMaximo === "" || Number(profissional.preco) <= Number(precoMaximo);

    // Unidade de cobrança
    const correspondeUnidade = unidade === "Todas" ||  profissional.unidade?.toLowerCase() === unidade.toLowerCase();

    // Nota mínima
    const correspondeNota =  !somenteMelhores || profissional.nota >= 4.8;

    return (
      correspondeBusca &&
      correspondeCategoria &&
      correspondeCidade &&
      correspondePreco &&
      correspondeUnidade &&
      correspondeNota
    );

    }).sort((a, b) => {

    if (ordenacao === "preco") {
      return a.preco - b.preco;
    }
    if (ordenacao === "nome") {
      return a.nome.localeCompare(b.nome, "pt-BR");
    }

    return b.nota - a.nota;
  });


  return (
    <>
      <Cabecalho/>

      <main className={styles.conteudoPrincipal}>
        <Hero/>

        <br />

        <Categorias
          categorias={categorias}
          categoria={categoria}
          setCategoria={setCategoria}
        />

        <section id="profissionais" className={styles.secaoProfissionais}>
          <div className={styles.tituloSecao}>
            <div>
              <h2>Encontre seu próximo profissional</h2>
              <p>
                {listaFiltrada.length} profissionais encontrados
                · dados demonstrativos
              </p>
            </div>

            <span className={styles.textoDestaque}>
              Conheça. Compare. Escolha.
            </span>
          </div>
          
          
          <Filtros
            somenteMelhores={somenteMelhores}
            setSomenteMelhores={setSomenteMelhores}
            limparFiltros={limparFiltros}
            ordenacao={ordenacao}
            setOrdenacao={setOrdenacao}
            busca={busca}
            setBusca={setBusca}
            cidade={cidade}
            setCidade={setCidade}
            precoMaximo={precoMaximo}
            setPrecoMaximo={setPrecoMaximo}
            unidade={unidade}
            setUnidade={setUnidade}
            cidadesDisponiveis={cidadesDisponiveis}
          />


          <div className={styles.gradeProfissionais}>
            {listaFiltrada.map((prestador) => (
              <CardPrestador
                key={prestador.usuario_id}
                prestador={prestador}
                aoAbrir={() => {
                  setExibirProfissional(true);
                  setProfissionalSelecionado(prestador);
                }}
              />
            ))}
            
            {listaFiltrada.length === 0 && (
              <div className={styles.estadoVazio}>
                <span>⌕</span>
                <h3>Nenhum profissional encontrado</h3>
                <p>
                  Tente outra categoria ou região. Há exemplos em
                  Paulínia e Campinas.
                </p>

                <button
                  className={styles.botao+" "+styles["botaoPrincipal"]}
                  onClick={limparFiltros}
                >
                  Limpar filtros
                </button>
              </div>
            )}
          </div>

          <p className={styles.avisoPrecos}>
            Valores de referência: o preço final deve ser combinado
            diretamente com o prestador. Serviços com unidades
            diferentes não são diretamente comparáveis.
          </p>
        </section>

        <BannerPrestador/>
      </main>

      <Rodape/>

      <InformacoesPrestador
        profissionalSelecionado={profissionalSelecionado}
        exibirProfissional={exibirProfissional}
        setExibirProfissional={setExibirProfissional}
      />
    </>
  );
}
export default Home;