import { LADO_INTERNO } from './medidas.js'
import estilos from './NoInterno.module.css'

export default function NoInterno({ no }) {
  const lado = LADO_INTERNO
  const posicao = no.codigo === '' ? 'raiz' : `prefixo ${no.codigo}`

  return (
    <g transform={`translate(${no.x} ${no.y})`}>
      <title>{`Peso ${no.peso}, ${posicao}`}</title>
      <rect x={-lado / 2} y={-lado / 2} width={lado} height={lado} rx="4" className={estilos.quadrado} />
    </g>
  )
}
