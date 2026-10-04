import { describe, it, expect } from 'vitest'
import { descreverSimbolo, categoriaDoRotulo, formatarPontoDeCodigo } from './rotuloDoSimbolo.js'

describe('descreverSimbolo', () => {
  it.each(['a', 'Z', 'í', 'ç', '_', '-', '0', '𝒳', 'あ'])('mostra "%s" como ele mesmo', (simbolo) => {
    expect(descreverSimbolo(simbolo)).toEqual({ rotulo: simbolo, nome: simbolo, especial: false })
  })

  it('o sublinhado do texto não é confundido com o espaço', () => {
    expect(descreverSimbolo('_').rotulo).toBe('_')
    expect(descreverSimbolo(' ').rotulo).toBe('esp')
  })

  it.each([
    [' ', 'esp', 'espaço'],
    ['\n', '\\n', 'quebra de linha'],
    ['\r', '\\r', 'retorno de carro'],
    ['\t', '\\t', 'tabulação'],
    ['\u00a0', 'nbsp', 'espaço sem quebra'],
    ['\ufeff', 'BOM', 'marcador de ordem de bytes (BOM)'],
  ])('descreve o caractere especial %j', (simbolo, rotulo, nome) => {
    expect(descreverSimbolo(simbolo)).toEqual({ rotulo, nome, especial: true })
  })

  it.each([
    ['\u0007', 'U+0007'],
    ['\u200b', 'U+200B'],
    ['\u2028', 'U+2028'],
    ['\u0301', 'U+0301'],
    ['\u3000', 'U+3000'],
  ])('mostra o ponto de código de %j', (simbolo, rotulo) => {
    const resultado = descreverSimbolo(simbolo)
    expect(resultado.rotulo).toBe(rotulo)
    expect(resultado.nome).toBe(`caractere especial ${rotulo}`)
    expect(resultado.especial).toBe(true)
  })
})

describe('formatarPontoDeCodigo', () => {
  it('usa pelo menos 4 dígitos hexadecimais em maiúsculas', () => {
    expect(formatarPontoDeCodigo('a')).toBe('U+0061')
    expect(formatarPontoDeCodigo('𝒳')).toBe('U+1D4B3')
  })
})

describe('categoriaDoRotulo', () => {
  it.each([
    ['a', 'curto'],
    ['𝒳', 'curto'],
    ['\\n', 'medio'],
    ['esp', 'medio'],
    ['nbsp', 'longo'],
    ['U+200B', 'longo'],
  ])('%s é %s', (rotulo, categoria) => {
    expect(categoriaDoRotulo(rotulo)).toBe(categoria)
  })
})
