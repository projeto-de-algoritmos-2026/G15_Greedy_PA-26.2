import { describe, it, expect } from 'vitest'
import { lerArquivoTexto, decodificarUtf8, ErroDeArquivo } from './lerArquivoTexto.js'
import { TAMANHO_MAXIMO_EM_BYTES } from '../config/limites.js'

const arquivo = (conteudo, nome = 'documento.txt') => new File([conteudo], nome)

describe('lerArquivoTexto', () => {
  it('lê nome, tamanho em bytes e texto', async () => {
    const resultado = await lerArquivoTexto(arquivo('Universidade_de_Brasília'))
    expect(resultado).toEqual({
      nome: 'documento.txt',
      tamanho: 25,
      texto: 'Universidade_de_Brasília',
    })
  })

  it('aceita a extensão em maiúsculas', async () => {
    const resultado = await lerArquivoTexto(arquivo('oi', 'DOC.TXT'))
    expect(resultado.texto).toBe('oi')
  })

  it('mantém o marcador BOM, para a descompactação devolver o arquivo idêntico', async () => {
    const bom = Uint8Array.from([0xef, 0xbb, 0xbf, 0x6f, 0x69])
    const resultado = await lerArquivoTexto(arquivo(bom))
    expect(resultado.texto).toBe('\ufeffoi')
    expect(new TextEncoder().encode(resultado.texto)).toEqual(bom)
  })

  it('recusa arquivo que não termina em .txt', async () => {
    await expect(lerArquivoTexto(arquivo('oi', 'foto.png'))).rejects.toThrow(/\.txt/)
  })

  it('recusa arquivo vazio', async () => {
    await expect(lerArquivoTexto(arquivo(''))).rejects.toThrow(/vazio/)
  })

  it('recusa arquivo acima do limite', async () => {
    const grande = arquivo(new Uint8Array(TAMANHO_MAXIMO_EM_BYTES + 1))
    await expect(lerArquivoTexto(grande)).rejects.toThrow(/limite de 5 MB/)
  })

  it('aceita arquivo exatamente no limite', async () => {
    const limite = arquivo(new Uint8Array(TAMANHO_MAXIMO_EM_BYTES).fill(97))
    const resultado = await lerArquivoTexto(limite)
    expect(resultado.tamanho).toBe(TAMANHO_MAXIMO_EM_BYTES)
  })

  it('recusa texto que não está em UTF-8 (Latin-1)', async () => {
    const latin1 = Uint8Array.from([0x63, 0x61, 0x66, 0xe9])
    await expect(lerArquivoTexto(arquivo(latin1))).rejects.toThrow(/UTF-8/)
  })

  it('os erros são do tipo ErroDeArquivo', async () => {
    await expect(lerArquivoTexto(arquivo(''))).rejects.toBeInstanceOf(ErroDeArquivo)
  })
})

describe('decodificarUtf8', () => {
  it('decodifica acentos e caracteres de vários bytes', () => {
    const bytes = new TextEncoder().encode('ação 𝒳 こんにちは')
    expect(decodificarUtf8(bytes)).toBe('ação 𝒳 こんにちは')
  })

  it('falha com bytes inválidos', () => {
    expect(() => decodificarUtf8(Uint8Array.from([0xff, 0xfe]))).toThrow(ErroDeArquivo)
  })
})
