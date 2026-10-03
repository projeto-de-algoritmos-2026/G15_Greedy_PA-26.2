import { describe, it, expect } from 'vitest'
import { contarFrequencias } from './contarFrequencias.js'

describe('contarFrequencias', () => {
  it('conta o exemplo do projeto: Universidade_de_Brasília', () => {
    const resultado = contarFrequencias('Universidade_de_Brasília')

    expect(resultado).toEqual([
      { simbolo: 'U', frequencia: 1 },
      { simbolo: 'n', frequencia: 1 },
      { simbolo: 'i', frequencia: 3 },
      { simbolo: 'v', frequencia: 1 },
      { simbolo: 'e', frequencia: 3 },
      { simbolo: 'r', frequencia: 2 },
      { simbolo: 's', frequencia: 2 },
      { simbolo: 'd', frequencia: 3 },
      { simbolo: 'a', frequencia: 3 },
      { simbolo: '_', frequencia: 2 },
      { simbolo: 'B', frequencia: 1 },
      { simbolo: 'í', frequencia: 1 },
      { simbolo: 'l', frequencia: 1 },
    ])
  })

  it('a soma das frequências é o tamanho do texto (24 caracteres)', () => {
    const total = contarFrequencias('Universidade_de_Brasília')
      .reduce((soma, item) => soma + item.frequencia, 0)
    expect(total).toBe(24)
  })

  it('texto vazio gera lista vazia', () => {
    expect(contarFrequencias('')).toEqual([])
  })

  it('texto de um símbolo só', () => {
    expect(contarFrequencias('aaaa')).toEqual([{ simbolo: 'a', frequencia: 4 }])
  })

  it('espaço, tab e quebra de linha são símbolos como os outros', () => {
    const resultado = contarFrequencias('a b\n\t')
    expect(resultado.map((r) => r.simbolo)).toEqual(['a', ' ', 'b', '\n', '\t'])
  })

  it('não altera o texto: maiúscula e minúscula são símbolos diferentes', () => {
    const resultado = contarFrequencias('aA')
    expect(resultado).toHaveLength(2)
  })

  it('emoji conta como um símbolo só, não dois', () => {
    expect(contarFrequencias('😀😀')).toEqual([{ simbolo: '😀', frequencia: 2 }])
  })
})
