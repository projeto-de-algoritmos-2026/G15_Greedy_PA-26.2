import { describe, it, expect } from 'vitest'
import { formatarTamanho } from './formatarTamanho.js'

describe('formatarTamanho', () => {
  it.each([
    [0, '0 bytes'],
    [1, '1 byte'],
    [25, '25 bytes'],
    [1023, '1023 bytes'],
    [1024, '1 KB'],
    [1536, '1,5 KB'],
    [1024 ** 2, '1 MB'],
    [5 * 1024 ** 2, '5 MB'],
    [2.25 * 1024 ** 2, '2,3 MB'],
  ])('%i bytes viram "%s"', (bytes, esperado) => {
    expect(formatarTamanho(bytes)).toBe(esperado)
  })
})
