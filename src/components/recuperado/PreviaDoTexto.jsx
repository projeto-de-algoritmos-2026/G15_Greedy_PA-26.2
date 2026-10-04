import { formatarNumero } from '../../utils/formatarNumero.js'
import estilos from './PreviaDoTexto.module.css'

export default function PreviaDoTexto({ previa, cortado, limite, total }) {
  if (previa === '') {
    return <p className={estilos.vazio}>O texto recuperado está vazio.</p>
  }

  return (
    <div className={estilos.previa}>
      <pre className={estilos.texto} tabIndex={0} role="region" aria-label="Prévia do texto recuperado">
        {previa}
      </pre>
      {cortado && (
        <p className={estilos.aviso}>
          {`Mostrando os primeiros ${formatarNumero(limite)} de ${formatarNumero(total)} caracteres. O arquivo baixado tem o texto completo.`}
        </p>
      )}
    </div>
  )
}
