import { TAMANHO_MAXIMO_EM_BYTES } from '../config/limites.js'
import { formatarTamanho } from './formatarTamanho.js'

export class ErroDeArquivo extends Error {
  constructor(mensagem) {
    super(mensagem)
    this.name = 'ErroDeArquivo'
  }
}

const decodificadorUtf8 = new TextDecoder('utf-8', { fatal: true, ignoreBOM: true })

export function validarArquivo(arquivo) {
  if (!/\.txt$/i.test(arquivo.name)) {
    throw new ErroDeArquivo('Envie um arquivo com a extensão .txt.')
  }

  if (arquivo.size === 0) {
    throw new ErroDeArquivo('O arquivo está vazio.')
  }

  if (arquivo.size > TAMANHO_MAXIMO_EM_BYTES) {
    throw new ErroDeArquivo(
      `O arquivo passa do limite de ${formatarTamanho(TAMANHO_MAXIMO_EM_BYTES)}.`,
    )
  }
}

export function decodificarUtf8(bytes) {
  try {
    return decodificadorUtf8.decode(bytes)
  } catch {
    throw new ErroDeArquivo(
      'O arquivo precisa estar em UTF-8. Salve-o novamente com essa codificação e tente de novo.',
    )
  }
}

export async function lerArquivoTexto(arquivo) {
  validarArquivo(arquivo)

  const bytes = new Uint8Array(await arquivo.arrayBuffer())

  return {
    nome: arquivo.name,
    tamanho: arquivo.size,
    texto: decodificarUtf8(bytes),
  }
}
