import { useNavegacao } from '../../contexts/NavegacaoContext.js'
import estilos from './AbasDeNavegacao.module.css'

const ABAS = [
  { id: 'compactar', rotulo: 'Compactar' },
  { id: 'descompactar', rotulo: 'Descompactar' },
]

export default function AbasDeNavegacao() {
  const { abaAtiva, irPara } = useNavegacao()

  return (
    <nav className={estilos.abas} aria-label="Principal">
      {ABAS.map(({ id, rotulo }) => (
        <button
          key={id}
          type="button"
          className={id === abaAtiva ? `${estilos.aba} ${estilos.ativa}` : estilos.aba}
          aria-current={id === abaAtiva ? 'page' : undefined}
          onClick={() => irPara(id)}
        >
          {rotulo}
        </button>
      ))}
    </nav>
  )
}
