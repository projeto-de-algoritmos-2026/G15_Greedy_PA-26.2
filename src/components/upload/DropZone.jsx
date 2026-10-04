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
      <input className={estilos.entrada} type="file" accept=".txt,text/plain" onChange={aoMudar} />

      <span className={estilos.etiqueta} aria-hidden="true">
        .txt
      </span>

      {arquivo ? (
        <span className={estilos.corpo}>
          <span className={estilos.nome}>{arquivo.nome}</span>
          <span className={estilos.detalhe}>
            {formatarTamanho(arquivo.tamanho)}. Clique ou solte outro arquivo para trocar.
          </span>
        </span>
      ) : (
        <span className={estilos.corpo}>
          <span className={estilos.titulo}>Solte um arquivo .txt aqui</span>
          <span className={estilos.detalhe}>ou clique para escolher no computador</span>
        </span>
      )}
    </label>
  )
}
