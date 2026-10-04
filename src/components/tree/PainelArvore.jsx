import { useMemo } from 'react'
import { calcularLayoutDaArvore } from '../../visualizacao/index.js'
import { useZoom } from '../../hooks/useZoom.js'
import CodigoBinario from '../ui/CodigoBinario.jsx'
import ArvoreSvg from './ArvoreSvg.jsx'
import ControlesDeZoom from './ControlesDeZoom.jsx'
import estilos from './PainelArvore.module.css'

export default function PainelArvore({ raiz }) {
  const layout = useMemo(() => calcularLayoutDaArvore(raiz), [raiz])
  const { escala, areaRef, ajustar, aumentar, diminuir } = useZoom(layout.largura)
  const semRamificacao = layout.nos.length <= 1

  return (
    <div className={estilos.painel}>
      <div className={estilos.barra}>
        <p className={estilos.legenda}>
          Cada ramo à esquerda soma o bit <CodigoBinario codigo="0" /> e cada ramo à direita soma o
          bit <CodigoBinario codigo="1" />. O número sob cada símbolo é a frequência dele.
        </p>
        {!semRamificacao && (
          <ControlesDeZoom
            escala={escala}
            aoAumentar={aumentar}
            aoDiminuir={diminuir}
            aoAjustar={ajustar}
          />
        )}
      </div>

      {semRamificacao ? (
        <p className={estilos.aviso}>
          Com um único símbolo não há ramificações na árvore. O código dele é{' '}
          <CodigoBinario codigo="0" />.
        </p>
      ) : (
        <div
          ref={areaRef}
          className={estilos.area}
          tabIndex={0}
          role="region"
          aria-label="Área rolável da árvore de Huffman"
        >
          <ArvoreSvg layout={layout} escala={escala} />
        </div>
      )}
    </div>
  )
}
