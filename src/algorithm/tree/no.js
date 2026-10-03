export function criarFolha(simbolo, peso) {
  return { peso, simbolo, esquerdo: null, direito: null }
}

export function criarNoInterno(esquerdo, direito) {
  return {
    peso: esquerdo.peso + direito.peso,
    simbolo: null,
    esquerdo,
    direito,
  }
}

export const ehFolha = (no) => no.esquerdo === null && no.direito === null
