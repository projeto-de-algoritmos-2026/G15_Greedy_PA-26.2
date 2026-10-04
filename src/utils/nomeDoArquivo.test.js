import { describe, it, expect } from 'vitest'
import { nomeCompactado, nomeDescompactado } from './nomeDoArquivo.js'

describe('nomeCompactado', () => {
  it.each([
    ['documento.txt', 'documento.huff'],
    ['DOCUMENTO.TXT', 'DOCUMENTO.huff'],
    ['relatorio.final.txt', 'relatorio.final.huff'],
    ['sem-extensao', 'sem-extensao.huff'],
  ])('%s vira %s', (entrada, esperado) => {
    expect(nomeCompactado(entrada)).toBe(esperado)
  })
})

describe('nomeDescompactado', () => {
  it.each([
    ['documento.huff', 'documento.txt'],
    ['DOCUMENTO.HUFF', 'DOCUMENTO.txt'],
    ['relatorio.final.huff', 'relatorio.final.txt'],
    ['sem-extensao', 'sem-extensao.txt'],
  ])('%s vira %s', (entrada, esperado) => {
    expect(nomeDescompactado(entrada)).toBe(esperado)
  })
})
