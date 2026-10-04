const formatador = new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 1 })

export function formatarTamanho(bytes) {
  if (bytes === 1) return '1 byte'
  if (bytes < 1024) return `${bytes} bytes`
  if (bytes < 1024 ** 2) return `${formatador.format(bytes / 1024)} KB`
  return `${formatador.format(bytes / 1024 ** 2)} MB`
}
