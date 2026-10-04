export function contarCaracteres(texto) {
  let total = texto.length

  for (let i = 0; i < texto.length - 1; i++) {
    const alto = texto.charCodeAt(i)
    const baixo = texto.charCodeAt(i + 1)

    if (alto >= 0xd800 && alto <= 0xdbff && baixo >= 0xdc00 && baixo <= 0xdfff) {
      total -= 1
      i += 1
    }
  }

  return total
}
