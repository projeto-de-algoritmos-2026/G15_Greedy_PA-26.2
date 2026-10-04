import { formatarNumero } from '../../utils/formatarNumero.js'
import ComparacaoDeTamanhos from './ComparacaoDeTamanhos.jsx'
import AvisoDeCrescimento from './AvisoDeCrescimento.jsx'
import Metrica from './Metrica.jsx'
import estilos from './PainelDeEstatisticas.module.css'

export default function PainelDeEstatisticas({ estatisticas }) {
  const e = estatisticas

  return (
    <div className={estilos.painel}>
      <ComparacaoDeTamanhos estatisticas={e} />

      {e.economia < 0 && <AvisoDeCrescimento estatisticas={e} />}

      <dl className={estilos.metricas}>
        <Metrica rotulo="Símbolos no texto" valor={formatarNumero(e.totalDeSimbolos)} />
        <Metrica rotulo="Símbolos distintos" valor={formatarNumero(e.simbolosDistintos)} />
        <Metrica
          rotulo="Bits codificados"
          valor={formatarNumero(e.totalDeBits)}
          detalhe={`contra ${formatarNumero(e.bitsOriginais)} bits no original`}
        />
        <Metrica
          rotulo="Bits de preenchimento"
          valor={formatarNumero(e.bitsDePreenchimento)}
          detalhe="zeros no fim do último byte"
        />
        <Metrica
          rotulo="Tamanho médio do código"
          valor={`${formatarNumero(e.tamanhoMedioDoCodigo, 2)} bits`}
          detalhe="por símbolo"
        />
        <Metrica
          rotulo="Entropia"
          valor={`${formatarNumero(e.entropia, 2)} bits`}
          detalhe="menor média possível por símbolo"
        />
      </dl>
    </div>
  )
}
