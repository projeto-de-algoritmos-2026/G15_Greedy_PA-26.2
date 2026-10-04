import { useMemo } from 'react'
import { calcularLayoutDaArvore } from '../../visualizacao/index.js'
import ArvoreSvg from '../tree/ArvoreSvg.jsx'
import { LARGURA_MAXIMA_DA_MINIARVORE, MEDIDAS_DA_MINIARVORE } from './medidas.js'

export default function MiniArvore({ no, descricao }) {
  const layout = useMemo(() => calcularLayoutDaArvore(no, MEDIDAS_DA_MINIARVORE), [no])
  const escala = Math.min(1, LARGURA_MAXIMA_DA_MINIARVORE / layout.largura)

  return <ArvoreSvg layout={layout} escala={escala} rotulo={descricao} />
}
