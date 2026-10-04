import { describe, it, expect } from 'vitest'
import { calcularLayoutDaArvore, MEDIDAS_PADRAO } from './layoutDaArvore.js'
import { construirArvore } from '../algorithm/tree/index.js'
import { contarFrequencias } from '../algorithm/frequency/index.js'
import { gerarCodigos } from '../algorithm/codes/index.js'

const arvoreDe = (texto) => construirArvore(contarFrequencias(texto)).raiz
const { espacoHorizontal, espacoVertical, margem, margemInferior } = MEDIDAS_PADRAO

describe('calcularLayoutDaArvore - Universidade_de_Brasília', () => {
  const raiz = arvoreDe('Universidade_de_Brasília')
  const layout = calcularLayoutDaArvore(raiz)
  const folhas = layout.nos.filter((no) => no.folha)
  const internos = layout.nos.filter((no) => !no.folha)

  it('tem 13 folhas, 12 nós internos e 24 arestas', () => {
    expect(folhas).toHaveLength(13)
    expect(internos).toHaveLength(12)
    expect(layout.arestas).toHaveLength(24)
  })

  it('as folhas ficam da esquerda para a direita, igualmente espaçadas', () => {
    folhas.forEach((folha, i) => {
      expect(folha.x).toBe(margem + i * espacoHorizontal)
    })
  })

  it('a ordem das folhas é a mesma da tabela de códigos', () => {
    const codigos = gerarCodigos(raiz)
    expect(folhas.map((f) => [f.simbolo, f.codigo])).toEqual(Array.from(codigos))
  })

  it('cada nó interno fica no meio dos dois filhos', () => {
    for (const aresta of layout.arestas.filter((a) => a.bit === '0')) {
      const irmaDireita = layout.arestas.find((a) => a.bit === '1' && a.x1 === aresta.x1 && a.y1 === aresta.y1)
      expect(aresta.x1).toBe((aresta.x2 + irmaDireita.x2) / 2)
    }
  })

  it('a altura de cada nó depende só da profundidade', () => {
    for (const no of layout.nos) {
      expect(no.y).toBe(margem + no.profundidade * espacoVertical)
      if (no.folha) expect(no.profundidade).toBe(no.codigo.length)
    }
  })

  it('o tamanho total acompanha as folhas e a profundidade (5 níveis)', () => {
    expect(layout.largura).toBe(2 * margem + 12 * espacoHorizontal)
    expect(layout.altura).toBe(margem + 5 * espacoVertical + margemInferior)
  })

  it('a raiz pesa 24 e tem código vazio', () => {
    expect(layout.nos[0]).toMatchObject({ peso: 24, codigo: '', profundidade: 0, folha: false })
  })

  it('o rótulo do bit 0 fica à esquerda da aresta e o do bit 1 à direita', () => {
    for (const aresta of layout.arestas) {
      const meio = (aresta.x1 + aresta.x2) / 2
      if (aresta.bit === '0') expect(aresta.rotulo.x).toBeLessThan(meio)
      else expect(aresta.rotulo.x).toBeGreaterThan(meio)
    }
  })

  it('nós do mesmo nível nunca ficam mais perto que o espaço horizontal', () => {
    const porNivel = Map.groupBy(layout.nos, (no) => no.profundidade)
    for (const nivel of porNivel.values()) {
      const xs = nivel.map((no) => no.x).sort((a, b) => a - b)
      for (let i = 1; i < xs.length; i++) {
        expect(xs[i] - xs[i - 1]).toBeGreaterThanOrEqual(espacoHorizontal)
      }
    }
  })

  it('os identificadores dos nós são únicos', () => {
    expect(new Set(layout.nos.map((no) => no.id)).size).toBe(layout.nos.length)
  })
})

describe('calcularLayoutDaArvore - outros casos', () => {
  it('sem raiz devolve layout vazio', () => {
    expect(calcularLayoutDaArvore(null)).toEqual({ nos: [], arestas: [], largura: 0, altura: 0 })
  })

  it('com um símbolo só há um nó com código 0 e nenhuma aresta', () => {
    const layout = calcularLayoutDaArvore(arvoreDe('aaaa'))
    expect(layout.nos).toHaveLength(1)
    expect(layout.nos[0]).toMatchObject({ folha: true, simbolo: 'a', codigo: '0', peso: 4 })
    expect(layout.arestas).toEqual([])
    expect(layout.largura).toBe(2 * margem)
  })

  it('aceita medidas personalizadas', () => {
    const layout = calcularLayoutDaArvore(arvoreDe('aab'), {
      espacoHorizontal: 100,
      espacoVertical: 50,
      margem: 10,
      margemInferior: 20,
    })
    const folhas = layout.nos.filter((no) => no.folha)
    expect(folhas.map((f) => f.x)).toEqual([10, 110])
    expect(layout.largura).toBe(120)
    expect(layout.altura).toBe(10 + 50 + 20)
  })

  it('árvore bem desbalanceada mantém os níveis separados', () => {
    let texto = ''
    let atual = 1
    let anterior = 1
    for (let i = 0; i < 15; i++) {
      texto += String.fromCharCode(97 + i).repeat(atual)
      ;[atual, anterior] = [atual + anterior, atual]
    }
    const layout = calcularLayoutDaArvore(arvoreDe(texto))
    const porNivel = Map.groupBy(layout.nos, (no) => no.profundidade)
    for (const nivel of porNivel.values()) {
      const xs = nivel.map((no) => no.x).sort((a, b) => a - b)
      for (let i = 1; i < xs.length; i++) {
        expect(xs[i] - xs[i - 1]).toBeGreaterThanOrEqual(espacoHorizontal)
      }
    }
  })
})
