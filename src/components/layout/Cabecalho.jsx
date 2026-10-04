import estilos from './Cabecalho.module.css'

export default function Cabecalho() {
  return (
    <header className={estilos.cabecalho}>
      <div className={estilos.interno}>
        <svg className={estilos.marca} width="30" height="26" viewBox="0 0 30 26" aria-hidden="true">
          <path d="M15 5 L7 14 M15 5 L23 14 M7 14 L3 22 M7 14 L11 22" />
          <rect x="11.5" y="1.5" width="7" height="7" rx="1.5" />
          <circle cx="23" cy="14" r="3.5" />
          <circle cx="3" cy="22" r="2.5" />
          <circle cx="11" cy="22" r="2.5" />
        </svg>
        <span className={estilos.nome}>Huffman</span>
        <span className={estilos.apoio}>compactador</span>
      </div>
    </header>
  )
}
