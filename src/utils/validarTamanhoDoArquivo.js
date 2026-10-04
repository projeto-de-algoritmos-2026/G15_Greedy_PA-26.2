import { TAMANHO_MAXIMO_EM_BYTES } from '../config/limites.js'
import { ErroDeArquivo } from './ErroDeArquivo.js'
import { formatarTamanho } from './formatarTamanho.js'

export function validarTamanhoDoArquivo(arquivo) {
  if (arquivo.size === 0) {
    throw new ErroDeArquivo('O arquivo está vazio.')
  }

  if (arquivo.size > TAMANHO_MAXIMO_EM_BYTES) {
    throw new ErroDeArquivo(
      `O arquivo passa do limite de ${formatarTamanho(TAMANHO_MAXIMO_EM_BYTES)}.`,
    )
  }
}
