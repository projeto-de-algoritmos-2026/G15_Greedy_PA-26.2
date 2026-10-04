import { describe, it, expect } from 'vitest'
import { recortarTexto } from './recortarTexto.js'
import { contarCaracteres } from './contarCaracteres.js'

describe('recortarTexto', () => {
  it('não corta texto dentro do limite', () => {
    expect(recortarTexto('abc', 3)).toEqual({ previa: 'abc', cortado: false })
  })

  it('corta no limite e avisa', () => {
    expect(recortarTexto('abcdef', 4)).toEqual({ previa: 'abcd', cortado: true })
  })

  it('conta caracteres de dois códigos UTF-16 como um só', () => {
    expect(recortarTexto('a😀b😀c', 3)).toEqual({ previa: 'a😀b', cortado: true })
  })
})

describe('contarCaracteres', () => {
  it('conta pontos de código, não unidades UTF-16', () => {
    expect(contarCaracteres('')).toBe(0)
    expect(contarCaracteres('ação')).toBe(4)
    expect(contarCaracteres('a😀😀b')).toBe(4)
  })
})
