import useContato from '@/hooks/useContato';
import styles from './InformacoesPrestador.module.css';

import { moeda } from "@/utils/moeda";

export default function InformacoesPrestador({exibirProfissional, setExibirProfissional, profissionalSelecionado}){

  const {solicitarContato} = useContato();

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

              {profissionalSelecionado && (
                <div className={styles.informacoes}>
                  <span className={styles.sobretitulo}>
                    {profissionalSelecionado.categoria}
                  </span>
                  <h2 id="titulo-modal">
                    {profissionalSelecionado.nome}
                  </h2>
                  <p className={styles.notaModal}>
                    ★{" "}
                    {profissionalSelecionado.nota
                      .toFixed(1)
                      .replace(".", ",")}
                    {" · "}
                    {profissionalSelecionado.avaliacoes} avaliações
                    demonstrativas
                  </p>
                  <p>{profissionalSelecionado.sobre}</p>
                  <div className={styles.informacaoModal}>
                    <strong>Região de atendimento</strong>
                    <p>{profissionalSelecionado.regiao}</p>
                  </div>
                  <div className={styles.informacaoModal}>
                    <strong>Valor de referência</strong>
                    <p>
                      A partir de {moeda(profissionalSelecionado.preco)}
                      {" / "}
                      {profissionalSelecionado.unidade}
                    </p>
                  </div>

                  <button
                    className={styles.botao+" "+styles["botaoPrincipal", "botaoCompleto"]}
                    onClick={() => solicitarContato(profissionalSelecionado.usuario_id)}
                  >
                    Entrar em contato no WhatsApp ↗
                  </button>
                </div>
              )}
            </div>
        )
      }
    </>
  );
}