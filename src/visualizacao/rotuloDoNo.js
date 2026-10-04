import { ehFolha } from '../algorithm/tree/index.js'
import { descreverSimbolo } from './rotuloDoSimbolo.js'

const LIMITE_PADRAO = 3
const RETICENCIAS = '\u2026'

function primeirasFolhas(no, maximo) {
  const simbolos = []
  const pilha = [no]

  while (pilha.length > 0 && simbolos.length < maximo) {
    const atual = pilha.pop()

    if (ehFolha(atual)) {
      simbolos.push(atual.simbolo)
    } else {
      pilha.push(atual.direito, atual.esquerdo)
    }
  }

  return simbolos
}

export function rotuloDoNo(no, limite = LIMITE_PADRAO) {
  const simbolos = primeirasFolhas(no, limite + 1)
  const mostrados = simbolos.slice(0, limite).map((simbolo) => descreverSimbolo(simbolo).rotulo)
  const texto = mostrados.join('')

  return simbolos.length > limite ? texto + RETICENCIAS : texto
}
