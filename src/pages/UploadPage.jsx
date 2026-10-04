import Pagina from '../components/layout/Pagina.jsx'
import DropZone from '../components/upload/DropZone.jsx'
import Botao from '../components/ui/Botao.jsx'
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
      <div className={estilos.introducao}>
        <h1>Compacte um texto com o algoritmo de Huffman</h1>
        <p className={estilos.apoio}>
          Envie um arquivo .txt. O site gera o arquivo compactado e mostra como a árvore e os
          códigos foram construídos.
        </p>
      </div>

      <DropZone arquivo={arquivo} aoEscolher={escolher} />

      <div className={estilos.acoes}>
        <Botao disabled={desabilitado} onClick={() => executar(arquivo)}>
          {processando ? 'Compactando...' : 'Compactar'}
        </Botao>
        <p role="alert" className={estilos.erro}>
          {erro}
        </p>
      </div>
    </Pagina>
  )
}
