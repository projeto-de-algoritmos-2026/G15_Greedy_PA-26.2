import { useMemo } from 'react'
import { montarQuadros } from '../../visualizacao/index.js'
import { LIMITE_DO_PASSO_A_PASSO } from '../../config/limites.js'
import PassoAPasso from './PassoAPasso.jsx'
import estilos from './PainelPassoAPasso.module.css'

export default function PainelPassoAPasso({ compactacao }) {
  const roteiro = useMemo(() => montarQuadros(compactacao), [compactacao])

  if (roteiro === null) {
    return (
      <p className={estilos.aviso}>
        {`O passo a passo detalhado está disponível para textos com até ${LIMITE_DO_PASSO_A_PASSO} caracteres diferentes. Este texto tem ${compactacao.frequencias.length}. A árvore e a tabela de códigos abaixo continuam completas.`}
      </p>
    )
  }

  return <PassoAPasso quadros={roteiro.quadros} capacidade={roteiro.capacidade} />
}
