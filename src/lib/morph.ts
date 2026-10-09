/**
 * Card → case-study cover morph (FLIP through a fixed overlay).
 * A real layoutId morph breaks across route changes that also reset scroll,
 * so the card records its cover's rect + src; <MorphOverlay> flies a clone
 * to the element marked `data-morph-target="<slug>"` on the next page.
 */
export type Morph = { slug: string; src: string; rect: DOMRect; radius: number }

let current: Morph | null = null
const subs = new Set<() => void>()

export function startMorph(m: Morph) {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
  current = m
  subs.forEach((cb) => cb())
}

export function clearMorph() {
  current = null
  subs.forEach((cb) => cb())
}

export function subscribeMorph(cb: () => void) {
  subs.add(cb)
  return () => {
    subs.delete(cb)
  }
}

export const getMorph = () => current
