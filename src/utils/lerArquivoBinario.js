import { ErroDeArquivo } from './ErroDeArquivo.js'
import { validarTamanhoDoArquivo } from './validarTamanhoDoArquivo.js'

export function validarArquivoCompactado(arquivo) {
  if (!/\.huff$/i.test(arquivo.name)) {
    throw new ErroDeArquivo('Envie um arquivo com a extensão .huff.')
  }

  validarTamanhoDoArquivo(arquivo)
}

export async function lerArquivoBinario(arquivo) {
  validarArquivoCompactado(arquivo)

  return {
    nome: arquivo.name,
    tamanho: arquivo.size,
    bytes: new Uint8Array(await arquivo.arrayBuffer()),
  }
}
