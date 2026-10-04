export function nomeCompactado(nomeOriginal) {
  return `${nomeOriginal.replace(/\.txt$/i, '')}.huff`
}
