export function trocar(heap, i, j) {
  const temp = heap[i]
  heap[i] = heap[j]
  heap[j] = temp
}
