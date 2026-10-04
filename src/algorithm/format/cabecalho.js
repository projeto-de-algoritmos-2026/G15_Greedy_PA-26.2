import { escreverVarint, lerVarint } from './varint.js'
import { ArquivoInvalidoError } from './erros.js'

const ASSINATURA = [0x48, 0x55, 0x46]
const VERSAO = 1
const TAMANHO_FIXO = ASSINATURA.length + 1
const MAIOR_PONTO_DE_CODIGO = 0x10ffff

export function serializarCabecalho(frequencias) {
  const saida = [...ASSINATURA, VERSAO]

  escreverVarint(frequencias.length, saida)

  for (const { simbolo, frequencia } of frequencias) {
    escreverVarint(simbolo.codePointAt(0), saida)
    escreverVarint(frequencia, saida)
  }

  return Uint8Array.from(saida)
}

export function lerCabecalho(bytes) {
  validarInicio(bytes)

  const quantidade = lerVarint(bytes, TAMANHO_FIXO)
  let posicao = quantidade.proximaPosicao

  const frequencias = []
  const vistos = new Set()

  for (let i = 0; i < quantidade.valor; i++) {
    const ponto = lerVarint(bytes, posicao)
    const frequencia = lerVarint(bytes, ponto.proximaPosicao)
    posicao = frequencia.proximaPosicao

    validarSimbolo(ponto.valor, frequencia.valor, vistos)

    frequencias.push({
      simbolo: String.fromCodePoint(ponto.valor),
      frequencia: frequencia.valor,
    })
  }

  return { frequencias, inicioDosDados: posicao }
}

function validarInicio(bytes) {
  if (bytes.length < TAMANHO_FIXO) {
    throw new ArquivoInvalidoError('O arquivo é pequeno demais para ser um arquivo .huff.')
  }

  ASSINATURA.forEach((byte, i) => {
    if (bytes[i] !== byte) {
      throw new ArquivoInvalidoError('Este arquivo não foi gerado por este compactador.')
    }
  })

  if (bytes[ASSINATURA.length] !== VERSAO) {
    throw new ArquivoInvalidoError('A versão deste arquivo não é suportada.')
  }
}

function validarSimbolo(pontoDeCodigo, frequencia, vistos) {
  if (pontoDeCodigo > MAIOR_PONTO_DE_CODIGO) {
    throw new ArquivoInvalidoError('O cabeçalho contém um caractere inválido.')
  }

  if (frequencia === 0) {
    throw new ArquivoInvalidoError('O cabeçalho contém uma frequência inválida.')
  }

  if (vistos.has(pontoDeCodigo)) {
    throw new ArquivoInvalidoError('O cabeçalho repete um caractere.')
  }

  vistos.add(pontoDeCodigo)
}
