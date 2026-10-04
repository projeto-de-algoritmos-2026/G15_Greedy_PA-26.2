import { useMemo } from 'react'
import { calcularLayoutDaHeap } from '../../visualizacao/index.js'
import NoDaHeap from './NoDaHeap.jsx'
import estilos from './HeapEmArvore.module.css'

export default function HeapEmArvore({ heap, capacidade, destaque }) {
  const layout = useMemo(() => calcularLayoutDaHeap(capacidade), [capacidade])

  return (
    <div
      className={estilos.area}
      tabIndex={0}
      role="region"
      aria-label="Heap desenhada como árvore, com rolagem"
    >
      <svg
        role="img"
        aria-label="Heap desenhada como árvore. A mesma heap aparece como lista logo abaixo."
        width={layout.largura}
        height={layout.altura}
        viewBox={`0 0 ${layout.largura} ${layout.altura}`}
        className={estilos.desenho}
      >
        <g>
          {layout.arestas
            .filter((aresta) => aresta.filho < heap.length)
            .map((aresta) => (
              <line
                key={aresta.id}
                x1={aresta.x1}
                y1={aresta.y1}
                x2={aresta.x2}
                y2={aresta.y2}
                className={estilos.aresta}
              />
            ))}
        </g>
        <g>
          {heap.map((item, indice) => (
            <NoDaHeap
              key={item.id}
              item={item}
              posicao={layout.posicoes[indice]}
              destacado={destaque.includes(indice)}
            />
          ))}
        </g>
      </svg>
    </div>
  )
}
