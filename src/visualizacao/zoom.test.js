import { describe, it, expect } from 'vitest'
import {
  limitarEscala,
  aumentarEscala,
  diminuirEscala,
  escalaParaAjustar,
  escalaInicial,
  ESCALA_MINIMA,
  ESCALA_MAXIMA,
} from './zoom.js'

describe('zoom', () => {
  it('limita a escala entre o mínimo e o máximo', () => {
    expect(limitarEscala(0.01)).toBe(ESCALA_MINIMA)
    expect(limitarEscala(10)).toBe(ESCALA_MAXIMA)
    expect(limitarEscala(1)).toBe(1)
  })

  it('aumentar e diminuir são operações inversas dentro dos limites', () => {
    expect(diminuirEscala(aumentarEscala(1))).toBeCloseTo(1)
  })

  it('não passa dos limites ao aumentar e diminuir', () => {
    expect(aumentarEscala(ESCALA_MAXIMA)).toBe(ESCALA_MAXIMA)
    expect(diminuirEscala(ESCALA_MINIMA)).toBe(ESCALA_MINIMA)
  })

  it('ajustar nunca amplia além de 100%', () => {
    expect(escalaParaAjustar(500, 1000)).toBe(1)
  })

  it('ajustar reduz quando a árvore é mais larga que o espaço', () => {
    expect(escalaParaAjustar(2000, 1000)).toBe(0.5)
  })

  it('ajustar respeita o mínimo em árvores enormes', () => {
    expect(escalaParaAjustar(100000, 1000)).toBe(ESCALA_MINIMA)
  })

  it('medidas inválidas devolvem 100%', () => {
    expect(escalaParaAjustar(0, 1000)).toBe(1)
    expect(escalaParaAjustar(1000, 0)).toBe(1)
  })

  it('a escala inicial cabe na tela quando a árvore é pequena', () => {
    expect(escalaInicial(500, 1000)).toBe(1)
    expect(escalaInicial(1250, 1000)).toBe(0.8)
  })

  it('a escala inicial não encolhe abaixo de 60%, para manter a árvore legível', () => {
    expect(escalaInicial(5000, 1000)).toBe(0.6)
  })
})
