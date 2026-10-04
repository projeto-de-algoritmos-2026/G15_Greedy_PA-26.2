import { somarFrequencias } from '../frequency/index.js'

export function calcularEntropia(frequencias) {
  const total = somarFrequencias(frequencias)
  let entropia = 0

  for (const { frequencia } of frequencias) {
    const probabilidade = frequencia / total
    entropia += probabilidade * Math.log2(1 / probabilidade)
  }

  return entropia
}
