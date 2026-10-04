const ESPECIAIS = new Map([
  [' ', { rotulo: 'esp', nome: 'espaço' }],
  ['\n', { rotulo: '\\n', nome: 'quebra de linha' }],
  ['\r', { rotulo: '\\r', nome: 'retorno de carro' }],
  ['\t', { rotulo: '\\t', nome: 'tabulação' }],
  ['\u00a0', { rotulo: 'nbsp', nome: 'espaço sem quebra' }],
  ['\ufeff', { rotulo: 'BOM', nome: 'marcador de ordem de bytes (BOM)' }],
])

const NAO_EXIBIVEL = /[\p{C}\p{Z}\p{M}]/u

export function formatarPontoDeCodigo(simbolo) {
  const hexadecimal = simbolo.codePointAt(0).toString(16).toUpperCase().padStart(4, '0')
  return `U+${hexadecimal}`
}

export function descreverSimbolo(simbolo) {
  const conhecido = ESPECIAIS.get(simbolo)
  if (conhecido) return { ...conhecido, especial: true }

  if (NAO_EXIBIVEL.test(simbolo)) {
    const ponto = formatarPontoDeCodigo(simbolo)
    return { rotulo: ponto, nome: `caractere especial ${ponto}`, especial: true }
  }

  return { rotulo: simbolo, nome: simbolo, especial: false }
}

export function categoriaDoRotulo(rotulo) {
  const tamanho = Array.from(rotulo).length
  if (tamanho === 1) return 'curto'
  if (tamanho <= 3) return 'medio'
  return 'longo'
}
