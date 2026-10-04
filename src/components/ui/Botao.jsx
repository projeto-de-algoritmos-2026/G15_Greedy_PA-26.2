import estilos from './Botao.module.css'

export default function Botao({ variante = 'primario', children, ...propriedades }) {
  return (
    <button type="button" className={`${estilos.botao} ${estilos[variante]}`} {...propriedades}>
      {children}
    </button>
  )
}
