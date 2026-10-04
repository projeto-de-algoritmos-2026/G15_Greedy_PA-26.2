import { useState } from 'react'
import { formatarTamanho } from '../../utils/formatarTamanho.js'
import estilos from './DropZone.module.css'

export default function DropZone({ arquivo, aoEscolher }) {
  const [arrastando, setArrastando] = useState(false)

  const classes = arrastando ? `${estilos.zona} ${estilos.arrastando}` : estilos.zona

  function aoSoltar(evento) {
    evento.preventDefault()
    setArrastando(false)

    const soltado = evento.dataTransfer.files[0]
    if (soltado) aoEscolher(soltado)
  }

  function aoMudar(evento) {
    const escolhido = evento.target.files[0]
    evento.target.value = ''
    if (escolhido) aoEscolher(escolhido)
  }

  return (
    <label
      className={classes}
      onDragOver={(evento) => {
        evento.preventDefault()
        setArrastando(true)
      }}
      onDragLeave={() => setArrastando(false)}
      onDrop={aoSoltar}
    >
      <input
        className={estilos.entrada}
        type="file"
        accept=".txt,text/plain"
        onChange={aoMudar}
      />

      <span className={estilos.documento} aria-hidden="true">
        Doc
      </span>

      {arquivo ? (
        <span className={estilos.texto}>
          <strong className={estilos.nome}>{arquivo.nome}</strong>
          <span className={estilos.detalhe}>{formatarTamanho(arquivo.tamanho)}</span>
        </span>
      ) : (
        <span className={estilos.texto}>Lance seu documento TXT</span>
      )}
    </label>
  )
}
