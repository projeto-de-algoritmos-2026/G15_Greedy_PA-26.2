import Botao from '../ui/Botao.jsx'
import estilos from './CabecalhoDoResultado.module.css'

export default function CabecalhoDoResultado({
  nome,
  origem,
  rotuloDoDownload,
  rotuloDeVoltar,
  aoBaixar,
  aoVoltar,
}) {
  return (
    <div className={estilos.topo}>
      <div className={estilos.titulos}>
        <h1 className={estilos.nome}>{nome}</h1>
        <p className={estilos.origem}>{origem}</p>
      </div>

      <div className={estilos.acoes}>
        <Botao onClick={aoBaixar}>{rotuloDoDownload}</Botao>
        <Botao variante="discreto" onClick={aoVoltar}>
          {rotuloDeVoltar}
        </Botao>
      </div>
    </div>
  )
}
