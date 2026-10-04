import { contarFrequencias } from '../frequency/index.js'
import { construirArvore } from '../tree/index.js'
import { gerarCodigos } from '../codes/index.js'
import { codificar, bitsParaBytes } from '../bits/index.js'
import { serializarCabecalho } from '../format/index.js'
import { calcularEstatisticas } from '../stats/index.js'
import { LIMITE_DO_PASSO_A_PASSO } from '../../config/limites.js'

export function compactar(texto) {
  const frequencias = contarFrequencias(texto)
  const detalhar = frequencias.length <= LIMITE_DO_PASSO_A_PASSO
  const { raiz, heapInicial, passos, construcao = null } = construirArvore(frequencias, { detalhar })
  const codigos = gerarCodigos(raiz)
  const bits = codificar(texto, codigos)

  const cabecalho = serializarCabecalho(frequencias)
  const dados = bitsParaBytes(bits)
  const bytes = new Uint8Array(cabecalho.length + dados.length)
  bytes.set(cabecalho, 0)
  bytes.set(dados, cabecalho.length)

  const estatisticas = calcularEstatisticas({
    texto,
    frequencias,
    totalDeBits: bits.length,
    tamanhoDoCabecalho: cabecalho.length,
    tamanhoCompactado: bytes.length,
  })

  return { frequencias, heapInicial, construcao, passos, raiz, codigos, bits, bytes, estatisticas }
}
