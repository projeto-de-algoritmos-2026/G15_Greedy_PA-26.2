export function formatarNumero(valor, casas = 0) {
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: casas,
    maximumFractionDigits: casas,
  }).format(valor)
}

export const formatarPorcentagem = (taxa) => `${formatarNumero(taxa * 100)}%`

export const formatarBytesExatos = (bytes) => `${formatarNumero(bytes)} ${bytes === 1 ? 'byte' : 'bytes'}`
