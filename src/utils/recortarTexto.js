export function recortarTexto(texto, limite) {
  let fim = 0
  let contados = 0

  while (fim < texto.length && contados < limite) {
    fim += texto.codePointAt(fim) > 0xffff ? 2 : 1
    contados += 1
  }

  return { previa: texto.slice(0, fim), cortado: fim < texto.length }
}
