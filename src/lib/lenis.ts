import Lenis from 'lenis'
import { cancelFrame, frame } from 'motion/react'

/** One Lenis instance for the whole app, driven by motion's frame loop. */
let lenis: Lenis | null = null

export function startLenis() {
  if (lenis) return lenis
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return null
  lenis = new Lenis({ autoRaf: false, lerp: 0.11, anchors: false })
  const update = ({ timestamp }: { timestamp: number }) => lenis?.raf(timestamp)
  frame.update(update, true)
  const instance = lenis
  ;(instance as Lenis & { __stop?: () => void }).__stop = () => cancelFrame(update)
  return lenis
}

export function stopLenis() {
  if (!lenis) return
  ;(lenis as Lenis & { __stop?: () => void }).__stop?.()
  lenis.destroy()
  lenis = null
}

export function getLenis() {
  return lenis
}

/**
 * Ref-counted page scroll lock: modals, the palette and the mobile sheet can stack,
 * and the page must stay locked until the last one closes.
 */
let locks = 0
export function lockScroll() {
  if (locks++ === 0) {
    lenis?.stop()
    document.documentElement.style.overflow = 'hidden'
  }
  return () => {
    if (--locks === 0) {
      lenis?.start()
      document.documentElement.style.overflow = ''
    }
  }
}

/** Header offset so anchored sections are not hidden under the nav */
const OFFSET = -88

export function scrollToTarget(target: string | number, immediate = false) {
  const el = typeof target === 'string' ? document.querySelector<HTMLElement>(target) : null
  if (typeof target === 'string' && !el) return
  if (lenis) {
    // Page height changes between routes; re-measure so the target isn't clamped to the old limit
    lenis.resize()
    lenis.scrollTo(el ?? (target as number), { offset: el ? OFFSET : 0, immediate, force: true })
    return
  }
  const y = el ? el.getBoundingClientRect().top + window.scrollY + OFFSET : (target as number)
  window.scrollTo({ top: y, behavior: immediate ? 'instant' : 'smooth' })
}
