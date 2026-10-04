export function codificar(texto, codigos) {
  const partes = []

  for (const simbolo of texto) {
    partes.push(codigos.get(simbolo))
  }

  return partes.join('')
}
