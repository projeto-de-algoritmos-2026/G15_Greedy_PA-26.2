import { ehFolha } from '../algorithm/tree/index.js'

export const MEDIDAS_PADRAO = {
  espacoHorizontal: 64,
  espacoVertical: 88,
  margem: 44,
  margemInferior: 64,
  afastamentoDoBit: 12,
}

export function calcularLayoutDaArvore(raiz, medidas = {}) {
  if (raiz === null) return { nos: [], arestas: [], largura: 0, altura: 0 }

  const { espacoHorizontal, espacoVertical, margem, margemInferior, afastamentoDoBit } = {
    ...MEDIDAS_PADRAO,
    ...medidas,
  }

  const nos = []
  const arestas = []
  let totalDeFolhas = 0
  let maiorProfundidade = 0

  function criarAresta(pai, filho, bit) {
    const meioX = (pai.x + filho.x) / 2
    const meioY = (pai.y + filho.y) / 2
    const lado = bit === '0' ? -afastamentoDoBit : afastamentoDoBit

    return {
      id: `${pai.id}-${filho.id}`,
      bit,
      x1: pai.x,
      y1: pai.y,
      x2: filho.x,
      y2: filho.y,
      rotulo: { x: meioX + lado, y: meioY },
    }
  }

  function posicionar(no, profundidade, codigo) {
    const registro = {
      id: nos.length,
      simbolo: no.simbolo,
      peso: no.peso,
      folha: ehFolha(no),
      profundidade,
      codigo,
      x: 0,
      y: margem + profundidade * espacoVertical,
    }
    nos.push(registro)
    maiorProfundidade = Math.max(maiorProfundidade, profundidade)

    if (registro.folha) {
      registro.x = margem + totalDeFolhas * espacoHorizontal
      totalDeFolhas += 1
      return registro
    }

    const esquerdo = posicionar(no.esquerdo, profundidade + 1, `${codigo}0`)
    const direito = posicionar(no.direito, profundidade + 1, `${codigo}1`)

    registro.x = (esquerdo.x + direito.x) / 2
    arestas.push(criarAresta(registro, esquerdo, '0'), criarAresta(registro, direito, '1'))
    return registro
  }

  posicionar(raiz, 0, ehFolha(raiz) ? '0' : '')

  return {
    nos,
    arestas,
    largura: 2 * margem + (totalDeFolhas - 1) * espacoHorizontal,
    altura: margem + maiorProfundidade * espacoVertical + margemInferior,
  }
}
