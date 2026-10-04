import { MinHeap } from '../heap/index.js'
import { criarFolhas } from './criarFolhas.js'
import { criarNoInterno } from './no.js'

export function construirArvore(frequencias) {
  const heap = MinHeap.construir(criarFolhas(frequencias))
  const heapInicial = heap.comoArray()
  const passos = []

  let heapAtual = heapInicial

  while (heap.tamanho > 1) {
    const heapAntes = heapAtual

    const primeiro = heap.extrairMenor()
    const heapAposPrimeiro = heap.comoArray()

    const segundo = heap.extrairMenor()
    const heapAposSegundo = heap.comoArray()

    const novo = criarNoInterno(primeiro, segundo)
    heap.inserir(novo)
    const heapDepois = heap.comoArray()

    passos.push({
      heapAntes,
      primeiro,
      heapAposPrimeiro,
      segundo,
      heapAposSegundo,
      novo,
      heapDepois,
    })

    heapAtual = heapDepois
  }

  return {
    raiz: heap.espiar() ?? null,
    heapInicial,
    passos,
  }
}
