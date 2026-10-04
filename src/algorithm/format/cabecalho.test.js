import { describe, it, expect } from 'vitest'
import { serializarCabecalho, lerCabecalho } from './cabecalho.js'
import { ArquivoInvalidoError } from './erros.js'
import { escreverVarint } from './varint.js'

const FREQUENCIAS = [
  { simbolo: 'a', frequencia: 3 },
  { simbolo: 'b', frequencia: 1 },
]

describe('serializarCabecalho', () => {
  it('escreve assinatura, versão, quantidade e os pares símbolo/frequência', () => {
    expect(Array.from(serializarCabecalho(FREQUENCIAS))).toEqual([
      0x48, 0x55, 0x46, 1,
      2,
      97, 3,
      98, 1,
    ])
  })

  it('lista vazia escreve só a quantidade zero', () => {
    expect(Array.from(serializarCabecalho([]))).toEqual([0x48, 0x55, 0x46, 1, 0])
  })
})

describe('lerCabecalho', () => {
  it('devolve as frequências na mesma ordem e onde os dados começam', () => {
    const bytes = serializarCabecalho(FREQUENCIAS)
    expect(lerCabecalho(bytes)).toEqual({ frequencias: FREQUENCIAS, inicioDosDados: bytes.length })
  })

  it('preserva acentos e caracteres fora do plano básico', () => {
    const frequencias = [
      { simbolo: 'í', frequencia: 2 },
      { simbolo: '𝒳', frequencia: 70000 },
    ]
    const bytes = serializarCabecalho(frequencias)
    expect(lerCabecalho(bytes).frequencias).toEqual(frequencias)
  })

  it('lista vazia', () => {
    const bytes = serializarCabecalho([])
    expect(lerCabecalho(bytes)).toEqual({ frequencias: [], inicioDosDados: 5 })
  })

  it('o início dos dados aponta para depois do cabeçalho, com dados colados', () => {
    const cabecalho = serializarCabecalho(FREQUENCIAS)
    const bytes = Uint8Array.from([...cabecalho, 0xff, 0xee])
    expect(lerCabecalho(bytes).inicioDosDados).toBe(cabecalho.length)
  })
})

describe('lerCabecalho - arquivos inválidos', () => {
  it('arquivo vazio', () => {
    expect(() => lerCabecalho(new Uint8Array())).toThrow(ArquivoInvalidoError)
  })

  it('assinatura errada', () => {
    const bytes = serializarCabecalho(FREQUENCIAS)
    bytes[0] = 0x00
    expect(() => lerCabecalho(bytes)).toThrow(/não foi gerado/)
  })

  it('versão desconhecida', () => {
    const bytes = serializarCabecalho(FREQUENCIAS)
    bytes[3] = 9
    expect(() => lerCabecalho(bytes)).toThrow(/versão/)
  })

  it('cabeçalho cortado no meio', () => {
    const bytes = serializarCabecalho(FREQUENCIAS)
    expect(() => lerCabecalho(bytes.slice(0, bytes.length - 1))).toThrow(ArquivoInvalidoError)
  })

  it('caractere repetido', () => {
    const bytes = serializarCabecalho([
      { simbolo: 'a', frequencia: 1 },
      { simbolo: 'a', frequencia: 2 },
    ])
    expect(() => lerCabecalho(bytes)).toThrow(/repete/)
  })

  it('frequência zero', () => {
    const bytes = serializarCabecalho([{ simbolo: 'a', frequencia: 0 }])
    expect(() => lerCabecalho(bytes)).toThrow(/frequência/)
  })

  it('ponto de código acima do limite do Unicode', () => {
    const saida = [0x48, 0x55, 0x46, 1, 1]
    escreverVarint(0x110000, saida)
    escreverVarint(1, saida)
    expect(() => lerCabecalho(Uint8Array.from(saida))).toThrow(/caractere inválido/)
  })
})
