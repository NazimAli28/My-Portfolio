import { lazy, Suspense, useEffect, useState } from 'react'
import { Preloader } from '@/components/Preloader'
import { MorphOverlay } from '@/components/MorphOverlay'
import { Cursor } from '@/components/Cursor'
import { PALETTE_OPEN } from '@/lib/events'

// cmdk + the palette load on first use (Ctrl/Cmd+K or the Search button), not on page load
const CommandPalette = lazy(() => import('@/components/CommandPalette').then((m) => ({ default: m.CommandPalette })))

/** Global floating layers mounted once in RootLayout. */
export function Overlays() {
  const [paletteWanted, setPaletteWanted] = useState(false)

  useEffect(() => {
    if (paletteWanted) return
    const want = () => setPaletteWanted(true)
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        want()
      }
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener(PALETTE_OPEN, want)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener(PALETTE_OPEN, want)
    }
  }, [paletteWanted])

  return (
    <>
      <MorphOverlay />
      {paletteWanted && (
        <Suspense fallback={null}>
          <CommandPalette defaultOpen />
        </Suspense>
      )}
      <Cursor />
      <Preloader />
    </>
  )
}
