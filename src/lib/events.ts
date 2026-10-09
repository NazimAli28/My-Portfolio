/** Tiny cross-component events (no global store needed). */
export const PALETTE_OPEN = 'palette:open'

export function openPalette() {
  window.dispatchEvent(new Event(PALETTE_OPEN))
}
