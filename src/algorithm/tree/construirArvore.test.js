import { describe, it, expect } from 'vitest'
import { construirArvore } from './construirArvore.js'
import { contarFrequencias } from '../frequency/index.js'
import { ehFolha } from './no.js'

const TEXTO = 'Universidade_de_Brasília'

function totalDeBits(no, profundidade = 0) {
  if (ehFolha(no)) return no.peso * profundidade
  return totalDeBits(no.esquerdo, profundidade + 1) + totalDeBits(no.direito, profundidade + 1)
}

function folhasEmOrdem(no) {
  if (ehFolha(no)) return [no.simbolo]
  return [...folhasEmOrdem(no.esquerdo), ...folhasEmOrdem(no.direito)]
}

describe('construirArvore - Universidade_de_Brasília', () => {
  const frequencias = contarFrequencias(TEXTO)
  const { raiz, heapInicial, passos } = construirArvore(frequencias)

  it('a raiz pesa 24, o tamanho do texto', () => {
    expect(raiz.peso).toBe(24)
  })

  it('a árvore tem as 13 folhas, cada símbolo uma vez', () => {
    const simbolos = folhasEmOrdem(raiz)
    expect(simbolos).toHaveLength(13)
    expect(new Set(simbolos)).toEqual(new Set(frequencias.map((f) => f.simbolo)))
  })

  it('o texto codificado ocupa 86 bits, o mínimo possível', () => {
    expect(totalDeBits(raiz)).toBe(86)
  })

  it('faz 12 junções (13 folhas - 1)', () => {
    expect(passos).toHaveLength(12)
  })

  it('a heap inicial tem as 13 folhas', () => {
    expect(heapInicial).toHaveLength(13)
  })

  it('cada passo remove 2 nós e insere 1', () => {
    for (const passo of passos) {
      expect(passo.heapAposPrimeiro).toHaveLength(passo.heapAntes.length - 1)
      expect(passo.heapAposSegundo).toHaveLength(passo.heapAntes.length - 2)
      expect(passo.heapDepois).toHaveLength(passo.heapAntes.length - 1)
    }
  })

  it('o nó novo pesa a soma dos dois extraídos e guarda a ordem esquerda/direita', () => {
    for (const passo of passos) {
      expect(passo.novo.peso).toBe(passo.primeiro.peso + passo.segundo.peso)
      expect(passo.novo.esquerdo).toBe(passo.primeiro)
      expect(passo.novo.direito).toBe(passo.segundo)
    }
  })

  it('o primeiro extraído nunca é maior que o segundo', () => {
    for (const passo of passos) {
      expect(passo.primeiro.peso).toBeLessThanOrEqual(passo.segundo.peso)
    }
  })

  it('o primeiro passo junta dois nós de peso 1', () => {
    expect(passos[0].primeiro.peso).toBe(1)
    expect(passos[0].segundo.peso).toBe(1)
  })

  it('o último passo termina com a raiz sozinha na heap', () => {
    const ultimo = passos[passos.length - 1]
    expect(ultimo.heapDepois).toEqual([raiz])
  })

  it('é determinística: duas execuções geram a mesma árvore', () => {
    const outra = construirArvore(frequencias)
    expect(folhasEmOrdem(outra.raiz)).toEqual(folhasEmOrdem(raiz))
  })
})

describe('construirArvore - casos de borda', () => {
  it('sem símbolos devolve raiz nula e nenhum passo', () => {
    const resultado = construirArvore([])
    expect(resultado.raiz).toBeNull()
    expect(resultado.passos).toEqual([])
  })

  it('com um símbolo só, a raiz é a própria folha e não há junções', () => {
    const resultado = construirArvore(contarFrequencias('aaaa'))
    expect(ehFolha(resultado.raiz)).toBe(true)
    expect(resultado.raiz.simbolo).toBe('a')
    expect(resultado.passos).toEqual([])
  })

  it('com dois símbolos, a raiz tem as duas folhas', () => {
    const { raiz, passos } = construirArvore(contarFrequencias('aab'))
    expect(passos).toHaveLength(1)
    expect(raiz.peso).toBe(3)
    expect(folhasEmOrdem(raiz).sort()).toEqual(['a', 'b'])
  })
})

describe('construirArvore - texto maior', () => {
  it('a raiz pesa o mesmo que o tamanho do texto', () => {
    const texto = 'abracadabra alakazam '.repeat(50)
    const { raiz } = construirArvore(contarFrequencias(texto))
    expect(raiz.peso).toBe(texto.length)
  })
})
