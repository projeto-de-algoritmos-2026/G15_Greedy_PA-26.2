import { describe, it, expect } from 'vitest'
import { compactar, descompactar } from './index.js'

const idaEVolta = (texto) => descompactar(compactar(texto).bytes)

describe('ida e volta', () => {
  it('devolve exatamente o mesmo texto com acentos, BOM e quebras de linha', () => {
    const texto = '\ufeffUniversidade de Brasília\r\nAção e coração\n\tNão há nada aqui. 😀\n\n'
    expect(idaEVolta(texto)).toBe(texto)
  })

  it('preserva o BOM nos bytes gravados no .txt', () => {
    const texto = '\ufeffoi'
    const bytes = new TextEncoder().encode(idaEVolta(texto))
    expect(Array.from(bytes.slice(0, 3))).toEqual([0xef, 0xbb, 0xbf])
  })
})
