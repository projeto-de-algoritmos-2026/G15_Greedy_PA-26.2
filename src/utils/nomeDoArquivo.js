export function nomeCompactado(nomeOriginal) {
  return `${nomeOriginal.replace(/\.txt$/i, '')}.huff`
}

export function nomeDescompactado(nomeCompactado) {
  return `${nomeCompactado.replace(/\.huff$/i, '')}.txt`
}
