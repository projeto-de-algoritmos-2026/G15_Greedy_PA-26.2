import { useState, useCallback } from 'react'
import { descompactar, ArquivoInvalidoError } from '../algorithm/index.js'

const MENSAGEM_GENERICA = 'Não foi possível descompactar este arquivo.'

export function useDescompactacao(aoConcluir) {
  const [processando, setProcessando] = useState(false)
  const [falha, setFalha] = useState(null)

  const executar = useCallback(
    (arquivo) => {
      setProcessando(true)
      setFalha(null)

      setTimeout(() => {
        try {
          aoConcluir(descompactar(arquivo.bytes), arquivo)
        } catch (erro) {
          const mensagem = erro instanceof ArquivoInvalidoError ? erro.message : MENSAGEM_GENERICA
          setFalha({ arquivo, mensagem })
        } finally {
          setProcessando(false)
        }
      }, 0)
    },
    [aoConcluir],
  )

  return { executar, processando, falha }
}
