export const somarFrequencias = (frequencias) =>
  frequencias.reduce((soma, { frequencia }) => soma + frequencia, 0)
