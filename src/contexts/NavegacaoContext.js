import { createContext, useContext } from 'react'

export const NavegacaoContext = createContext({ abaAtiva: 'compactar', irPara: () => {} })

export const useNavegacao = () => useContext(NavegacaoContext)
