import Metrica from '../stats/Metrica.jsx'
import { formatarNumero, formatarBytesExatos } from '../../utils/formatarNumero.js'
import estilos from './ResumoDoRecuperado.module.css'

export default function ResumoDoRecuperado({ caracteres, tamanhoDoTexto, tamanhoDoArquivo }) {
  return (
    <dl className={estilos.metricas}>
      <Metrica rotulo="Caracteres" valor={formatarNumero(caracteres)} />
      <Metrica rotulo="Tamanho do texto" valor={formatarBytesExatos(tamanhoDoTexto)} detalhe="em UTF-8" />
      <Metrica
        rotulo="Tamanho do .huff"
        valor={formatarBytesExatos(tamanhoDoArquivo)}
        detalhe="arquivo enviado"
      />
    </dl>
  )
}
