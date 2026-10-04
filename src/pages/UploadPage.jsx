import Pagina from '../components/layout/Pagina.jsx'
import DropZone from '../components/upload/DropZone.jsx'
import BotaoAcao from '../components/ui/BotaoAcao.jsx'
import { useArquivoTexto } from '../hooks/useArquivoTexto.js'
import { useCompactacao } from '../hooks/useCompactacao.js'
import estilos from './UploadPage.module.css'

export default function UploadPage({ aoConcluir }) {
  const { arquivo, erro: erroDeLeitura, lendo, escolher } = useArquivoTexto()
  const { executar, processando, erro: erroDeCompactacao } = useCompactacao(aoConcluir)

  const erro = erroDeLeitura ?? erroDeCompactacao
  const desabilitado = !arquivo || lendo || processando

  return (
    <Pagina>
      <DropZone arquivo={arquivo} aoEscolher={escolher} />

      <BotaoAcao disabled={desabilitado} onClick={() => executar(arquivo)}>
        {processando ? 'Compactando...' : 'Compactar'}
      </BotaoAcao>

      <p role="alert" className={estilos.erro}>
        {erro}
      </p>
    </Pagina>
  )
}
