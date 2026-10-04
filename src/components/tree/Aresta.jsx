import estilos from './Aresta.module.css'

export default function Aresta({ aresta }) {
  const classeDoBit = aresta.bit === '0' ? estilos.zero : estilos.um

  return (
    <g>
      <line x1={aresta.x1} y1={aresta.y1} x2={aresta.x2} y2={aresta.y2} className={estilos.linha} />
      <text
        x={aresta.rotulo.x}
        y={aresta.rotulo.y}
        dy="0.35em"
        textAnchor="middle"
        className={`${estilos.bit} ${classeDoBit}`}
      >
        {aresta.bit}
      </text>
    </g>
  )
}
