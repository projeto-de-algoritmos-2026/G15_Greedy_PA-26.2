import { useCallback, useEffect, useRef, useState } from 'react'
import {
  aumentarEscala,
  diminuirEscala,
  escalaParaAjustar,
  escalaInicial,
} from '../visualizacao/index.js'

export function useZoom(larguraDoConteudo) {
  const [escala, setEscala] = useState(1)
  const areaRef = useRef(null)

  const larguraDisponivel = () => areaRef.current?.clientWidth ?? 0

  const ajustar = useCallback(() => {
    setEscala(escalaParaAjustar(larguraDoConteudo, larguraDisponivel()))
  }, [larguraDoConteudo])

  useEffect(() => {
    setEscala(escalaInicial(larguraDoConteudo, larguraDisponivel()))
  }, [larguraDoConteudo])

  return {
    escala,
    areaRef,
    ajustar,
    aumentar: () => setEscala(aumentarEscala),
    diminuir: () => setEscala(diminuirEscala),
  }
}
