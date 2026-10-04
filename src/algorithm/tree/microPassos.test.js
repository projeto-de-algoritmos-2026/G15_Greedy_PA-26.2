import { describe, it, expect } from 'vitest'
import { construirArvore } from './construirArvore.js'
import { contarFrequencias } from '../frequency/index.js'

const frequencias = contarFrequencias('Universidade_de_Brasília')
const { passos, construcao, heapInicial } = construirArvore(frequencias, { detalhar: true })

describe('micro-passos da heap', () => {
  it('sem detalhar, a saída continua igual à de antes', () => {
    const simples = construirArvore(frequencias)
    expect(simples.construcao).toBeUndefined()
    expect(simples.passos[0].eventos).toBeUndefined()
    expect(simples.passos).toHaveLength(passos.length)
  })

  it('o último evento de cada junção deixa a heap como em heapDepois', () => {
    for (const passo of passos) {
      const ultimo = passo.eventos[passo.eventos.length - 1]
      expect(ultimo.heap).toEqual(passo.heapDepois)
    }
  })

  it('cada junção tem duas retiradas, uma junção e uma inserção', () => {
    for (const passo of passos) {
      const tipos = passo.eventos.map((evento) => evento.tipo)
      expect(tipos.filter((tipo) => tipo === 'extrair')).toHaveLength(2)
      expect(tipos.filter((tipo) => tipo === 'juntar')).toHaveLength(1)
      expect(tipos.filter((tipo) => tipo === 'inserir')).toHaveLength(1)
    }
  })

  it('a heap inicial é montada só com trocas e termina em heapInicial', () => {
    expect(construcao.eventos.every((evento) => evento.tipo === 'trocar')).toBe(true)
    const final = construcao.eventos.length > 0 ? construcao.eventos[construcao.eventos.length - 1].heap : construcao.inicial
    expect(final).toEqual(heapInicial)
  })

  it('a primeira retirada leva o último item para a raiz', () => {
    const [primeiro] = passos[0].eventos
    expect(primeiro.tipo).toBe('extrair')
    expect(primeiro.removido).toBe(passos[0].primeiro)
    expect(primeiro.movido).toBe(passos[0].heapAntes[passos[0].heapAntes.length - 1])
    expect(primeiro.heap[0]).toBe(primeiro.movido)
  })
})
