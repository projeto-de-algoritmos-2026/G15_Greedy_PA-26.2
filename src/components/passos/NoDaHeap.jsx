import { ehFolha } from '../../algorithm/tree/index.js'
import { rotuloDoNo, categoriaDoRotulo } from '../../visualizacao/index.js'
import { RAIO_DO_NO } from './medidas.js'
import estilos from './NoDaHeap.module.css'

export default function NoDaHeap({ item, posicao, destacado }) {
  const { no } = item
  const folha = ehFolha(no)
  const rotulo = rotuloDoNo(no)
  const classes = [estilos.no, destacado ? estilos.destacado : ''].filter(Boolean).join(' ')

  return (
    <g className={classes} style={{ transform: `translate(${posicao.x}px, ${posicao.y}px)` }}>
      <title>{`${folha ? 'Folha' : 'Nó'} ${rotulo}, peso ${no.peso}`}</title>
      {folha ? (
        <circle r={RAIO_DO_NO} className={estilos.folha} />
      ) : (
        <rect
          x={-RAIO_DO_NO}
          y={-RAIO_DO_NO}
          width={RAIO_DO_NO * 2}
          height={RAIO_DO_NO * 2}
          rx="5"
          className={estilos.interno}
        />
      )}
      <text
        dy="0.35em"
        textAnchor="middle"
        className={`${estilos.rotulo} ${estilos[categoriaDoRotulo(rotulo)]}`}
      >
        {rotulo}
      </text>
      <text y={RAIO_DO_NO + 15} textAnchor="middle" className={estilos.peso}>
        {no.peso}
      </text>
    </g>
  )
}
