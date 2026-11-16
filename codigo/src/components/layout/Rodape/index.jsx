import styles from './Rodape.module.css';

import Logo from "@/components/utils/Logo";

export default function Rodape(){

  return(
    <footer className={styles.rodape}>
      <Logo />
      <p>Protótipo visual</p>
      <p>QuemResolve · Projeto Integrador IV · 2026</p>
      <p>Desenvolvido por: Bruno Godoy, Fabrício Ferreira, Leonardo Salles, Matheus Barbosa, Matheus Vinicius e Matheus Pires.</p>
    </footer>
  );
}