import { indicePai } from './heapIndex.js'
import { trocar } from './swap.js'

export function subir(heap, inicio, comparar, aoTrocar = null) {
  let i = inicio

  while (i > 0) {
    const pai = indicePai(i)
    if (comparar(heap[i], heap[pai]) >= 0) break

    trocar(heap, i, pai)
    if (aoTrocar) aoTrocar(i, pai)
    i = pai
  }
}
