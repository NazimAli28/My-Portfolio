import { useEffect, useRef, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, m } from 'motion/react'
import clsx from 'clsx'
import { lockScroll } from '@/lib/lenis'
import { pushLayer } from '@/lib/layers'
import { ease } from '@/lib/motion-presets'

type Props = {
  open: boolean
  onClose: () => void
  /** Accessible name for the dialog */
  label: string
  children: ReactNode
  className?: string
}

/**
 * Glass dialog (floating layer).
 * Locks page scroll (Lenis + native), traps Tab focus, closes on Escape / backdrop,
 * and returns focus to the element that opened it.
 */
export function Modal({ open, onClose, label, children, className }: Props) {
  const panel = useRef<HTMLDivElement>(null)
  const closeRef = useRef(onClose)
  useEffect(() => {
    closeRef.current = onClose
  })

  useEffect(() => {
    if (!open) return
    const opener = document.activeElement as HTMLElement | null
    const unlock = lockScroll()
    const popLayer = pushLayer(() => closeRef.current())
    // Focus the panel unless a child (e.g. an autoFocus input) already took focus
    requestAnimationFrame(() => {
      if (!panel.current?.contains(document.activeElement)) panel.current?.focus()
    })

    const onKey = (e: KeyboardEvent) => {
      const root = panel.current
      if (e.key !== 'Tab' || !root || !root.contains(document.activeElement)) return
      const items = root.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])',
      )
      if (!items.length) return
      const first = items[0]
      const last = items[items.length - 1]
      const active = document.activeElement
      if (e.shiftKey && (active === first || active === root)) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && active === last) {
        e.preventDefault()
        first.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      popLayer()
      unlock()
      opener?.focus?.({ preventScroll: true })
    }
  }, [open])

  return createPortal(
    <AnimatePresence>
      {open && (
        <m.div
          className="fixed inset-0 z-[80] grid place-items-center p-3 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div className="absolute inset-0 bg-bg/70 backdrop-blur-md" onClick={onClose} aria-hidden="true" />
          <m.div
            ref={panel}
            role="dialog"
            aria-modal="true"
            aria-label={label}
            tabIndex={-1}
            data-lenis-prevent
            className={clsx(
              'glass relative max-h-[92dvh] w-full max-w-5xl overflow-hidden rounded-modal outline-none',
              className,
            )}
            initial={{ y: 30, scale: 0.97, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 20, scale: 0.98, opacity: 0 }}
            transition={{ duration: 0.45, ease: ease.outExpo }}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute top-3 right-3 z-10 grid size-10 place-items-center rounded-full border border-line bg-bg/70 text-text transition-colors hover:border-cyan hover:text-cyan"
            >
              <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              </svg>
            </button>
            {children}
          </m.div>
        </m.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
