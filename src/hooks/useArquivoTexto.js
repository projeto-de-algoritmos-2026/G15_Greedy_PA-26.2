import { lerArquivoTexto } from '../utils/lerArquivoTexto.js'
import { useLeitorDeArquivo } from './useLeitorDeArquivo.js'

export const useArquivoTexto = () => useLeitorDeArquivo(lerArquivoTexto)
