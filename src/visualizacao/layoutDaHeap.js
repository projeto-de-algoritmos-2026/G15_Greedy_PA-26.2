import { indicePai } from '../algorithm/heap/heapIndex.js'

export const MEDIDAS_DA_HEAP = {
  espacoHorizontal: 48,
  espacoVertical: 84,
  margemHorizontal: 32,
  margemSuperior: 32,
  margemInferior: 52,
}

const nivelDoIndice = (indice) => 31 - Math.clz32(indice + 1)

export function calcularLayoutDaHeap(capacidade, medidas = {}) {
  if (capacidade <= 0) return { posicoes: [], arestas: [], largura: 0, altura: 0 }

  const { espacoHorizontal, espacoVertical, margemHorizontal, margemSuperior, margemInferior } = {
    ...MEDIDAS_DA_HEAP,
    ...medidas,
  }

  const niveis = nivelDoIndice(capacidade - 1) + 1
  const larguraUtil = 2 ** (niveis - 1) * espacoHorizontal

  const posicoes = Array.from({ length: capacidade }, (_, indice) => {
    const nivel = nivelDoIndice(indice)
    const vagas = 2 ** nivel
    const posicaoNoNivel = indice - (vagas - 1)

    return {
      x: margemHorizontal + (posicaoNoNivel + 0.5) * (larguraUtil / vagas),
      y: margemSuperior + nivel * espacoVertical,
    }
  })

  const arestas = []
  for (let filho = 1; filho < capacidade; filho++) {
    const pai = indicePai(filho)
    arestas.push({
      id: `${pai}-${filho}`,
      filho,
      x1: posicoes[pai].x,
      y1: posicoes[pai].y,
      x2: posicoes[filho].x,
      y2: posicoes[filho].y,
    })
  }

  return {
    posicoes,
    arestas,
    largura: larguraUtil + 2 * margemHorizontal,
    altura: margemSuperior + (niveis - 1) * espacoVertical + margemInferior,
  }
}
