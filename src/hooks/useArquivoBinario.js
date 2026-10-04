import { lerArquivoBinario } from '../utils/lerArquivoBinario.js'
import { useLeitorDeArquivo } from './useLeitorDeArquivo.js'

export const useArquivoBinario = () => useLeitorDeArquivo(lerArquivoBinario)
