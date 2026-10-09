/**
 * Escape stack for floating layers (modals, palette, mobile sheet).
 * Only the top-most open layer closes on Escape.
 */
const stack: Array<() => void> = []

window.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape' || !stack.length) return
  e.preventDefault()
  stack[stack.length - 1]()
})

export function pushLayer(close: () => void) {
  stack.push(close)
  return () => {
    const i = stack.lastIndexOf(close)
    if (i !== -1) stack.splice(i, 1)
  }
}
