import Pagina from '../components/layout/Pagina.jsx'
import BotaoAcao from '../components/ui/BotaoAcao.jsx'
import { baixarArquivo } from '../utils/baixarArquivo.js'
import { nomeCompactado } from '../utils/nomeDoArquivo.js'
import estilos from './ResultPage.module.css'

export default function ResultPage({ compactacao, arquivo, aoVoltar }) {
  return (
    <Pagina>
      <BotaoAcao
        onClick={() => baixarArquivo(compactacao.bytes, nomeCompactado(arquivo.nome))}
      >
        Baixar documento compactado
      </BotaoAcao>

      <button type="button" className={estilos.voltar} onClick={aoVoltar}>
        Compactar outro arquivo
      </button>
    </Pagina>
  )
}
