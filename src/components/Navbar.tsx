import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router'
import { AnimatePresence, m, useMotionValueEvent, useScroll } from 'motion/react'
import { Logo } from '@/components/Logo'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { SectionLink } from '@/components/ui/SectionLink'
import { sections } from '@/content/nav'
import { profile } from '@/content/profile'
import { useScrollSpy } from '@/hooks/useScrollSpy'
import { lockScroll } from '@/lib/lenis'
import { pushLayer } from '@/lib/layers'
import { openPalette } from '@/lib/events'
import { ease } from '@/lib/motion-presets'

/* Notch cut into the top edge. Fixed size, so a path() clip is safe. */
const NOTCH = 'M0 0H176C162 0 156 6 154 18L152 40C150 53 143 60 130 60H46C33 60 26 53 24 40L22 18C20 6 14 0 0 0Z'

export function Navbar() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const active = useScrollSpy(
    sections.map((s) => s.id),
    isHome,
  )
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const { scrollY } = useScroll()

  // Hide on scroll down, show on scroll up
  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    if (y > 240 && y > prev + 4) setHidden(true)
    else if (y < prev - 4 || y < 240) setHidden(false)
  })

  // Mobile sheet is modal: lock scroll, Escape closes, page behind is inert, focus moves in
  useEffect(() => {
    if (!open) return
    const unlock = lockScroll()
    const popLayer = pushLayer(() => setOpen(false))
    const behind = [document.getElementById('main'), document.querySelector('footer')]
    behind.forEach((el) => el?.setAttribute('inert', ''))
    requestAnimationFrame(() => document.querySelector<HTMLElement>('#mobile-menu a')?.focus())
    return () => {
      behind.forEach((el) => el?.removeAttribute('inert'))
      popLayer()
      unlock()
    }
  }, [open])

  // Close the sheet when the route changes (state-from-props pattern, no effect)
  const [lastPath, setLastPath] = useState(pathname)
  if (lastPath !== pathname) {
    setLastPath(pathname)
    setOpen(false)
  }

  return (
    <>
      <m.header
        className="fixed inset-x-0 top-0 z-50"
        onFocus={() => setHidden(false)}
        animate={{ y: hidden && !open ? '-110%' : '0%' }}
        transition={{ duration: 0.45, ease: ease.outExpo }}
      >
        <div className="container-page relative flex h-[76px] items-start justify-between pt-3">
          {/* Left: section links (desktop) */}
          <nav aria-label="Sections" className="glass hidden items-center gap-1 rounded-full p-1.5 md:flex">
            {sections.map((s) => {
              const isActive = active === s.id
              return (
                <SectionLink
                  key={s.id}
                  to={s.id}
                  aria-current={isActive ? 'true' : undefined}
                  className={`relative rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                    isActive ? 'text-cyan' : 'text-muted hover:text-text'
                  }`}
                >
                  {isActive && (
                    <m.span
                      layoutId="nav-active"
                      className="absolute inset-0 -z-10 rounded-full bg-cyan/10"
                      transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                    />
                  )}
                  {s.label}
                </SectionLink>
              )
            })}
          </nav>
          <span className="md:hidden" />

          {/* Centre: logo in the notch */}
          <div className="absolute top-0 left-1/2 h-[60px] w-[176px] -translate-x-1/2">
            <div
              className="absolute inset-0"
              style={{
                clipPath: `path('${NOTCH}')`,
                background: 'var(--glass-bg)',
                backdropFilter: 'blur(16px) saturate(140%)',
                WebkitBackdropFilter: 'blur(16px) saturate(140%)',
              }}
            />
            <svg viewBox="0 0 176 60" className="pointer-events-none absolute inset-0" aria-hidden="true">
              <path d={NOTCH} fill="none" stroke="var(--glass-border)" strokeWidth="1.5" />
              <path d="M52 59.2H124" stroke="var(--c-cyan)" strokeOpacity="0.55" strokeWidth="1.2" />
            </svg>
            <Link
              to="/"
              aria-label={`${profile.shortName}, home`}
              className="absolute inset-x-12 top-1.5 bottom-2.5 grid place-items-center rounded-full"
            >
              <Logo className="size-9" />
            </Link>
          </div>

          {/* Right: actions */}
          <div className="glass flex items-center gap-1 rounded-full p-1.5">
            <button
              type="button"
              onClick={openPalette}
              className="hidden items-center gap-2 rounded-full px-3 py-1.5 text-sm text-muted transition-colors hover:text-cyan sm:flex"
              aria-label="Open command menu"
            >
              <span>Search</span>
              <kbd className="rounded-md border border-line px-1.5 font-sans text-[11px]">Ctrl K</kbd>
            </button>
            <ThemeToggle />
            <a
              href={profile.resume}
              download
              className="hidden rounded-full bg-violet px-4 py-1.5 text-sm font-semibold text-white transition-shadow hover:shadow-[var(--glow-violet)] md:inline-block"
            >
              Resume
            </a>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="rounded-full px-3 py-1.5 text-sm font-medium text-text md:hidden"
            >
              {open ? 'Close' : 'Menu'}
            </button>
          </div>
        </div>
      </m.header>

      <AnimatePresence>
        {open && (
          <m.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="glass fixed inset-0 z-40 flex flex-col justify-end px-6 pt-24 pb-10 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <nav aria-label="Mobile" className="flex flex-col gap-1">
              {sections.map((s, i) => (
                <m.div
                  key={s.id}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.05 * i, duration: 0.5, ease: ease.outExpo }}
                >
                  <SectionLink
                    to={s.id}
                    onNavigate={() => setOpen(false)}
                    className="font-display text-5xl font-semibold text-text hover:text-cyan"
                  >
                    {s.label}
                  </SectionLink>
                </m.div>
              ))}
            </nav>
            <div className="mt-10 flex flex-wrap gap-3">
              <a href={profile.resume} download className="rounded-full bg-violet px-5 py-2.5 font-semibold text-white">
                Download resume
              </a>
              <a href={`mailto:${profile.email}`} className="rounded-full border border-line px-5 py-2.5 font-semibold">
                Email me
              </a>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  )
}
