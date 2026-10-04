import { formatarBytesExatos, formatarPorcentagem } from '../../utils/formatarNumero.js'
import estilos from './ComparacaoDeTamanhos.module.css'

const emPorcentagem = (parte, total) => `${(parte / total) * 100}%`

export default function ComparacaoDeTamanhos({ estatisticas }) {
  const { tamanhoOriginal, tamanhoDoCabecalho, tamanhoDosDados, tamanhoCompactado } = estatisticas
  const { taxaDeCompressao, taxaSemCabecalho } = estatisticas
  const maior = Math.max(tamanhoOriginal, tamanhoCompactado)
  const menor = taxaDeCompressao >= 0

  return (
    <div className={estilos.comparacao}>
      <div className={estilos.barras}>
        <div className={estilos.linha}>
          <span className={estilos.rotulo}>Original</span>
          <div className={estilos.trilho}>
            <div
              className={estilos.original}
              style={{ width: emPorcentagem(tamanhoOriginal, maior) }}
            />
          </div>
          <span className={estilos.valor}>{formatarBytesExatos(tamanhoOriginal)}</span>
        </div>

        <div className={estilos.linha}>
          <span className={estilos.rotulo}>Compactado</span>
          <div className={estilos.trilho}>
            <div
              className={estilos.cabecalho}
              style={{ width: emPorcentagem(tamanhoDoCabecalho, maior) }}
            />
            <div
              className={estilos.dados}
              style={{ width: emPorcentagem(tamanhoDosDados, maior) }}
            />
          </div>
          <span className={estilos.valor}>{formatarBytesExatos(tamanhoCompactado)}</span>
        </div>

        <p className={estilos.legenda}>
          <span className={estilos.item}>
            <span className={estilos.amostraCabecalho} aria-hidden="true" />
            {`Cabeçalho, ${formatarBytesExatos(tamanhoDoCabecalho)}`}
          </span>
          <span className={estilos.item}>
            <span className={estilos.amostraDados} aria-hidden="true" />
            {`Dados codificados, ${formatarBytesExatos(tamanhoDosDados)}`}
          </span>
        </p>
      </div>

      <div className={estilos.taxa}>
        <p className={estilos.numero}>{formatarPorcentagem(Math.abs(taxaDeCompressao))}</p>
        <p className={estilos.descricao}>
          {menor ? 'menor que o original' : 'maior que o original'}
        </p>
        <p className={estilos.descricao}>
          Só os dados: {formatarPorcentagem(taxaSemCabecalho)} {taxaSemCabecalho >= 0 ? 'menores' : 'maiores'}
        </p>
      </div>
    </div>
  )
}
