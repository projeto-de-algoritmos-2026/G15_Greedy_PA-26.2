import { describe, it, expect } from 'vitest'
import { renderToString } from 'react-dom/server'
import App from '../App.jsx'
import ResultPage from './ResultPage.jsx'
import { compactar } from '../algorithm/index.js'

describe('telas', () => {
  it('a primeira tela pede o documento e começa com o botão desabilitado', () => {
    const html = renderToString(<App />)
    expect(html).toContain('Lance seu documento TXT')
    expect(html).toContain('Doc')
    expect(html).toMatch(/<button[^>]*disabled[^>]*>Compactar<\/button>/)
  })

  it('a tela de resultado mostra o botão de baixar', () => {
    const compactacao = compactar('Universidade_de_Brasília')
    const html = renderToString(
      <ResultPage compactacao={compactacao} arquivo={{ nome: 'a.txt' }} aoVoltar={() => {}} />,
    )
    expect(html).toContain('Baixar documento compactado')
    expect(html).toContain('Compactar outro arquivo')
  })
})
