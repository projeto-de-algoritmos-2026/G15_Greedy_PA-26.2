import { criarFolha } from './no.js'

export function criarFolhas(frequencias) {
  return frequencias.map(({ simbolo, frequencia }) => criarFolha(simbolo, frequencia))
}
