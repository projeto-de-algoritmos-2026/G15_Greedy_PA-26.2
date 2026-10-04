import { MinHeap } from '../heap/index.js'
import { criarFolhas } from './criarFolhas.js'
import { criarNoInterno } from './no.js'

export function construirArvore(frequencias, { detalhar = false } = {}) {
  const folhas = criarFolhas(frequencias)
  const construcao = detalhar ? { inicial: [...folhas], eventos: [] } : null

  let eventosAtuais = construcao ? construcao.eventos : null
  const observador = detalhar ? (evento) => eventosAtuais.push(evento) : null

  const heap = MinHeap.construir(folhas, undefined, observador)
  const heapInicial = heap.comoArray()
  const passos = []

  let heapAtual = heapInicial

  while (heap.tamanho > 1) {
    const heapAntes = heapAtual
    const eventos = detalhar ? [] : null
    eventosAtuais = eventos

    const primeiro = heap.extrairMenor()
    const heapAposPrimeiro = heap.comoArray()

    const segundo = heap.extrairMenor()
    const heapAposSegundo = heap.comoArray()

    const novo = criarNoInterno(primeiro, segundo)
    if (detalhar) {
      eventos.push({ tipo: 'juntar', primeiro, segundo, novo, heap: heapAposSegundo })
    }
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
      ...(detalhar ? { eventos } : {}),
    })

    heapAtual = heapDepois
  }

  return {
    raiz: heap.espiar() ?? null,
    heapInicial,
    passos,
    ...(construcao ? { construcao } : {}),
  }
}
