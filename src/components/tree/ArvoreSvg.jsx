import Aresta from './Aresta.jsx'
import NoFolha from './NoFolha.jsx'
import NoInterno from './NoInterno.jsx'

const ROTULO_PADRAO = 'Árvore de Huffman. Os mesmos códigos aparecem na tabela logo abaixo.'

export default function ArvoreSvg({ layout, escala, rotulo = ROTULO_PADRAO }) {
  return (
    <svg
      role="img"
      aria-label={rotulo}
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
