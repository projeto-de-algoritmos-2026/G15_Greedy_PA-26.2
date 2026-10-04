import { describe, it, expect } from 'vitest'
import { escreverVarint, lerVarint } from './varint.js'
import { ArquivoInvalidoError } from './erros.js'

const escrever = (valor) => {
  const saida = []
  escreverVarint(valor, saida)
  return saida
}

describe('varint', () => {
  it('valores até 127 ocupam 1 byte', () => {
    expect(escrever(0)).toEqual([0])
    expect(escrever(127)).toEqual([127])
  })

  it('128 ocupa 2 bytes', () => {
    expect(escrever(128)).toEqual([0x80, 0x01])
  })

  it('300 ocupa 2 bytes', () => {
    expect(escrever(300)).toEqual([0xac, 0x02])
  })

  it.each([0, 1, 127, 128, 255, 16383, 16384, 0x10ffff, 2 ** 31, 2 ** 32 - 1])(
    'escrever e ler devolve %i',
    (valor) => {
      const bytes = Uint8Array.from(escrever(valor))
      expect(lerVarint(bytes, 0)).toEqual({ valor, proximaPosicao: bytes.length })
    },
  )

  it('lê a partir de uma posição no meio do array', () => {
    const bytes = Uint8Array.from([9, 9, 0xac, 0x02, 7])
    expect(lerVarint(bytes, 2)).toEqual({ valor: 300, proximaPosicao: 4 })
  })

  it('falha se o número termina antes do fim', () => {
    expect(() => lerVarint(Uint8Array.from([0x80]), 0)).toThrow(ArquivoInvalidoError)
  })

  it('falha se o número tem bytes demais', () => {
    const bytes = Uint8Array.from([0x80, 0x80, 0x80, 0x80, 0x80, 0x01])
    expect(() => lerVarint(bytes, 0)).toThrow(ArquivoInvalidoError)
  })
})
