import { ErroDeArquivo } from './ErroDeArquivo.js'
import { validarTamanhoDoArquivo } from './validarTamanhoDoArquivo.js'

export { ErroDeArquivo }

const decodificadorUtf8 = new TextDecoder('utf-8', { fatal: true, ignoreBOM: true })

export function validarArquivo(arquivo) {
  if (!/\.txt$/i.test(arquivo.name)) {
    throw new ErroDeArquivo('Envie um arquivo com a extensão .txt.')
  }

  validarTamanhoDoArquivo(arquivo)
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
