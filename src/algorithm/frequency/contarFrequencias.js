export function contarFrequencias(texto) {
  const contagem = new Map()

  for (const simbolo of texto) {
    contagem.set(simbolo, (contagem.get(simbolo) ?? 0) + 1)
  }

  return Array.from(contagem, ([simbolo, frequencia]) => ({ simbolo, frequencia }))
}
