import { rotuloDoNo } from '../../visualizacao/index.js'
import MiniArvore from './MiniArvore.jsx'
import estilos from './MesaDeJuncao.module.css'

const PECAS = [
  { chave: 'primeiro', titulo: 'Primeiro a sair' },
  { chave: 'segundo', titulo: 'Segundo a sair' },
  { chave: 'novo', titulo: 'Nó novo' },
]

export default function MesaDeJuncao({ mesa }) {
  const presentes = PECAS.filter((peca) => mesa[peca.chave] !== null)

  if (presentes.length === 0) {
    return <p className={estilos.vazia}>Nenhum nó fora da heap neste quadro.</p>
  }

  return (
    <div className={estilos.mesa}>
      {presentes.map(({ chave, titulo }) => {
        const no = mesa[chave]
        const rotulo = rotuloDoNo(no)

        return (
          <figure key={chave} className={estilos.peca}>
            <figcaption className={estilos.legenda}>
              <span className={estilos.titulo}>{titulo}</span>
              <span className={estilos.detalhe}>{`${rotulo}, peso ${no.peso}`}</span>
            </figcaption>
            <div className={estilos.desenho}>
              <MiniArvore no={no} descricao={`${titulo}: subárvore ${rotulo}, peso ${no.peso}`} />
            </div>
          </figure>
        )
      })}
    </div>
  )
}
