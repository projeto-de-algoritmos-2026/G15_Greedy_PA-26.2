import { useCallback, useEffect, useState } from 'react'

const INTERVALO_PADRAO = 900

export function usePlayer(total, intervalo = INTERVALO_PADRAO) {
  const [indice, setIndice] = useState(0)
  const [tocando, setTocando] = useState(false)
  const ultimo = total - 1

  useEffect(() => {
    if (!tocando) return undefined

    const relogio = setInterval(() => {
      setIndice((atual) => Math.min(atual + 1, ultimo))
    }, intervalo)

    return () => clearInterval(relogio)
  }, [tocando, ultimo, intervalo])

  useEffect(() => {
    if (tocando && indice >= ultimo) setTocando(false)
  }, [tocando, indice, ultimo])

  const irPara = useCallback(
    (destino) => {
      setTocando(false)
      setIndice(Math.min(Math.max(destino, 0), ultimo))
    },
    [ultimo],
  )

  const alternar = useCallback(() => {
    if (tocando) {
      setTocando(false)
      return
    }
    if (indice >= ultimo) setIndice(0)
    setTocando(true)
  }, [tocando, indice, ultimo])

  return {
    indice,
    tocando,
    ultimo,
    irPara,
    alternar,
    proximo: () => irPara(indice + 1),
    anterior: () => irPara(indice - 1),
    reiniciar: () => irPara(0),
    terminar: () => irPara(ultimo),
  }
}
