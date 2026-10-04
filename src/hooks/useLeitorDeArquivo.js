import { useState, useCallback } from 'react'
import { ErroDeArquivo } from '../utils/ErroDeArquivo.js'

export function useLeitorDeArquivo(ler) {
  const [arquivo, setArquivo] = useState(null)
  const [erro, setErro] = useState(null)
  const [lendo, setLendo] = useState(false)

  const escolher = useCallback(
    async (arquivoEscolhido) => {
      setLendo(true)
      setErro(null)

      try {
        setArquivo(await ler(arquivoEscolhido))
      } catch (falha) {
        setArquivo(null)
        setErro(
          falha instanceof ErroDeArquivo ? falha.message : 'Não foi possível ler o arquivo.',
        )
      } finally {
        setLendo(false)
      }
    },
    [ler],
  )

  return { arquivo, erro, lendo, escolher }
}
