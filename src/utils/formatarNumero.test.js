import { describe, it, expect } from 'vitest'
import { formatarNumero, formatarPorcentagem, formatarBytesExatos } from './formatarNumero.js'

describe('formatarNumero', () => {
  it.each([
    [0, 0, '0'],
    [24, 0, '24'],
    [1234, 0, '1.234'],
    [3.58333, 2, '3,58'],
    [2, 2, '2,00'],
  ])('%d com %d casas vira "%s"', (valor, casas, esperado) => {
    expect(formatarNumero(valor, casas)).toBe(esperado)
  })
})

describe('formatarPorcentagem', () => {
  it.each([
    [0.56, '56%'],
    [0, '0%'],
    [-0.72, '-72%'],
    [0.123, '12%'],
    [1, '100%'],
  ])('%d vira "%s"', (taxa, esperado) => {
    expect(formatarPorcentagem(taxa)).toBe(esperado)
  })
})

describe('formatarBytesExatos', () => {
  it.each([
    [0, '0 bytes'],
    [1, '1 byte'],
    [43, '43 bytes'],
    [1051, '1.051 bytes'],
    [5242880, '5.242.880 bytes'],
  ])('%d vira "%s"', (bytes, esperado) => {
    expect(formatarBytesExatos(bytes)).toBe(esperado)
  })
})
