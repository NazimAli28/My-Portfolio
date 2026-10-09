import { Suspense, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useLocation, useNavigationType, useOutlet } from 'react-router'
import { AnimatePresence } from 'motion/react'
import { AuroraBg } from '@/components/AuroraBg'
import { Navbar } from '@/components/Navbar'
import { ScrollProgress } from '@/components/ScrollProgress'
import { Footer } from '@/components/Footer'
import { Overlays } from '@/components/Overlays'
import { startLenis, stopLenis } from '@/lib/lenis'
import { applyPendingScroll, savePosition, setPendingScroll } from '@/lib/route-scroll'
import { clearMorph } from '@/lib/morph'

/** Keeps the outgoing page's element tree while AnimatePresence plays its exit. */
function FrozenOutlet() {
  const outlet = useOutlet()
  const [frozen] = useState(outlet)
  return frozen
}

export function RootLayout() {
  const location = useLocation()
  const navType = useNavigationType()
  const lastKey = useRef(location.key)

  useEffect(() => {
    history.scrollRestoration = 'manual'
    startLenis()
    return stopLenis
  }, [])

  // Remember where each history entry was scrolled to
  useEffect(() => {
    const onScroll = () => savePosition(lastKey.current)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Decide where the next page should land (applied by <PageTransition> on mount)
  const lastPath = useRef(location.pathname)
  useLayoutEffect(() => {
    lastKey.current = location.key
    setPendingScroll({
      key: location.key,
      pop: navType === 'POP',
      hash: location.hash || undefined,
    })
    // Same page (e.g. logo link on Home, or Back between hash entries): no remount, apply now
    if (lastPath.current === location.pathname) applyPendingScroll()
    lastPath.current = location.pathname
    // Back/Forward mid-flight: drop the card morph clone
    if (navType === 'POP') clearMorph()
  }, [location.key, location.hash, location.pathname, navType])

  return (
    <>
      <a
        href="#main"
        className="sr-only z-[70] rounded-full bg-violet px-4 py-2 text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <AuroraBg />
      <ScrollProgress />
      <Navbar />
      <main id="main" tabIndex={-1} className="outline-none">
        <AnimatePresence mode="wait" initial={false}>
          <Suspense key={location.pathname} fallback={<div className="min-h-dvh" />}>
            <FrozenOutlet />
          </Suspense>
        </AnimatePresence>
      </main>
      <Footer />
      <Overlays />
    </>
  )
}
