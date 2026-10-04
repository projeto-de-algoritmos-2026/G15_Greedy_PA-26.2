export const ESCALA_MINIMA = 0.25
export const ESCALA_MAXIMA = 3
export const PASSO_DO_ZOOM = 1.25

export const limitarEscala = (escala) => Math.min(ESCALA_MAXIMA, Math.max(ESCALA_MINIMA, escala))

export const aumentarEscala = (escala) => limitarEscala(escala * PASSO_DO_ZOOM)

export const diminuirEscala = (escala) => limitarEscala(escala / PASSO_DO_ZOOM)

export function escalaParaAjustar(larguraDoConteudo, larguraDisponivel) {
  if (larguraDoConteudo <= 0 || larguraDisponivel <= 0) return 1
  return limitarEscala(Math.min(1, larguraDisponivel / larguraDoConteudo))
}

export const ESCALA_INICIAL_MINIMA = 0.6

export const escalaInicial = (larguraDoConteudo, larguraDisponivel) =>
  Math.max(ESCALA_INICIAL_MINIMA, escalaParaAjustar(larguraDoConteudo, larguraDisponivel))
