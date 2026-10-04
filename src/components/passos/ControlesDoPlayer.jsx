import Botao from '../ui/Botao.jsx'
import estilos from './ControlesDoPlayer.module.css'

export default function ControlesDoPlayer({ player, total }) {
  const noInicio = player.indice === 0
  const noFim = player.indice === player.ultimo

  return (
    <div className={estilos.controles} role="group" aria-label="Controles do passo a passo">
      <Botao variante="secundario" onClick={player.reiniciar} disabled={noInicio}>
        Reiniciar
      </Botao>
      <Botao variante="secundario" onClick={player.anterior} disabled={noInicio}>
        Anterior
      </Botao>
      <Botao variante="secundario" onClick={player.alternar}>
        {player.tocando ? 'Pausar' : noFim ? 'Repetir' : 'Reproduzir'}
      </Botao>
      <Botao variante="secundario" onClick={player.proximo} disabled={noFim}>
        Próximo
      </Botao>

      <input
        className={estilos.barra}
        type="range"
        min={0}
        max={player.ultimo}
        value={player.indice}
        onChange={(evento) => player.irPara(Number(evento.target.value))}
        aria-label="Quadro do passo a passo"
        aria-valuetext={`Quadro ${player.indice + 1} de ${total}`}
      />
    </div>
  )
}
