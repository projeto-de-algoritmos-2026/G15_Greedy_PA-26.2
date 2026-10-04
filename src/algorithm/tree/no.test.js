import { describe, it, expect } from 'vitest'
import { criarFolha, criarNoInterno, ehFolha } from './no.js'
import { criarFolhas } from './criarFolhas.js'

describe('nó da árvore', () => {
  it('folha guarda símbolo e peso e não tem filhos', () => {
    const folha = criarFolha('a', 3)
    expect(folha).toEqual({ peso: 3, simbolo: 'a', esquerdo: null, direito: null })
    expect(ehFolha(folha)).toBe(true)
  })

  it('nó interno soma os pesos e guarda a ordem dos filhos', () => {
    const u = criarFolha('U', 1)
    const n = criarFolha('n', 1)
    const no = criarNoInterno(u, n)

    expect(no.peso).toBe(2)
    expect(no.simbolo).toBeNull()
    expect(no.esquerdo).toBe(u)
    expect(no.direito).toBe(n)
    expect(ehFolha(no)).toBe(false)
  })

  it('criarFolhas mantém a ordem da lista de frequências', () => {
    const folhas = criarFolhas([
      { simbolo: 'b', frequencia: 2 },
      { simbolo: 'a', frequencia: 5 },
    ])
    expect(folhas.map((f) => [f.simbolo, f.peso])).toEqual([['b', 2], ['a', 5]])
  })
})
