import { useMemo } from 'react'
import Pagina from '../components/layout/Pagina.jsx'
import Secao from '../components/ui/Secao.jsx'
import CabecalhoDoResultado from '../components/result/CabecalhoDoResultado.jsx'
import ResumoDoRecuperado from '../components/recuperado/ResumoDoRecuperado.jsx'
import PreviaDoTexto from '../components/recuperado/PreviaDoTexto.jsx'
import { LIMITE_DA_PREVIA_EM_CARACTERES } from '../config/limites.js'
import { baixarArquivo } from '../utils/baixarArquivo.js'
import { nomeDescompactado } from '../utils/nomeDoArquivo.js'
import { recortarTexto } from '../utils/recortarTexto.js'
import { contarCaracteres } from '../utils/contarCaracteres.js'

const codificadorUtf8 = new TextEncoder()

export default function RecuperadoPage({ texto, arquivo, aoVoltar }) {
  const nome = nomeDescompactado(arquivo.nome)
  const bytes = useMemo(() => codificadorUtf8.encode(texto), [texto])
  const caracteres = useMemo(() => contarCaracteres(texto), [texto])
  const { previa, cortado } = useMemo(
    () => recortarTexto(texto, LIMITE_DA_PREVIA_EM_CARACTERES),
    [texto],
  )

  return (
    <Pagina largura="larga">
      <CabecalhoDoResultado
        nome={nome}
        origem={`Recuperado a partir de ${arquivo.nome}`}
        rotuloDoDownload="Baixar texto recuperado"
        rotuloDeVoltar="Descompactar outro arquivo"
        aoBaixar={() => baixarArquivo(bytes, nome, 'text/plain;charset=utf-8')}
        aoVoltar={aoVoltar}
      />

      <ResumoDoRecuperado
        caracteres={caracteres}
        tamanhoDoTexto={bytes.length}
        tamanhoDoArquivo={arquivo.tamanho}
      />

      <Secao titulo="Prévia" descricao="O início do texto, exatamente como será gravado no arquivo .txt.">
        <PreviaDoTexto
          previa={previa}
          cortado={cortado}
          limite={LIMITE_DA_PREVIA_EM_CARACTERES}
          total={caracteres}
        />
      </Secao>
    </Pagina>
  )
}
