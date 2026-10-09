import { useLayoutEffect, type ReactNode } from 'react'
import { m } from 'motion/react'
import { page } from '@/lib/motion-presets'
import { applyPendingScroll } from '@/lib/route-scroll'

/**
 * Wraps every page. On mount it applies the pending scroll (top / restored / hash)
 * and moves focus to the page's h1 for screen-reader and keyboard users.
 */
export function PageTransition({ children, focusHeading = true }: { children: ReactNode; focusHeading?: boolean }) {
  useLayoutEffect(() => {
    applyPendingScroll()
    if (focusHeading && document.body.dataset.routed === 'true') {
      document.querySelector<HTMLElement>('main h1')?.focus({ preventScroll: true })
    }
    document.body.dataset.routed = 'true'
  }, [focusHeading])

  return (
    <m.div variants={page} initial="initial" animate="enter" exit="exit">
      {children}
    </m.div>
  )
}
