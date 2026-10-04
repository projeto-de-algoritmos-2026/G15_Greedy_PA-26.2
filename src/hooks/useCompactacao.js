import { useState, useCallback } from 'react'
import { compactar } from '../algorithm/index.js'

export function useCompactacao(aoConcluir) {
  const [processando, setProcessando] = useState(false)
  const [erro, setErro] = useState(null)

  const executar = useCallback(
    (arquivo) => {
      setProcessando(true)
      setErro(null)

      setTimeout(() => {
        try {
          aoConcluir(compactar(arquivo.texto), arquivo)
        } catch {
          setErro('Não foi possível compactar este arquivo.')
        } finally {
          setProcessando(false)
        }
      }, 0)
    },
    [aoConcluir],
  )

  return { executar, processando, erro }
}
