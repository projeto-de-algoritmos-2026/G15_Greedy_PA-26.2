import { somarFrequencias } from '../frequency/index.js'
import { calcularPreenchimento } from '../bits/index.js'
import { calcularEntropia } from './entropia.js'

const codificadorUtf8 = new TextEncoder()

export function calcularEstatisticas({
  texto,
  frequencias,
  totalDeBits,
  tamanhoDoCabecalho,
  tamanhoCompactado,
}) {
  const totalDeSimbolos = somarFrequencias(frequencias)
  const tamanhoOriginal = codificadorUtf8.encode(texto).length
  const tamanhoDosDados = tamanhoCompactado - tamanhoDoCabecalho

  return {
    totalDeSimbolos,
    simbolosDistintos: frequencias.length,
    tamanhoOriginal,
    bitsOriginais: tamanhoOriginal * 8,
    tamanhoCompactado,
    tamanhoDoCabecalho,
    tamanhoDosDados,
    totalDeBits,
    bitsDePreenchimento: calcularPreenchimento(totalDeBits),
    economia: tamanhoOriginal - tamanhoCompactado,
    taxaDeCompressao: calcularTaxa(tamanhoOriginal, tamanhoCompactado),
    taxaSemCabecalho: calcularTaxa(tamanhoOriginal, tamanhoDosDados),
    tamanhoMedioDoCodigo: totalDeSimbolos === 0 ? 0 : totalDeBits / totalDeSimbolos,
    entropia: calcularEntropia(frequencias),
  }
}

function calcularTaxa(original, final) {
  return original === 0 ? 0 : 1 - final / original
}
