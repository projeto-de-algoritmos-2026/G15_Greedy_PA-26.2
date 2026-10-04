import { usePlayer } from '../../hooks/usePlayer.js'
import ControlesDoPlayer from './ControlesDoPlayer.jsx'
import HeapEmArray from './HeapEmArray.jsx'
import HeapEmArvore from './HeapEmArvore.jsx'
import MesaDeJuncao from './MesaDeJuncao.jsx'
import estilos from './PassoAPasso.module.css'

function aoTeclar(evento, player) {
  if (evento.target.tagName === 'INPUT') return

  const teclas = {
    ArrowRight: player.proximo,
    ArrowLeft: player.anterior,
    Home: player.reiniciar,
    End: player.terminar,
  }

  if (evento.key === ' ' && evento.target === evento.currentTarget) {
    evento.preventDefault()
    player.alternar()
    return
  }

  if (teclas[evento.key]) {
    evento.preventDefault()
    teclas[evento.key]()
  }
}

export default function PassoAPasso({ quadros, capacidade }) {
  const player = usePlayer(quadros.length)
  const quadro = quadros[player.indice]

  return (
    <div
      className={estilos.player}
      tabIndex={0}
      role="group"
      aria-label="Passo a passo. Setas esquerda e direita mudam de quadro, espaço reproduz ou pausa."
      onKeyDown={(evento) => aoTeclar(evento, player)}
    >
      <div className={estilos.cabecalho}>
        <h3 className={estilos.titulo}>{quadro.titulo}</h3>
        <span className={estilos.contador}>{`Quadro ${player.indice + 1} de ${quadros.length}`}</span>
      </div>

      <p className={estilos.descricao} aria-live="polite">
        {quadro.descricao}
      </p>

      <ControlesDoPlayer player={player} total={quadros.length} />

      <div className={estilos.palco}>
        <div className={estilos.bloco}>
          <h4 className={estilos.subtitulo}>Heap como árvore</h4>
          <HeapEmArvore heap={quadro.heap} capacidade={capacidade} destaque={quadro.destaque} />
        </div>

        <div className={estilos.bloco}>
          <h4 className={estilos.subtitulo}>Fora da heap</h4>
          <MesaDeJuncao mesa={quadro.mesa} />
        </div>
      </div>

      <div className={estilos.bloco}>
        <h4 className={estilos.subtitulo}>Heap como lista, da posição 0 em diante</h4>
        <HeapEmArray heap={quadro.heap} capacidade={capacidade} destaque={quadro.destaque} />
      </div>
    </div>
  )
}
