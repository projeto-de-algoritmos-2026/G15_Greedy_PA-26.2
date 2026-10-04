import { descreverSimbolo, categoriaDoRotulo } from '../../visualizacao/index.js'
import estilos from './SimboloChip.module.css'

export default function SimboloChip({ simbolo }) {
  const { rotulo, nome, especial } = descreverSimbolo(simbolo)
  const classes = `${estilos.chip} ${estilos[categoriaDoRotulo(rotulo)]}`

  if (especial) {
    return (
      <span className={classes} role="img" aria-label={nome} title={nome}>
        {rotulo}
      </span>
    )
  }

  return <span className={classes}>{rotulo}</span>
}
