import { formatarPorcentagem } from '../../utils/formatarNumero.js'
import Botao from '../ui/Botao.jsx'
import estilos from './ControlesDeZoom.module.css'

export default function ControlesDeZoom({ escala, aoAumentar, aoDiminuir, aoAjustar }) {
  return (
    <div className={estilos.controles} role="group" aria-label="Zoom da árvore">
      <Botao variante="secundario" onClick={aoDiminuir} aria-label="Diminuir zoom">
        −
      </Botao>
      <output className={estilos.valor} aria-live="polite">
        {formatarPorcentagem(escala)}
      </output>
      <Botao variante="secundario" onClick={aoAumentar} aria-label="Aumentar zoom">
        +
      </Botao>
      <Botao variante="secundario" onClick={aoAjustar}>
        Ajustar à largura
      </Botao>
    </div>
  )
}
