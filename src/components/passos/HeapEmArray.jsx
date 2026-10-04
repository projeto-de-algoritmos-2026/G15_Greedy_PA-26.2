import CelulaDoArray from './CelulaDoArray.jsx'
import { LARGURA_DA_CELULA, ALTURA_DA_CELULA } from './medidas.js'
import estilos from './HeapEmArray.module.css'

export default function HeapEmArray({ heap, capacidade, destaque }) {
  const posicoes = Array.from({ length: capacidade }, (_, indice) => indice)

  return (
    <div
      className={estilos.area}
      tabIndex={0}
      role="region"
      aria-label="Heap como lista, com rolagem"
    >
      <div
        className={estilos.trilho}
        style={{ width: capacidade * LARGURA_DA_CELULA, height: ALTURA_DA_CELULA + 24 }}
      >
        {posicoes.map((indice) => (
          <div
            key={indice}
            className={estilos.vaga}
            style={{ transform: `translateX(${indice * LARGURA_DA_CELULA}px)` }}
          >
            <span className={estilos.indice}>{indice}</span>
          </div>
        ))}
        {heap.map((item, indice) => (
          <CelulaDoArray
            key={item.id}
            item={item}
            indice={indice}
            destacada={destaque.includes(indice)}
          />
        ))}
      </div>
    </div>
  )
}
