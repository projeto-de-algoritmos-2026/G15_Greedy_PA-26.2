import { describe, it, expect } from 'vitest'
import { codificar } from './codificar.js'
import { construirArvore } from '../tree/index.js'
import { contarFrequencias } from '../frequency/index.js'
import { gerarCodigos } from '../codes/index.js'

const TEXTO = 'Universidade_de_Brasília'

describe('codificar', () => {
  const codigos = gerarCodigos(construirArvore(contarFrequencias(TEXTO)).raiz)

  it('troca cada símbolo pelo seu código', () => {
    expect(codificar('Un', codigos)).toBe('1110011101')
  })

  it('o texto de exemplo ocupa 86 bits', () => {
    expect(codificar(TEXTO, codigos)).toHaveLength(86)
  })

  it('só produz 0 e 1', () => {
    expect(codificar(TEXTO, codigos)).toMatch(/^[01]+$/)
  })

  it('texto vazio gera cadeia vazia', () => {
    expect(codificar('', new Map())).toBe('')
  })

  it('com um símbolo só, cada ocorrência vira um bit 0', () => {
    const unico = gerarCodigos(construirArvore(contarFrequencias('aaaa')).raiz)
    expect(codificar('aaaa', unico)).toBe('0000')
  })
})
