import { scrollToTarget } from './lenis'

/**
 * Scroll target for the page that is about to mount. Set by RootLayout when the route changes,
 * applied by <PageTransition> once the new page is in the DOM (after the old page's exit).
 */
type Pending = { kind: 'top' } | { kind: 'y'; y: number } | { kind: 'hash'; hash: string } | null

let pending: Pending = null
const saved = new Map<string, number>()

export function savePosition(key: string) {
  saved.set(key, window.scrollY)
}

export function setPendingScroll(opts: { key: string; pop: boolean; hash?: string }) {
  if (opts.hash) pending = { kind: 'hash', hash: opts.hash }
  else if (opts.pop && saved.has(opts.key)) pending = { kind: 'y', y: saved.get(opts.key)! }
  else pending = { kind: 'top' }
}

export function applyPendingScroll() {
  const p = pending
  pending = null
  if (!p) return
  if (p.kind === 'top') scrollToTarget(0, true)
  else if (p.kind === 'y') scrollToTarget(p.y, true)
  else {
    scrollToTarget(0, true)
    // Let the page lay out, then glide to the section
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        scrollToTarget(p.hash)
        // Move focus to the section so keyboard users continue from there
        const el = document.querySelector<HTMLElement>(p.hash)
        if (el) {
          if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1')
          el.style.outline = 'none'
          el.focus({ preventScroll: true })
        }
      }),
    )
  }
}
