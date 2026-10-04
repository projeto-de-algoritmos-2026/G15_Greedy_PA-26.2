import { ArquivoInvalidoError } from './erros.js'

const MAXIMO_DE_BYTES = 5

export function escreverVarint(valor, saida) {
  let restante = valor

  while (restante >= 0x80) {
    saida.push((restante % 0x80) | 0x80)
    restante = Math.floor(restante / 0x80)
  }

  saida.push(restante)
}

export function lerVarint(bytes, posicao) {
  let valor = 0
  let multiplicador = 1

  for (let i = 0; i < MAXIMO_DE_BYTES; i++) {
    if (posicao + i >= bytes.length) {
      throw new ArquivoInvalidoError('O cabeçalho do arquivo está incompleto.')
    }

    const byte = bytes[posicao + i]
    valor += (byte & 0x7f) * multiplicador

    if ((byte & 0x80) === 0) {
      return { valor, proximaPosicao: posicao + i + 1 }
    }

    multiplicador *= 0x80
  }

  throw new ArquivoInvalidoError('O cabeçalho do arquivo contém um número inválido.')
}
