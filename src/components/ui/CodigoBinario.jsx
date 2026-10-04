import estilos from './CodigoBinario.module.css'

export default function CodigoBinario({ codigo }) {
  return (
    <span className={estilos.codigo}>
      {Array.from(codigo, (bit, posicao) => (
        <span key={posicao} className={bit === '0' ? estilos.zero : estilos.um}>
          {bit}
        </span>
      ))}
    </span>
  )
}
