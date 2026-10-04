import { descreverSimbolo, categoriaDoRotulo } from '../../visualizacao/index.js'
import { RAIO_FOLHA, DISTANCIA_DA_FREQUENCIA } from './medidas.js'
import estilos from './NoFolha.module.css'

export default function NoFolha({ no }) {
  const { rotulo, nome } = descreverSimbolo(no.simbolo)
  const ocorrencias = no.peso === 1 ? 'ocorrência' : 'ocorrências'

  return (
    <g transform={`translate(${no.x} ${no.y})`}>
      <title>{`${nome}: código ${no.codigo}, ${no.peso} ${ocorrencias}`}</title>
      <circle r={RAIO_FOLHA} className={estilos.circulo} />
      <text
        dy="0.35em"
        textAnchor="middle"
        className={`${estilos.simbolo} ${estilos[categoriaDoRotulo(rotulo)]}`}
      >
        {rotulo}
      </text>
      <text y={DISTANCIA_DA_FREQUENCIA} textAnchor="middle" className={estilos.frequencia}>
        {no.peso}
      </text>
    </g>
  )
}
