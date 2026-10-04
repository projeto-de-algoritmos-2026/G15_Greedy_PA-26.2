const TEMPO_ATE_LIBERAR_URL = 1000

export function baixarArquivo(conteudo, nome, tipo = 'application/octet-stream') {
  const url = URL.createObjectURL(new Blob([conteudo], { type: tipo }))
  const link = document.createElement('a')

  link.href = url
  link.download = nome
  document.body.append(link)
  link.click()
  link.remove()

  setTimeout(() => URL.revokeObjectURL(url), TEMPO_ATE_LIBERAR_URL)
}
