import Pagina from '../components/layout/Pagina.jsx'
import DropZone from '../components/upload/DropZone.jsx'
import Botao from '../components/ui/Botao.jsx'
import { useArquivoBinario } from '../hooks/useArquivoBinario.js'
import { useDescompactacao } from '../hooks/useDescompactacao.js'
import estilos from './UploadPage.module.css'

export default function DescompactarPage({ aoConcluir }) {
  const { arquivo, erro: erroDeLeitura, lendo, escolher } = useArquivoBinario()
  const { executar, processando, falha } = useDescompactacao(aoConcluir)

  const erroDeDescompactacao = falha && falha.arquivo === arquivo ? falha.mensagem : null
  const erro = erroDeLeitura ?? erroDeDescompactacao
  const desabilitado = !arquivo || lendo || processando

  return (
    <Pagina>
      <div className={estilos.introducao}>
        <h1>Recupere o texto de um arquivo .huff</h1>
        <p className={estilos.apoio}>
          Envie um arquivo gerado por este compactador. O site refaz a árvore a partir do cabeçalho
          e devolve o texto original, sem alterar nenhum caractere.
        </p>
      </div>

      <DropZone arquivo={arquivo} aoEscolher={escolher} extensao=".huff" aceitar=".huff" />

      <div className={estilos.acoes}>
        <Botao disabled={desabilitado} onClick={() => executar(arquivo)}>
          {processando ? 'Descompactando...' : 'Descompactar'}
        </Botao>
        <p role="alert" className={estilos.erro}>
          {erro}
        </p>
      </div>
    </Pagina>
  )
}
