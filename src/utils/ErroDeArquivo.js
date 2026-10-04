export class ErroDeArquivo extends Error {
  constructor(mensagem) {
    super(mensagem)
    this.name = 'ErroDeArquivo'
  }
}
