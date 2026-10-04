import Cabecalho from './Cabecalho.jsx'
import estilos from './Pagina.module.css'

export default function Pagina({ largura = 'estreita', children }) {
  return (
    <>
      <Cabecalho />
      <main className={`${estilos.conteudo} ${estilos[largura]}`}>{children}</main>
    </>
  )
}
