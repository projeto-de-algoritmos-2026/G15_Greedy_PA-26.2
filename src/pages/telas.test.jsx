import { describe, it, expect } from 'vitest'
import { renderToString } from 'react-dom/server'
import App from '../App.jsx'
import ResultPage from './ResultPage.jsx'
import DescompactarPage from './DescompactarPage.jsx'
import RecuperadoPage from './RecuperadoPage.jsx'
import { compactar } from '../algorithm/index.js'

const renderizarResultado = (texto) =>
  renderToString(
    <ResultPage compactacao={compactar(texto)} arquivo={{ nome: 'a.txt' }} aoVoltar={() => {}} />,
  )

describe('telas', () => {
  it('a primeira tela pede o documento e começa com o botão desabilitado', () => {
    const html = renderToString(<App />)
    expect(html).toContain('Solte um arquivo .txt aqui')
    expect(html).toMatch(/<button[^>]*disabled[^>]*>Compactar<\/button>/)
  })

  it('a tela de resultado tem as quatro partes', () => {
    const html = renderizarResultado('Universidade_de_Brasília')
    expect(html).toContain('a.huff')
    expect(html).toContain('Baixar documento compactado')
    expect(html).toContain('Estatísticas')
    expect(html).toContain('Árvore de Huffman')
    expect(html).toContain('Tabela de códigos')
  })

  it('o exemplo pequeno avisa que o arquivo cresceu', () => {
    const html = renderizarResultado('Universidade_de_Brasília')
    expect(html).toContain('maior que o original')
    expect(html).toContain('18 bytes maior')
  })

  it('um texto grande e repetitivo não mostra o aviso de crescimento', () => {
    const html = renderizarResultado('abracadabra '.repeat(500))
    expect(html).toContain('menor que o original')
    expect(html).not.toContain('ficou')
  })

  it('a tabela lista todos os 13 códigos do exemplo', () => {
    const html = renderizarResultado('Universidade_de_Brasília')
    expect(html.match(/<li[ >]/g)).toHaveLength(13)
  })

  it('texto com um símbolo só mostra o aviso no lugar da árvore', () => {
    const html = renderizarResultado('aaaa')
    expect(html).toContain('Com um único símbolo')
  })

  it('caracteres especiais aparecem com nome acessível', () => {
    const html = renderizarResultado('a b\nc')
    expect(html).toContain('aria-label="espaço"')
    expect(html).toContain('aria-label="quebra de linha"')
  })
  it('o cabeçalho tem as abas Compactar e Descompactar, com a primeira ativa', () => {
    const html = renderToString(<App />)
    expect(html).toContain('aria-label="Principal"')
    expect(html).toMatch(/aria-current="page"[^>]*>Compactar<\/button>/)
    expect(html).toContain('>Descompactar</button>')
  })

  it('a tela de descompactar pede um .huff e começa com o botão desabilitado', () => {
    const html = renderToString(<DescompactarPage aoConcluir={() => {}} />)
    expect(html).toContain('Solte um arquivo .huff aqui')
    expect(html).toContain('accept=".huff"')
    expect(html).toMatch(/<button[^>]*disabled[^>]*>Descompactar<\/button>/)
  })

  it('a tela do texto recuperado mostra nome, contagens e prévia', () => {
    const html = renderToString(
      <RecuperadoPage texto={'Brasília\n'} arquivo={{ nome: 'a.huff', tamanho: 43 }} aoVoltar={() => {}} />,
    )
    expect(html).toContain('a.txt')
    expect(html).toContain('Baixar texto recuperado')
    expect(html).toContain('43 bytes')
    expect(html).toContain('Prévia do texto recuperado')
  })

  it('a prévia avisa quando o texto passa de 2.000 caracteres', () => {
    const html = renderToString(
      <RecuperadoPage texto={'a'.repeat(2500)} arquivo={{ nome: 'a.huff', tamanho: 10 }} aoVoltar={() => {}} />,
    )
    expect(html).toContain('primeiros 2.000')
    expect(html).toContain('2.500')
  })
})
