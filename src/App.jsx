import { useMemo, useState } from 'react'
import { NavegacaoContext } from './contexts/NavegacaoContext.js'
import UploadPage from './pages/UploadPage.jsx'
import ResultPage from './pages/ResultPage.jsx'
import DescompactarPage from './pages/DescompactarPage.jsx'
import RecuperadoPage from './pages/RecuperadoPage.jsx'

export default function App() {
  const [aba, setAba] = useState('compactar')
  const [sessao, setSessao] = useState(null)
  const [recuperacao, setRecuperacao] = useState(null)

  const navegacao = useMemo(() => ({ abaAtiva: aba, irPara: setAba }), [aba])

  return (
    <NavegacaoContext.Provider value={navegacao}>
      {aba === 'compactar' && sessao === null && (
        <UploadPage aoConcluir={(compactacao, arquivo) => setSessao({ compactacao, arquivo })} />
      )}
      {aba === 'compactar' && sessao !== null && (
        <ResultPage
          compactacao={sessao.compactacao}
          arquivo={sessao.arquivo}
          aoVoltar={() => setSessao(null)}
        />
      )}
      {aba === 'descompactar' && recuperacao === null && (
        <DescompactarPage aoConcluir={(texto, arquivo) => setRecuperacao({ texto, arquivo })} />
      )}
      {aba === 'descompactar' && recuperacao !== null && (
        <RecuperadoPage
          texto={recuperacao.texto}
          arquivo={recuperacao.arquivo}
          aoVoltar={() => setRecuperacao(null)}
        />
      )}
    </NavegacaoContext.Provider>
  )
}
