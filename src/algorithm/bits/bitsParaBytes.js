export function bitsParaBytes(bits) {
  const bytes = new Uint8Array(Math.ceil(bits.length / 8))

  for (let i = 0; i < bits.length; i++) {
    if (bits[i] === '1') bytes[i >> 3] |= 0x80 >> (i & 7)
  }

  return bytes
}

export const calcularPreenchimento = (totalDeBits) => (8 - (totalDeBits % 8)) % 8
