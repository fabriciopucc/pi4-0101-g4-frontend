import useContato from '@/hooks/useContato';
import styles from './InformacoesPrestador.module.css';

import { moeda } from "@/utils/moeda";
import { useEffect, useState } from 'react';
import SeletorOpcao from '@/components/utils/SeletorOpcao';
import CardAvaliacao from '@/components/cards/CardAvaliacao';
import useAvaliacoes from '@/hooks/useAvaliacoes';
import BotaoLink from '@/components/utils/BotaoLink';
import { useSessao } from '@/contexts/SessaoContext';

export default function InformacoesPrestador({exibirProfissional, setExibirProfissional, profissionalSelecionado}){

  const [exibirConteudo, setExibirConteudo] = useState("dados");
  const {solicitarContato} = useContato();
  const {avaliacoes, buscarAvaliacoesDeUmPrestador} = useAvaliacoes();
  const {logado} = useSessao();

  useEffect(() => {
    if(exibirConteudo == "avaliacoes"){
      buscarAvaliacoesDeUmPrestador(profissionalSelecionado.usuario_id);
    }
  }, [exibirConteudo]);

  return(
    <>
      {
        exibirProfissional && (
          <div className={styles.containerInformacoesPrestador}>
            <button
              className={styles.fechar}
              onClick={() => setExibirProfissional(false)}
              aria-label="Fechar janela"
              autoFocus
            >
              ✕
            </button>

            {
              exibirConteudo == "dados" ? (
                <>
                  {profissionalSelecionado && (
                    
                  <div className={styles.informacoes}>
                    <SeletorOpcao
                      exibirConteudo={exibirConteudo}
                      setExibirConteudo={setExibirConteudo}
                    />

                    <div className={styles.cabecalhoModal}>
                      <div className={styles.avatarModal}>
                        {profissionalSelecionado.nome
                          .split(" ")
                          .filter(Boolean)
                          .map(parte => parte[0])
                          .slice(0, 2)
                          .join("")
                          .toUpperCase()}
                      </div>

                      <div className={styles.identificacaoModal}>
                        <h2 id="titulo-modal">
                          {profissionalSelecionado.nome}
                        </h2>

                        <span className={styles.tituloProfissional}>
                          {profissionalSelecionado.titulo}
                        </span>
                      </div>
                    </div>

                    <div className={styles.avaliacaoModal}>
                      <div className={styles.estrelasModal}>
                        {Array.from({ length: 5 }, (_, i) => (
                          <span
                            key={i}
                            className={
                              i < Math.round(Number(profissionalSelecionado.nota))
                                ? styles.estrelaAtiva
                                : styles.estrelaInativa
                            }
                          >
                            ★
                          </span>
                        ))}
                      </div>

                      <strong>
                        {Number(profissionalSelecionado.nota).toFixed(1).replace(".", ",")}
                      </strong>

                      <span>
                        ({profissionalSelecionado.quantidade_notas || 0} avaliações)
                      </span>
                    </div>

                    <section className={styles.secaoModal}>
                      <strong>Sobre o profissional</strong>

                      <p>
                        {profissionalSelecionado.biografia ||
                          "Este profissional ainda não adicionou uma biografia."}
                      </p>
                    </section>

                    <section className={styles.secaoModal}>
                      <strong>Áreas de atuação</strong>

                      <div className={styles.categoriasModal}>
                        {(Array.isArray(profissionalSelecionado.categoria)
                          ? profissionalSelecionado.categoria
                          : (profissionalSelecionado.categoria || "")
                              .split(",")
                              .map(c => c.trim())
                              .filter(Boolean)
                        ).map((categoria, i) => (
                          <span key={i} className={styles.categoriaModal}>
                            {categoria}
                          </span>
                        ))}
                      </div>
                    </section>

                    <section className={styles.secaoModal}>
                      <strong>Área de atendimento</strong>

                      <div className={styles.detalhesModal}>
                        <div>
                          <span>⌖</span>
                          <p>{profissionalSelecionado.cidade} ({profissionalSelecionado.regiao})</p>
                        </div>

                        <div>
                          <span>◎</span>
                          <p>Raio de {profissionalSelecionado.raio} km</p>
                        </div>
                      </div>
                    </section>

                    <section className={styles.precoModal}>
                      <div>
                        <span>Preço anunciado</span>

                        <strong>
                          {moeda(profissionalSelecionado.preco)}
                        </strong>

                        <small>
                          / {profissionalSelecionado.unidade}
                        </small>
                      </div>
                    </section>

                    {/* Ações */}
                    <button
                      className={`${styles.botao} ${styles.botaoPrincipal} ${styles.botaoCompleto}`}
                      onClick={() => solicitarContato(profissionalSelecionado.usuario_id)}
                    >
                      Entrar em contato no WhatsApp ↗
                    </button>

                    {logado && (
                      <BotaoLink
                        texto={"Avaliar"}
                        destino={"/avaliar/".concat(profissionalSelecionado.usuario_id)}
                        classeAdicional={"margemSuperior"}
                      />
                    )}

                  </div>
                  )}
                </>
              ) : (
                <div className={styles.informacoes}>
                  <SeletorOpcao
                    exibirConteudo={exibirConteudo}
                    setExibirConteudo={setExibirConteudo}
                  />
                  
                  {
                    avaliacoes.length > 0 ? (
                      <>
                      {
                        avaliacoes.map((avaliacao) => (
                          <CardAvaliacao
                            avaliacao={avaliacao}
                          />
                        ))
                      }
                      </>
                    ) : (
                      <p className={styles.aviso}>Este prestador ainda não recebeu avaliações</p>
                    )
                  }

                  {
                    logado && (
                      <BotaoLink
                        texto={"Avaliar"}
                        destino={"/avaliar/".concat(profissionalSelecionado.usuario_id)}
                        classeAdicional={"margemSuperior"}
                      />
                    )
                  }
                </div>
              )
            }
            
          </div>
        )
      }
    </>
  );
}