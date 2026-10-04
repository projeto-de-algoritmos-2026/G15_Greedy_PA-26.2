import Botao from '../ui/Botao.jsx'
import estilos from './CabecalhoDoResultado.module.css'

export default function CabecalhoDoResultado({ nomeCompactado, nomeOriginal, aoBaixar, aoVoltar }) {
  return (
    <div className={estilos.topo}>
      <div className={estilos.titulos}>
        <h1 className={estilos.nome}>{nomeCompactado}</h1>
        <p className={estilos.origem}>Gerado a partir de {nomeOriginal}</p>
      </div>

      <div className={estilos.acoes}>
        <Botao onClick={aoBaixar}>Baixar documento compactado</Botao>
        <Botao variante="discreto" onClick={aoVoltar}>
          Compactar outro arquivo
        </Botao>
      </div>
    </div>
  )
}
