import { describe, it, expect } from 'vitest'
import { compactar } from '../pipeline/index.js'

describe('estatísticas - Universidade_de_Brasília', () => {
  const { estatisticas } = compactar('Universidade_de_Brasília')

  it('conta símbolos', () => {
    expect(estatisticas.totalDeSimbolos).toBe(24)
    expect(estatisticas.simbolosDistintos).toBe(13)
  })

  it('o tamanho original é o do arquivo em UTF-8 (o í ocupa 2 bytes)', () => {
    expect(estatisticas.tamanhoOriginal).toBe(25)
    expect(estatisticas.bitsOriginais).toBe(200)
  })

  it('os dados codificados ocupam 86 bits, 11 bytes, com 2 bits de preenchimento', () => {
    expect(estatisticas.totalDeBits).toBe(86)
    expect(estatisticas.tamanhoDosDados).toBe(11)
    expect(estatisticas.bitsDePreenchimento).toBe(2)
  })

  it('cabeçalho e dados somam o tamanho compactado', () => {
    expect(estatisticas.tamanhoDoCabecalho + estatisticas.tamanhoDosDados).toBe(
      estatisticas.tamanhoCompactado,
    )
    expect(estatisticas.tamanhoDoCabecalho).toBe(32)
    expect(estatisticas.tamanhoCompactado).toBe(43)
  })

  it('em um texto tão pequeno, o cabeçalho faz o arquivo crescer', () => {
    expect(estatisticas.economia).toBe(-18)
    expect(estatisticas.taxaDeCompressao).toBeLessThan(0)
  })

  it('sem contar o cabeçalho, os dados compactados são menores que o original', () => {
    expect(estatisticas.taxaSemCabecalho).toBeCloseTo(1 - 11 / 25)
  })

  it('o tamanho médio do código é 86 / 24 bits', () => {
    expect(estatisticas.tamanhoMedioDoCodigo).toBeCloseTo(86 / 24)
  })

  it('o tamanho médio fica entre a entropia e a entropia + 1', () => {
    expect(estatisticas.tamanhoMedioDoCodigo).toBeGreaterThanOrEqual(estatisticas.entropia)
    expect(estatisticas.tamanhoMedioDoCodigo).toBeLessThan(estatisticas.entropia + 1)
  })
})

describe('estatísticas - texto grande e repetitivo', () => {
  it('compacta bem quando o cabeçalho pesa pouco', () => {
    const { estatisticas } = compactar('abracadabra '.repeat(2000))
    expect(estatisticas.taxaDeCompressao).toBeGreaterThan(0.5)
    expect(estatisticas.economia).toBeGreaterThan(0)
  })
})

describe('estatísticas - casos de borda', () => {
  it('texto vazio não gera divisão por zero', () => {
    const { estatisticas } = compactar('')
    expect(estatisticas.tamanhoOriginal).toBe(0)
    expect(estatisticas.taxaDeCompressao).toBe(0)
    expect(estatisticas.tamanhoMedioDoCodigo).toBe(0)
    expect(estatisticas.entropia).toBe(0)
  })

  it('um símbolo só tem entropia zero e código de 1 bit', () => {
    const { estatisticas } = compactar('aaaaaaaa')
    expect(estatisticas.entropia).toBe(0)
    expect(estatisticas.tamanhoMedioDoCodigo).toBe(1)
  })
})
