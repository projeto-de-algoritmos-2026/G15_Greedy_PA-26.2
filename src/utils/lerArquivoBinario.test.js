import { describe, it, expect } from 'vitest'
import { lerArquivoBinario } from './lerArquivoBinario.js'
import { ErroDeArquivo } from './ErroDeArquivo.js'
import { TAMANHO_MAXIMO_EM_BYTES } from '../config/limites.js'

const arquivo = (conteudo, nome = 'a.huff') => new File([conteudo], nome)

describe('lerArquivoBinario', () => {
  it('lê nome, tamanho e bytes', async () => {
    const resultado = await lerArquivoBinario(arquivo(Uint8Array.from([1, 2, 3])))
    expect(resultado).toEqual({ nome: 'a.huff', tamanho: 3, bytes: Uint8Array.from([1, 2, 3]) })
  })

  it('aceita a extensão em maiúsculas', async () => {
    const resultado = await lerArquivoBinario(arquivo(Uint8Array.from([1]), 'A.HUFF'))
    expect(resultado.tamanho).toBe(1)
  })

  it('recusa extensão diferente de .huff', async () => {
    await expect(lerArquivoBinario(arquivo('oi', 'a.txt'))).rejects.toThrow(/\.huff/)
  })

  it('recusa arquivo vazio e arquivo acima do limite', async () => {
    await expect(lerArquivoBinario(arquivo(''))).rejects.toThrow(/vazio/)
    const grande = arquivo(new Uint8Array(TAMANHO_MAXIMO_EM_BYTES + 1))
    await expect(lerArquivoBinario(grande)).rejects.toBeInstanceOf(ErroDeArquivo)
  })
})
