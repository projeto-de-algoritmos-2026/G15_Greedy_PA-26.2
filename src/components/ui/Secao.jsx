import { useId } from 'react'
import estilos from './Secao.module.css'

export default function Secao({ titulo, descricao, children }) {
  const id = useId()

  return (
    <section className={estilos.secao} aria-labelledby={id}>
      <header className={estilos.cabecalho}>
        <h2 id={id}>{titulo}</h2>
        {descricao && <p className={estilos.descricao}>{descricao}</p>}
      </header>
      {children}
    </section>
  )
}
