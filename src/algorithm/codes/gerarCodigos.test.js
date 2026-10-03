import { describe, it, expect } from 'vitest'
import { gerarCodigos } from './gerarCodigos.js'
import { construirArvore } from '../tree/index.js'
import { contarFrequencias } from '../frequency/index.js'

const codigosDe = (texto) => {
  const frequencias = contarFrequencias(texto)
  const { raiz } = construirArvore(frequencias)
  return { frequencias, codigos: gerarCodigos(raiz) }
}

describe('gerarCodigos - Universidade_de_Brasília', () => {
  const { frequencias, codigos } = codigosDe('Universidade_de_Brasília')

  it('gera os códigos esperados, da folha mais à esquerda para a mais à direita', () => {
    expect(Array.from(codigos)).toEqual([
      ['_', '000'],
      ['í', '0010'],
      ['l', '0011'],
      ['a', '010'],
      ['e', '011'],
      ['i', '100'],
      ['d', '101'],
      ['v', '11000'],
      ['B', '11001'],
      ['s', '1101'],
      ['U', '11100'],
      ['n', '11101'],
      ['r', '1111'],
    ])
  })

  it('cada símbolo tem um código só, e todos são diferentes', () => {
    expect(codigos.size).toBe(13)
    expect(new Set(codigos.values()).size).toBe(13)
  })

  it('nenhum código é prefixo de outro', () => {
    const lista = Array.from(codigos.values())
    for (const a of lista) {
      for (const b of lista) {
        if (a !== b) expect(b.startsWith(a)).toBe(false)
      }
    }
  })

  it('o texto codificado ocupa 86 bits', () => {
    const total = frequencias.reduce(
      (soma, { simbolo, frequencia }) => soma + frequencia * codigos.get(simbolo).length,
      0,
    )
    expect(total).toBe(86)
  })

  it('símbolo mais frequente nunca tem código mais longo que um menos frequente', () => {
    for (const a of frequencias) {
      for (const b of frequencias) {
        if (a.frequencia > b.frequencia) {
          expect(codigos.get(a.simbolo).length).toBeLessThanOrEqual(codigos.get(b.simbolo).length)
        }
      }
    }
  })

  it('só usa os caracteres 0 e 1', () => {
    for (const codigo of codigos.values()) {
      expect(codigo).toMatch(/^[01]+$/)
    }
  })
})

describe('gerarCodigos - casos de borda', () => {
  it('sem raiz devolve tabela vazia', () => {
    expect(gerarCodigos(null).size).toBe(0)
  })

  it('com um símbolo só, o código é 0', () => {
    const { codigos } = codigosDe('aaaa')
    expect(Array.from(codigos)).toEqual([['a', '0']])
  })

  it('com dois símbolos, cada um recebe 1 bit', () => {
    const { codigos } = codigosDe('aab')
    expect(codigos.get('a').length).toBe(1)
    expect(codigos.get('b').length).toBe(1)
    expect(new Set(codigos.values())).toEqual(new Set(['0', '1']))
  })

  it('é determinística: duas execuções geram os mesmos códigos', () => {
    const texto = 'abracadabra alakazam'
    expect(Array.from(codigosDe(texto).codigos)).toEqual(Array.from(codigosDe(texto).codigos))
  })
})
