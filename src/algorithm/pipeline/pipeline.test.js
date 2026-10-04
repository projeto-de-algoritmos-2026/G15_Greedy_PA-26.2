import { describe, it, expect } from 'vitest'
import { compactar, descompactar } from './index.js'
import { ArquivoInvalidoError } from '../format/index.js'

function gerador(semente) {
  let estado = semente
  return () => {
    estado = (estado * 1664525 + 1013904223) % 4294967296
    return estado / 4294967296
  }
}

function textoAleatorio(tamanho, alfabeto, semente) {
  const sorteio = gerador(semente)
  const simbolos = Array.from(alfabeto)
  let texto = ''
  for (let i = 0; i < tamanho; i++) {
    const indice = Math.floor(sorteio() ** 3 * simbolos.length)
    texto += simbolos[indice]
  }
  return texto
}

function textoFibonacci(quantidadeDeSimbolos) {
  let atual = 1
  let anterior = 1
  let texto = ''
  for (let i = 0; i < quantidadeDeSimbolos; i++) {
    texto += String.fromCharCode(97 + i).repeat(atual)
    ;[atual, anterior] = [atual + anterior, atual]
  }
  return texto
}

const idaEVolta = (texto) => descompactar(compactar(texto).bytes)

describe('compactar e descompactar', () => {
  it.each([
    ['exemplo do projeto', 'Universidade_de_Brasília'],
    ['texto vazio', ''],
    ['um caractere', 'a'],
    ['um símbolo repetido', 'aaaaaaaaaaaaaaaaaaaa'],
    ['dois símbolos', 'abababbbb'],
    ['acentos', 'Ação, coração e pão: São Paulo'],
    ['quebras de linha do Windows', 'linha 1\r\nlinha 2\r\n\r\nlinha 4'],
    ['tabulação e espaços', 'a\tb  c   d'],
    ['caracteres fora do plano básico', '𝒳𝒴𝒵 𝒳𝒳'],
    ['japonês', 'こんにちは世界'],
    ['só espaços', '     '],
  ])('devolve o mesmo texto: %s', (_, texto) => {
    expect(idaEVolta(texto)).toBe(texto)
  })

  it('texto aleatório com muitos símbolos', () => {
    const texto = textoAleatorio(20000, 'abcdefghijklmnopqrstuvwxyzáéíóúãõç ABCDEFGH\n.,;', 7)
    expect(idaEVolta(texto)).toBe(texto)
  })

  it('texto com árvore bem desbalanceada (frequências de Fibonacci)', () => {
    const texto = textoFibonacci(20)
    expect(idaEVolta(texto)).toBe(texto)
  })

  it('texto grande', () => {
    const texto = textoAleatorio(300000, 'abcdefghij klmn', 11)
    expect(idaEVolta(texto)).toBe(texto)
  })

  it('compactar duas vezes gera exatamente os mesmos bytes', () => {
    const texto = 'Universidade_de_Brasília'
    expect(compactar(texto).bytes).toEqual(compactar(texto).bytes)
  })

  it('o resultado do exemplo tem 43 bytes e começa pela assinatura', () => {
    const { bytes } = compactar('Universidade_de_Brasília')
    expect(bytes).toHaveLength(43)
    expect(Array.from(bytes.slice(0, 4))).toEqual([0x48, 0x55, 0x46, 1])
  })

  it('compactar devolve tudo o que a tela precisa mostrar', () => {
    const resultado = compactar('Universidade_de_Brasília')
    expect(Object.keys(resultado).sort()).toEqual(
      ['bits', 'bytes', 'codigos', 'estatisticas', 'frequencias', 'heapInicial', 'passos', 'raiz'].sort(),
    )
    expect(resultado.bits).toHaveLength(86)
    expect(resultado.passos).toHaveLength(12)
  })
})

describe('descompactar - arquivos inválidos', () => {
  const valido = compactar('Universidade_de_Brasília').bytes

  it('arquivo de texto comum', () => {
    const bytes = new TextEncoder().encode('isto é só um texto qualquer')
    expect(() => descompactar(bytes)).toThrow(ArquivoInvalidoError)
  })

  it('dados cortados no fim', () => {
    expect(() => descompactar(valido.slice(0, valido.length - 3))).toThrow(ArquivoInvalidoError)
  })

  it('só o cabeçalho, sem dados', () => {
    expect(() => descompactar(valido.slice(0, 32))).toThrow(ArquivoInvalidoError)
  })

  it('arquivo vazio', () => {
    expect(() => descompactar(new Uint8Array())).toThrow(ArquivoInvalidoError)
  })
})
