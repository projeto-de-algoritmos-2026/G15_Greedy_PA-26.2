import { formatarBytesExatos } from '../../utils/formatarNumero.js'
import estilos from './AvisoDeCrescimento.module.css'

export default function AvisoDeCrescimento({ estatisticas }) {
  const { economia, tamanhoDoCabecalho, tamanhoOriginal, tamanhoDosDados } = estatisticas
  const dadosEncolheram = tamanhoDosDados < tamanhoOriginal
  const abertura = `Este arquivo ficou ${formatarBytesExatos(-economia)} maior que o original.`

  const explicacao = dadosEncolheram
    ? `O cabeçalho de ${formatarBytesExatos(tamanhoDoCabecalho)} guarda as frequências dos símbolos, que a descompactação precisa para refazer a árvore. Em textos curtos ele pesa mais que a economia obtida nos dados (${formatarBytesExatos(tamanhoOriginal - tamanhoDosDados)}). Em textos maiores e repetitivos o cabeçalho quase não faz diferença.`
    : 'Neste texto as frequências dos símbolos são muito parecidas, então os códigos não ficaram mais curtos que os bytes originais e o cabeçalho ainda soma ao tamanho.'

  return (
    <p className={estilos.aviso} role="note">
      {`${abertura} ${explicacao}`}
    </p>
  )
}
