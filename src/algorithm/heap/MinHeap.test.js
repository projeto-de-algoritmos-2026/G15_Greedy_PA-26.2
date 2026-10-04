import { describe, it, expect } from 'vitest'
import { MinHeap } from './MinHeap.js'

const no = (peso, simbolo) => ({ peso, simbolo })
const texto = (heap) => heap.comoArray().map((n) => `${n.peso}${n.simbolo}`).join(' ')

const desenhoInicial = () => [
  no(1, 'U'), no(1, 'n'), no(1, 'í'),
  no(1, 'v'), no(1, 'B'), no(1, 'l'), no(2, 's'),
  no(3, 'd'), no(3, 'a'), no(3, 'e'), no(2, '_'), no(3, 'i'), no(2, 'r'),
]

describe('MinHeap - desenho do projeto', () => {
  it('a heap do desenho já é válida e o construir não muda nada', () => {
    const heap = MinHeap.construir(desenhoInicial())
    expect(texto(heap)).toBe('1U 1n 1í 1v 1B 1l 2s 3d 3a 3e 2_ 3i 2r')
  })

  it('1ª extração: sai o U e o r (último) desce desempatando para a esquerda', () => {
    const heap = MinHeap.construir(desenhoInicial())

    expect(heap.extrairMenor()).toEqual(no(1, 'U'))
    expect(texto(heap)).toBe('1n 1v 1í 2r 1B 1l 2s 3d 3a 3e 2_ 3i')
  })

  it('2ª extração: sai o n e o i (último) desce até a folha', () => {
    const heap = MinHeap.construir(desenhoInicial())
    heap.extrairMenor()

    expect(heap.extrairMenor()).toEqual(no(1, 'n'))
    expect(texto(heap)).toBe('1v 1B 1í 2r 2_ 1l 2s 3d 3a 3e 3i')
  })

  it('inserir o nó (2, Un) entra no fim e não sobe, pois o pai (1, l) é menor', () => {
    const heap = MinHeap.construir(desenhoInicial())
    heap.extrairMenor()
    heap.extrairMenor()

    heap.inserir(no(2, 'Un'))
    expect(texto(heap)).toBe('1v 1B 1í 2r 2_ 1l 2s 3d 3a 3e 3i 2Un')
  })
})

describe('MinHeap - comportamento geral', () => {
  it('heap vazia', () => {
    const heap = new MinHeap()
    expect(heap.vazia).toBe(true)
    expect(heap.tamanho).toBe(0)
    expect(heap.espiar()).toBeUndefined()
    expect(heap.extrairMenor()).toBeUndefined()
  })

  it('construir com lista vazia não quebra', () => {
    expect(MinHeap.construir([]).tamanho).toBe(0)
  })

  it('heap com um único elemento', () => {
    const heap = new MinHeap()
    heap.inserir(no(5, 'x'))
    expect(heap.extrairMenor()).toEqual(no(5, 'x'))
    expect(heap.vazia).toBe(true)
  })

  it('extrai sempre em ordem crescente de peso (inserindo um a um)', () => {
    const pesos = [9, 4, 7, 1, 8, 3, 3, 10, 2, 6, 5, 1]
    const heap = new MinHeap()
    pesos.forEach((p) => heap.inserir(no(p, 'x')))

    const saida = []
    while (!heap.vazia) saida.push(heap.extrairMenor().peso)

    expect(saida).toEqual([...pesos].sort((a, b) => a - b))
  })

  it('extrai em ordem crescente também usando construir', () => {
    const pesos = Array.from({ length: 200 }, (_, i) => (i * 37) % 53)
    const heap = MinHeap.construir(pesos.map((p) => no(p, 'x')))

    const saida = []
    while (!heap.vazia) saida.push(heap.extrairMenor().peso)

    expect(saida).toEqual([...pesos].sort((a, b) => a - b))
  })

  it('é determinística: mesma entrada gera sempre a mesma ordem de saída', () => {
    const entrada = [no(2, 'a'), no(2, 'b'), no(2, 'c'), no(1, 'd'), no(2, 'e')]
    const executar = () => {
      const heap = MinHeap.construir(entrada)
      const saida = []
      while (!heap.vazia) saida.push(heap.extrairMenor().simbolo)
      return saida.join('')
    }
    expect(executar()).toBe(executar())
  })

  it('aceita comparador personalizado', () => {
    const heap = new MinHeap((a, b) => b - a)
    ;[3, 9, 1].forEach((n) => heap.inserir(n))
    expect(heap.extrairMenor()).toBe(9)
  })

  it('comoArray devolve uma cópia (mexer nela não afeta a heap)', () => {
    const heap = new MinHeap()
    heap.inserir(no(1, 'a'))
    heap.comoArray().pop()
    expect(heap.tamanho).toBe(1)
  })
})
