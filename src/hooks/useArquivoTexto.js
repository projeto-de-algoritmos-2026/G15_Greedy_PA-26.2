import { useState, useCallback } from 'react'
import { lerArquivoTexto, ErroDeArquivo } from '../utils/lerArquivoTexto.js'

export function useArquivoTexto() {
  const [arquivo, setArquivo] = useState(null)
  const [erro, setErro] = useState(null)
  const [lendo, setLendo] = useState(false)

  const escolher = useCallback(async (arquivoEscolhido) => {
    setLendo(true)
    setErro(null)

    try {
      setArquivo(await lerArquivoTexto(arquivoEscolhido))
    } catch (falha) {
      setArquivo(null)
      setErro(
        falha instanceof ErroDeArquivo ? falha.message : 'Não foi possível ler o arquivo.',
      )
    } finally {
      setLendo(false)
    }
  }, [])

  return { arquivo, erro, lendo, escolher }
}
