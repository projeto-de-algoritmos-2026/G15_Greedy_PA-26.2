export class ArquivoInvalidoError extends Error {
  constructor(mensagem) {
    super(mensagem)
    this.name = 'ArquivoInvalidoError'
  }
}
