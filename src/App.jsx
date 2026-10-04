import { useState } from 'react'
import UploadPage from './pages/UploadPage.jsx'
import ResultPage from './pages/ResultPage.jsx'

export default function App() {
  const [sessao, setSessao] = useState(null)

  if (sessao === null) {
    return <UploadPage aoConcluir={(compactacao, arquivo) => setSessao({ compactacao, arquivo })} />
  }

  return (
    <ResultPage
      compactacao={sessao.compactacao}
      arquivo={sessao.arquivo}
      aoVoltar={() => setSessao(null)}
    />
  )
}
