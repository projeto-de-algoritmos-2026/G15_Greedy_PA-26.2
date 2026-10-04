import LinhaDeCodigo from './LinhaDeCodigo.jsx'
import estilos from './TabelaDeCodigos.module.css'

export default function TabelaDeCodigos({ codigos, frequencias }) {
  const frequenciaPorSimbolo = new Map(frequencias.map((item) => [item.simbolo, item.frequencia]))

  return (
    <ul className={estilos.tabela}>
      {Array.from(codigos, ([simbolo, codigo]) => (
        <LinhaDeCodigo
          key={simbolo}
          simbolo={simbolo}
          codigo={codigo}
          frequencia={frequenciaPorSimbolo.get(simbolo)}
        />
      ))}
    </ul>
  )
}
