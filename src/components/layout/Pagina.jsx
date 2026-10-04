import estilos from './Pagina.module.css'

export default function Pagina({ children }) {
  return (
    <main className={estilos.pagina}>
      <div className={estilos.coluna}>{children}</div>
    </main>
  )
}
