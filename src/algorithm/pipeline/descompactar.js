import { somarFrequencias } from '../frequency/index.js'
import { construirArvore } from '../tree/index.js'
import { lerCabecalho } from '../format/index.js'
import { decodificar } from '../decode/index.js'

export function descompactar(bytes) {
  const { frequencias, inicioDosDados } = lerCabecalho(bytes)
  const { raiz } = construirArvore(frequencias)
  const quantidade = somarFrequencias(frequencias)

  return decodificar(bytes, inicioDosDados, raiz, quantidade)
}
