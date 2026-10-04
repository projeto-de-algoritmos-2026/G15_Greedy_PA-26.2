import { indicePai } from './heapIndex.js'
import { subir } from './siftUp.js'
import { descer } from './siftDown.js'

const compararPorPeso = (a, b) => a.peso - b.peso

export class MinHeap {
  #itens = []
  #comparar

  constructor(comparar = compararPorPeso) {
    this.#comparar = comparar
  }

  static construir(itens, comparar = compararPorPeso) {
    const heap = new MinHeap(comparar)
    heap.#itens = [...itens]

    const ultimoComFilho = indicePai(heap.#itens.length - 1)
    for (let i = ultimoComFilho; i >= 0; i--) {
      descer(heap.#itens, i, heap.#itens.length, comparar)
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
    subir(this.#itens, this.#itens.length - 1, this.#comparar)
  }

  extrairMenor() {
    if (this.vazia) return undefined

    const menor = this.#itens[0]
    const ultimo = this.#itens.pop()

    if (this.#itens.length > 0) {
      this.#itens[0] = ultimo
      descer(this.#itens, 0, this.#itens.length, this.#comparar)
    }
    return menor
  }

  comoArray() {
    return [...this.#itens]
  }
}
