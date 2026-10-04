import estilos from './Metrica.module.css'

export default function Metrica({ rotulo, valor, detalhe }) {
  return (
    <div className={estilos.metrica}>
      <dt className={estilos.rotulo}>{rotulo}</dt>
      <dd className={estilos.valor}>{valor}</dd>
      {detalhe && <dd className={estilos.detalhe}>{detalhe}</dd>}
    </div>
  )
}
