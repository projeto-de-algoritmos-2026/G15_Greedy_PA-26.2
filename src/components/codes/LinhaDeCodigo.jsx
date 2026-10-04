import SimboloChip from '../ui/SimboloChip.jsx'
import CodigoBinario from '../ui/CodigoBinario.jsx'
import estilos from './LinhaDeCodigo.module.css'

export default function LinhaDeCodigo({ simbolo, codigo, frequencia }) {
  return (
    <li className={estilos.linha}>
      <SimboloChip simbolo={simbolo} />
      <span className={estilos.traco} aria-hidden="true" />
      <span className={estilos.codigo}>
        <CodigoBinario codigo={codigo} />
      </span>
      <span className={estilos.frequencia}>{frequencia}x</span>
    </li>
  )
}
