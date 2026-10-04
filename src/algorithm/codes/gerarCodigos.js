import { ehFolha } from '../tree/index.js'

const CODIGO_SIMBOLO_UNICO = '0'

export function gerarCodigos(raiz) {
  const codigos = new Map()

  if (raiz === null) return codigos

  if (ehFolha(raiz)) {
    codigos.set(raiz.simbolo, CODIGO_SIMBOLO_UNICO)
    return codigos
  }

  percorrer(raiz, '', codigos)
  return codigos
}

function percorrer(no, prefixo, codigos) {
  if (ehFolha(no)) {
    codigos.set(no.simbolo, prefixo)
    return
  }

  percorrer(no.esquerdo, prefixo + '0', codigos)
  percorrer(no.direito, prefixo + '1', codigos)
}
