import Aresta from './Aresta.jsx'
import NoFolha from './NoFolha.jsx'
import NoInterno from './NoInterno.jsx'

export default function ArvoreSvg({ layout, escala }) {
  return (
    <svg
      role="img"
      aria-label="Árvore de Huffman. Os mesmos códigos aparecem na tabela logo abaixo."
      width={layout.largura * escala}
      height={layout.altura * escala}
      viewBox={`0 0 ${layout.largura} ${layout.altura}`}
      style={{ display: 'block' }}
    >
      <g>
        {layout.arestas.map((aresta) => (
          <Aresta key={aresta.id} aresta={aresta} />
        ))}
      </g>
      <g>
        {layout.nos.map((no) =>
          no.folha ? <NoFolha key={no.id} no={no} /> : <NoInterno key={no.id} no={no} />,
        )}
      </g>
    </svg>
  )
}
