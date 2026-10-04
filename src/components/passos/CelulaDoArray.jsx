import { rotuloDoNo, categoriaDoRotulo } from '../../visualizacao/index.js'
import { LARGURA_DA_CELULA } from './medidas.js'
import estilos from './CelulaDoArray.module.css'

export default function CelulaDoArray({ item, indice, destacada }) {
  const rotulo = rotuloDoNo(item.no)
  const classes = [estilos.celula, destacada ? estilos.destacada : ''].filter(Boolean).join(' ')

  return (
    <div
      className={classes}
      style={{ transform: `translateX(${indice * LARGURA_DA_CELULA}px)` }}
      title={`${rotulo}, peso ${item.no.peso}, posição ${indice}`}
    >
      <span className={`${estilos.rotulo} ${estilos[categoriaDoRotulo(rotulo)]}`}>{rotulo}</span>
      <span className={estilos.peso}>{item.no.peso}</span>
    </div>
  )
}
