import { describe, it, expect } from 'vitest'
import { bitsParaBytes, calcularPreenchimento } from './bitsParaBytes.js'

describe('bitsParaBytes', () => {
  it('um byte completo', () => {
    expect(Array.from(bitsParaBytes('10101010'))).toEqual([0xaa])
  })

  it('completa o último byte com zeros à direita', () => {
    expect(Array.from(bitsParaBytes('1'))).toEqual([0x80])
    expect(Array.from(bitsParaBytes('101'))).toEqual([0xa0])
  })

  it('nove bits ocupam dois bytes', () => {
    expect(Array.from(bitsParaBytes('111111111'))).toEqual([0xff, 0x80])
  })

  it('cadeia vazia gera zero bytes', () => {
    expect(bitsParaBytes('')).toHaveLength(0)
  })

  it('vários bytes na ordem certa', () => {
    expect(Array.from(bitsParaBytes('0000000111111110'))).toEqual([0x01, 0xfe])
  })
})

describe('calcularPreenchimento', () => {
  it.each([
    [0, 0],
    [1, 7],
    [7, 1],
    [8, 0],
    [86, 2],
    [87, 1],
  ])('%i bits precisam de %i bits de preenchimento', (bits, esperado) => {
    expect(calcularPreenchimento(bits)).toBe(esperado)
  })
})
