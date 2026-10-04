import Pagina from '../components/layout/Pagina.jsx'
import Secao from '../components/ui/Secao.jsx'
import CabecalhoDoResultado from '../components/result/CabecalhoDoResultado.jsx'
import PainelDeEstatisticas from '../components/stats/PainelDeEstatisticas.jsx'
import PainelArvore from '../components/tree/PainelArvore.jsx'
import TabelaDeCodigos from '../components/codes/TabelaDeCodigos.jsx'
import { baixarArquivo } from '../utils/baixarArquivo.js'
import { nomeCompactado } from '../utils/nomeDoArquivo.js'

export default function ResultPage({ compactacao, arquivo, aoVoltar }) {
  const nome = nomeCompactado(arquivo.nome)

  return (
    <Pagina largura="larga">
      <CabecalhoDoResultado
        nomeCompactado={nome}
        nomeOriginal={arquivo.nome}
        aoBaixar={() => baixarArquivo(compactacao.bytes, nome)}
        aoVoltar={aoVoltar}
      />

      <Secao
        titulo="Estatísticas"
        descricao="Quanto o arquivo encolheu e de onde vem cada byte do resultado."
      >
        <PainelDeEstatisticas estatisticas={compactacao.estatisticas} />
      </Secao>

      <Secao
        titulo="Árvore de Huffman"
        descricao="Símbolos raros ficam fundos na árvore e ganham códigos longos. Símbolos comuns ficam perto da raiz e ganham códigos curtos."
      >
        <PainelArvore raiz={compactacao.raiz} />
      </Secao>

      <Secao
        titulo="Tabela de códigos"
        descricao="O código de cada símbolo é o caminho da raiz até ele, e o número à direita é quantas vezes ele aparece no texto."
      >
        <TabelaDeCodigos codigos={compactacao.codigos} frequencias={compactacao.frequencias} />
      </Secao>
    </Pagina>
  )
}
