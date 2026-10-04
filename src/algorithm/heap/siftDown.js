import { indiceEsquerdo, indiceDireito } from './heapIndex.js'
import { trocar } from './swap.js'

export function descer(heap, inicio, tamanho, comparar, aoTrocar = null) {
  let i = inicio

  while (true) {
    const esquerdo = indiceEsquerdo(i)
    const direito = indiceDireito(i)
    let menor = i

    if (esquerdo < tamanho && comparar(heap[esquerdo], heap[menor]) < 0) {
      menor = esquerdo
    }
    if (direito < tamanho && comparar(heap[direito], heap[menor]) < 0) {
      menor = direito
    }

    if (menor === i) break

    trocar(heap, i, menor)
    if (aoTrocar) aoTrocar(i, menor)
    i = menor
  }
}
