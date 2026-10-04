import estilos from './BotaoAcao.module.css'

export default function BotaoAcao({ children, ...propriedades }) {
  return (
    <button type="button" className={estilos.botao} {...propriedades}>
      {children}
    </button>
  )
}
