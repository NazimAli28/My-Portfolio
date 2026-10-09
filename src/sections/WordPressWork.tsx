import { useCallback, useEffect, useRef, useState } from 'react'
import { animate, m, useMotionValue, useReducedMotion, type AnimationPlaybackControls } from 'motion/react'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { wordpressSites, wordpressTotal } from '@/content/wordpress'
import type { WPSite } from '@/types/content'

/** Pixels per second of the hover auto-scroll */
const SPEED = 300

function Dots() {
  return (
    <span aria-hidden="true" className="flex gap-1.5">
      <span className="size-2.5 rounded-full bg-line" />
      <span className="size-2.5 rounded-full bg-line" />
      <span className="size-2.5 rounded-full bg-line" />
    </span>
  )
}

/** Skeleton page inside a browser frame: reads as a placeholder, not as a broken image */
function Placeholder({ note, tall = false }: { note: string; tall?: boolean }) {
  return (
    <div
      className={
        'relative flex h-full w-full flex-col overflow-hidden bg-gradient-to-br from-surface to-bg ' +
        (tall ? 'min-h-64' : '')
      }
    >
      <div aria-hidden="true" className="flex items-center gap-3 border-b border-line px-3 py-2">
        <Dots />
        <span className="h-3 flex-1 rounded-full bg-line/70" />
      </div>
      <div aria-hidden="true" className="grid flex-1 content-start gap-2.5 p-4">
        <span className="h-10 rounded-input bg-line/60" />
        <span className="h-2.5 w-2/3 rounded-full bg-line/70" />
        <span className="h-2.5 w-1/2 rounded-full bg-line/50" />
        <div className="mt-2 grid grid-cols-3 gap-2.5">
          <span className="h-12 rounded-input bg-line/50" />
          <span className="h-12 rounded-input bg-line/50" />
          <span className="h-12 rounded-input bg-line/50" />
        </div>
      </div>
      <p className="absolute right-3 bottom-3 rounded-full border border-line bg-bg/80 px-3 py-1 text-sm text-muted">
        {note}
      </p>
    </div>
  )
}

function SiteCard({ site, onOpen }: { site: WPSite; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      data-cursor="hover"
      className="group flex flex-col rounded-panel border border-line bg-surface p-3 text-left transition-[border-color,box-shadow] duration-300 hover:border-cyan hover:shadow-[var(--glow-cyan)] focus-visible:border-cyan"
    >
      <span className="block aspect-[16/10] w-full overflow-hidden rounded-[1.1rem] border border-line">
        {site.thumb ? (
          <img src={site.thumb} alt="" loading="lazy" className="size-full object-cover object-top" />
        ) : (
          <Placeholder note="Preview coming soon" />
        )}
      </span>
      <span className="mt-4 block px-2 pb-2">
        <span className="block text-xl font-semibold font-display">{site.name}</span>
        <span className="mt-1 block text-sm text-muted">
          {site.industry}, {site.year}
        </span>
      </span>
    </button>
  )
}

function ScrollShot({ site }: { site: WPSite }) {
  const reduced = useReducedMotion()
  const wrapRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const y = useMotionValue(0)
  const anim = useRef<AnimationPlaybackControls | null>(null)
  const dist = useRef(0)
  const [manual, setManual] = useState(!!reduced)

  const stop = useCallback(() => {
    anim.current?.stop()
    anim.current = null
  }, [])

  useEffect(() => stop, [stop])

  const measure = () => {
    const img = imgRef.current
    const wrap = wrapRef.current
    if (!img || !wrap) return
    dist.current = Math.max(0, img.offsetHeight - wrap.clientHeight)
  }

  const start = () => {
    if (manual || dist.current <= 0) return
    stop()
    const remaining = dist.current + y.get()
    anim.current = animate(y, -dist.current, { duration: remaining / SPEED, ease: 'linear' })
  }

  const goManual = () => {
    stop()
    y.set(0)
    setManual(true)
  }

  return (
    <div className="overflow-hidden rounded-[1.1rem] border border-line bg-bg">
      <div className="flex items-center gap-3 border-b border-line bg-surface px-3 py-2">
        <Dots />
        <span className="min-w-0 flex-1 truncate rounded-full bg-bg px-3 py-0.5 text-sm text-muted">
          {site.url ? site.url.replace(/^https?:\/\//, '') : site.name}
        </span>
      </div>
      <div
        ref={wrapRef}
        tabIndex={0}
        role="group"
        aria-label={`Full-page screenshot of ${site.name}. Scroll with arrow keys.`}
        data-lenis-prevent
        onPointerEnter={(e) => (e.pointerType === 'mouse' ? start() : goManual())}
        onPointerLeave={(e) => e.pointerType === 'mouse' && stop()}
        onPointerDown={(e) => e.pointerType !== 'mouse' && goManual()}
        onFocus={goManual}
        className={
          'h-[46dvh] md:h-[60dvh] ' + (manual ? 'overflow-y-auto overscroll-contain' : 'overflow-hidden')
        }
      >
        <m.img
          ref={imgRef}
          src={site.fullShot}
          alt={`Full-page screenshot of ${site.name}`}
          style={{ y: manual ? 0 : y }}
          onLoad={measure}
          loading="lazy"
          className="block h-auto w-full"
        />
      </div>
    </div>
  )
}

function SiteDetail({ site }: { site: WPSite }) {
  return (
    <div className="grid max-h-[92dvh] gap-6 overflow-y-auto p-4 pt-14 sm:p-6 sm:pt-14 md:grid-cols-[1.1fr_1fr] md:overflow-visible md:pt-6">
      <div className="min-w-0">
        {site.fullShot ? (
          <ScrollShot site={site} />
        ) : (
          <div className="overflow-hidden rounded-[1.1rem] border border-line">
            <div className="h-[46dvh] md:h-[60dvh]">
              <Placeholder note="Full-page screenshot coming soon" tall />
            </div>
          </div>
        )}
      </div>
      <div className="min-w-0 md:max-h-[calc(92dvh-3rem)] md:overflow-y-auto md:pr-2 md:pt-8" data-lenis-prevent>
        <h3 className="text-3xl font-semibold">{site.name}</h3>
        <p className="mt-1 text-muted">
          {site.industry}, {site.year}
        </p>
        <p className="mt-4">{site.summary}</p>
        <h4 className="mt-6 text-lg font-semibold">What I built</h4>
        <ul className="mt-2 space-y-2 text-muted">
          {site.features.map((f) => (
            <li key={f} className="relative pl-5">
              <span aria-hidden="true" className="absolute top-[0.7em] left-0 size-1.5 rounded-full bg-violet" />
              {f}
            </li>
          ))}
        </ul>
        <ul className="mt-6 flex flex-wrap gap-2">
          {site.stack.map((s) => (
            <li key={s} className="rounded-full border border-line px-3 py-1 text-sm">
              {s}
            </li>
          ))}
        </ul>
        {site.url && (
          <div className="mt-8">
            <Button href={site.url} target="_blank" rel="noopener noreferrer">
              Visit site
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export function WordPressWork() {
  const [active, setActive] = useState<WPSite | null>(null)
  const [open, setOpen] = useState(false)
  const close = useCallback(() => setOpen(false), [])
  const sites = wordpressSites.filter((s) => !s.placeholder)

  return (
    <section id="wordpress" aria-labelledby="wordpress-title" className="container-page py-24">
      <SectionHeading
        id="wordpress-title"
        title="WordPress and WooCommerce"
        intro={`${wordpressTotal} client sites delivered and maintained: themes, plugins, stores and fixes.`}
      />
      {sites.length === 0 && (
        // Honest summary until real sites (with screenshots) are added to content/wordpress.ts
        <div className="mt-12 grid gap-6 rounded-panel border border-line bg-surface p-6 sm:p-10 md:grid-cols-[auto_1fr] md:items-center md:gap-12">
          <p className="font-display text-7xl font-semibold text-violet-ink tabular-nums sm:text-8xl">
            {wordpressTotal}
          </p>
          <div>
            <p className="text-xl font-semibold">Client sites delivered and maintained</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {['Theme setup', 'Plugin configuration', 'WooCommerce stores', 'Custom functionality', 'Troubleshooting'].map((s) => (
                <li key={s} className="rounded-full border border-line px-3 py-1 text-sm">
                  {s}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-muted">Selected sites with full-page previews are on the way.</p>
          </div>
        </div>
      )}
      <ul className="mt-12 grid gap-6 empty:hidden sm:grid-cols-2 lg:grid-cols-3">
        {sites.map((site) => (
          <li key={site.slug}>
            <SiteCard
              site={site}
              onOpen={() => {
                setActive(site)
                setOpen(true)
              }}
            />
          </li>
        ))}
      </ul>
      <Modal open={open} onClose={close} label={active?.name ?? 'Site details'}>
        {active && <SiteDetail key={active.slug} site={active} />}
      </Modal>
    </section>
  )
}
