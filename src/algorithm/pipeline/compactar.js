import { contarFrequencias } from '../frequency/index.js'
import { construirArvore } from '../tree/index.js'
import { gerarCodigos } from '../codes/index.js'
import { codificar, bitsParaBytes } from '../bits/index.js'
import { serializarCabecalho } from '../format/index.js'
import { calcularEstatisticas } from '../stats/index.js'

export function compactar(texto) {
  const frequencias = contarFrequencias(texto)
  const { raiz, heapInicial, passos } = construirArvore(frequencias)
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

  return { frequencias, heapInicial, passos, raiz, codigos, bits, bytes, estatisticas }
}
