import { ehFolha } from '../tree/index.js'
import { ArquivoInvalidoError } from '../format/index.js'

const MENSAGEM_DADOS_CURTOS = 'Os dados compactados terminam antes do esperado.'

export function decodificar(bytes, inicio, raiz, quantidade) {
  if (quantidade === 0) return ''

  if (ehFolha(raiz)) {
    return decodificarSimboloUnico(bytes, inicio, raiz, quantidade)
  }

  const saida = []
  let no = raiz

  for (let i = inicio; i < bytes.length && saida.length < quantidade; i++) {
    for (let bit = 7; bit >= 0 && saida.length < quantidade; bit--) {
      no = (bytes[i] >> bit) & 1 ? no.direito : no.esquerdo

      if (ehFolha(no)) {
        saida.push(no.simbolo)
        no = raiz
      }
    }
  }

  if (saida.length < quantidade) {
    throw new ArquivoInvalidoError(MENSAGEM_DADOS_CURTOS)
  }

  return saida.join('')
}

function decodificarSimboloUnico(bytes, inicio, raiz, quantidade) {
  const bitsDisponiveis = (bytes.length - inicio) * 8

  if (bitsDisponiveis < quantidade) {
    throw new ArquivoInvalidoError(MENSAGEM_DADOS_CURTOS)
  }

  return raiz.simbolo.repeat(quantidade)
}
