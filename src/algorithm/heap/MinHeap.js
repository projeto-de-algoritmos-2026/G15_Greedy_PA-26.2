import { indicePai } from './heapIndex.js'
import { subir } from './siftUp.js'
import { descer } from './siftDown.js'

const compararPorPeso = (a, b) => a.peso - b.peso

export class MinHeap {
  #itens = []
  #comparar
  #observador

  constructor(comparar = compararPorPeso, observador = null) {
    this.#comparar = comparar
    this.#observador = observador
  }

  static construir(itens, comparar = compararPorPeso, observador = null) {
    const heap = new MinHeap(comparar, observador)
    heap.#itens = [...itens]

    const aoTrocar = heap.#registrarTroca('descer')
    const ultimoComFilho = indicePai(heap.#itens.length - 1)
    for (let i = ultimoComFilho; i >= 0; i--) {
      descer(heap.#itens, i, heap.#itens.length, comparar, aoTrocar)
    }
    return heap
  }

  get tamanho() {
    return this.#itens.length
  }

  get vazia() {
    return this.#itens.length === 0
  }

  espiar() {
    return this.#itens[0]
  }

  inserir(item) {
    this.#itens.push(item)
    const indice = this.#itens.length - 1

    if (this.#observador) {
      this.#observador({ tipo: 'inserir', item, indice, heap: [...this.#itens] })
    }
    subir(this.#itens, indice, this.#comparar, this.#registrarTroca('subir'))
  }

  extrairMenor() {
    if (this.vazia) return undefined

    const menor = this.#itens[0]
    const ultimo = this.#itens.pop()
    const movido = this.#itens.length > 0 ? ultimo : null

    if (movido !== null) {
      this.#itens[0] = ultimo
    }
    if (this.#observador) {
      this.#observador({ tipo: 'extrair', removido: menor, movido, heap: [...this.#itens] })
    }
    if (movido !== null) {
      descer(this.#itens, 0, this.#itens.length, this.#comparar, this.#registrarTroca('descer'))
    }
    return menor
  }

  comoArray() {
    return [...this.#itens]
  }

  #registrarTroca(direcao) {
    if (!this.#observador) return null

    return (de, para) =>
      this.#observador({ tipo: 'trocar', direcao, de, para, heap: [...this.#itens] })
  }
}
