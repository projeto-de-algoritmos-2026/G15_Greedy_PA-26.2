import { describe, it, expect } from 'vitest'
import { decodificar } from './decodificar.js'
import { construirArvore } from '../tree/index.js'
import { contarFrequencias } from '../frequency/index.js'
import { ArquivoInvalidoError } from '../format/index.js'

describe('decodificar', () => {
  const frequencias = contarFrequencias('Universidade_de_Brasília')
  const { raiz } = construirArvore(frequencias)

  it('lê bits e devolve os símbolos: 11100 11101 = Un', () => {
    const bytes = Uint8Array.from([0b11100111, 0b01000000])
    expect(decodificar(bytes, 0, raiz, 2)).toBe('Un')
  })

  it('ignora o preenchimento no fim', () => {
    const bytes = Uint8Array.from([0b11100111, 0b01111111])
    expect(decodificar(bytes, 0, raiz, 2)).toBe('Un')
  })

  it('respeita o ponto de início', () => {
    const bytes = Uint8Array.from([0xff, 0xff, 0b11100111, 0b01000000])
    expect(decodificar(bytes, 2, raiz, 2)).toBe('Un')
  })

  it('quantidade zero devolve texto vazio', () => {
    expect(decodificar(new Uint8Array(), 0, null, 0)).toBe('')
  })

  it('falha se os dados acabam antes de completar a quantidade', () => {
    const bytes = Uint8Array.from([0b11100111])
    expect(() => decodificar(bytes, 0, raiz, 3)).toThrow(ArquivoInvalidoError)
  })

  it('um símbolo só: repete o símbolo', () => {
    const unico = construirArvore(contarFrequencias('aaaaa')).raiz
    expect(decodificar(Uint8Array.from([0]), 0, unico, 5)).toBe('aaaaa')
  })

  it('um símbolo só: falha se faltam bits', () => {
    const unico = construirArvore(contarFrequencias('aaaaa')).raiz
    expect(() => decodificar(Uint8Array.from([0]), 0, unico, 9)).toThrow(ArquivoInvalidoError)
  })
})
