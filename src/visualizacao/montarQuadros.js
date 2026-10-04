import { rotuloDoNo } from './rotuloDoNo.js'

const MESA_VAZIA = { primeiro: null, segundo: null, novo: null }

const nome = (no) => rotuloDoNo(no)
const comPeso = (no) => `${nome(no)} (peso ${no.peso})`

function descreverRetirada(evento, ordem, proximo) {
  const inicio = `${ordem} ${comPeso(evento.removido)} sai da raiz da heap.`

  if (evento.movido === null) return `${inicio} A heap fica vazia.`

  const ocupa = `${inicio} O último item, ${comPeso(evento.movido)}, ocupa a raiz no lugar dele.`
  const desce = proximo && proximo.tipo === 'trocar' && proximo.direcao === 'descer'

  return desce
    ? `${ocupa} Ele desce enquanto algum filho for menor.`
    : `${ocupa} Nenhum filho é menor, então ele permanece ali.`
}

function descreverTroca(evento) {
  const { heap, de, para } = evento

  if (evento.direcao === 'descer') {
    return `${comPeso(heap[para])} desce da posição ${de} para a ${para}, trocando com ${comPeso(heap[de])}, que é menor.`
  }

  return `${comPeso(heap[para])} sobe da posição ${de} para a ${para}, trocando com o pai ${comPeso(heap[de])}, que é maior.`
}

function descreverInsercao(evento, proximo) {
  const inicio = `O nó novo, ${comPeso(evento.item)}, entra no fim da heap, na posição ${evento.indice}.`

  if (evento.indice === 0) return `${inicio} A heap estava vazia, então ele já é a raiz.`

  const sobe = proximo && proximo.tipo === 'trocar'
  return sobe
    ? `${inicio} Ele sobe enquanto for menor que o pai.`
    : `${inicio} Ele não é menor que o pai, então permanece ali.`
}

export function montarQuadros({ construcao, heapInicial, passos, raiz }) {
  if (!construcao) return null

  const identificadores = new Map()
  const identificar = (no) => {
    if (!identificadores.has(no)) identificadores.set(no, identificadores.size)
    return identificadores.get(no)
  }
  const itens = (nos) => nos.map((no) => ({ id: identificar(no), no }))

  const quadros = []
  const acrescentar = (quadro) =>
    quadros.push({ destaque: [], mesa: MESA_VAZIA, juncao: null, ...quadro })

  acrescentar({
    titulo: 'Uma folha para cada caractere',
    descricao:
      'Cada caractere diferente do texto vira uma folha com o número de vezes que ele aparece. Elas seguem a ordem em que surgem no texto e ainda não respeitam a regra da heap.',
    heap: itens(construcao.inicial),
  })

  for (const evento of construcao.eventos) {
    acrescentar({
      titulo: 'Montando a heap inicial',
      descricao: descreverTroca(evento),
      heap: itens(evento.heap),
      destaque: [evento.de, evento.para],
    })
  }

  acrescentar({
    titulo: 'Heap inicial pronta',
    descricao:
      'Agora o menor peso está na raiz e nenhum pai pesa mais que seus filhos. A cada junção, o algoritmo guloso retira os dois menores daqui.',
    heap: itens(heapInicial),
  })

  passos.forEach((passo, posicao) => {
    const juncao = { numero: posicao + 1, total: passos.length }
    const cabecalho = (acao) => `Junção ${juncao.numero} de ${juncao.total}: ${acao}`
    let mesa = MESA_VAZIA
    let retiradas = 0

    passo.eventos.forEach((evento, indice) => {
      const proximo = passo.eventos[indice + 1]

      if (evento.tipo === 'extrair') {
        retiradas += 1
        mesa =
          retiradas === 1
            ? { primeiro: passo.primeiro, segundo: null, novo: null }
            : { primeiro: passo.primeiro, segundo: passo.segundo, novo: null }

        acrescentar({
          titulo: cabecalho(retiradas === 1 ? 'retirar o menor' : 'retirar o segundo menor'),
          descricao: descreverRetirada(
            evento,
            retiradas === 1 ? 'O menor,' : 'O segundo menor,',
            proximo,
          ),
          heap: itens(evento.heap),
          destaque: evento.movido === null ? [] : [0],
          mesa,
          juncao,
        })
      }

      if (evento.tipo === 'trocar') {
        acrescentar({
          titulo: cabecalho('reorganizar a heap'),
          descricao: descreverTroca(evento),
          heap: itens(evento.heap),
          destaque: [evento.de, evento.para],
          mesa: evento.direcao === 'descer' ? mesa : MESA_VAZIA,
          juncao,
        })
      }

      if (evento.tipo === 'juntar') {
        mesa = { primeiro: passo.primeiro, segundo: passo.segundo, novo: passo.novo }

        acrescentar({
          titulo: cabecalho('juntar os dois'),
          descricao: `${comPeso(passo.primeiro)} e ${comPeso(passo.segundo)} viram os filhos de um nó novo, de peso ${passo.novo.peso}. O primeiro fica à esquerda e leva o bit 0, o segundo fica à direita e leva o bit 1.`,
          heap: itens(evento.heap),
          mesa,
          juncao,
        })
      }

      if (evento.tipo === 'inserir') {
        mesa = MESA_VAZIA

        acrescentar({
          titulo: cabecalho('inserir o nó novo'),
          descricao: descreverInsercao(evento, proximo),
          heap: itens(evento.heap),
          destaque: [evento.indice],
          juncao,
        })
      }
    })
  })

  acrescentar({
    titulo: 'Árvore pronta',
    descricao:
      passos.length === 0
        ? 'Com um único símbolo não há junções: a própria folha é a raiz e o código dela é 0.'
        : `Sobrou um nó só na heap: a raiz, com peso ${raiz.peso}, que é o total de caracteres do texto. O código de cada símbolo é o caminho da raiz até a folha, com 0 para a esquerda e 1 para a direita.`,
    heap: itens([raiz]),
  })

  return { quadros, capacidade: heapInicial.length }
}
