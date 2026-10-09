import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, m, useInView } from 'motion/react'
import clsx from 'clsx'
import { useReducedMotion } from '@/hooks/useMedia'

const CYCLE = 8

/**
 * The hero's signature: a small live "ops console" showing what Nazim builds.
 * SalesHub approval flips, a TeamHub timer ticks and scores, OpsBot answers a slash command.
 * Purely illustrative, so the animated parts are aria-hidden with one sr-only summary.
 */
export function OpsConsole({ active }: { active: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { margin: '-10% 0px' })
  const reduced = useReducedMotion()
  const [t, setT] = useState(5)

  useEffect(() => {
    if (!active || !inView || reduced) return
    const id = window.setInterval(() => setT((v) => v + 1), 1000)
    return () => window.clearInterval(id)
  }, [active, inView, reduced])

  const s = t % CYCLE
  const approval = s < 3 ? 'pending' : s < 5 ? 'review' : 'approved'
  const seconds = 2 * 60 + 14 + t
  const points = 128 + Math.floor(t / CYCLE) * 12
  const scored = s === 7

  return (
    <div ref={ref} className="relative">
      <p className="sr-only">
        Illustration of three tools I built: a SalesHub change request being approved, a TeamHub task timer adding
        points, and OpsBot answering an order lookup in Discord.
      </p>
      <div
        aria-hidden="true"
        className="glow-cyan overflow-hidden rounded-panel border border-line bg-surface/80 shadow-2xl backdrop-blur-md"
      >
        {/* Title bar */}
        <div className="flex items-center justify-between border-b border-line px-5 py-3">
          <div className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-line" />
            <span className="size-2.5 rounded-full bg-line" />
            <span className="size-2.5 rounded-full bg-line" />
          </div>
          <span className="font-mono text-xs text-muted">ops-console</span>
          <span className="flex items-center gap-1.5 text-xs text-cyan">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-cyan opacity-70 motion-reduce:animate-none" />
              <span className="relative inline-flex size-1.5 rounded-full bg-cyan" />
            </span>
            Live
          </span>
        </div>

        <div className="grid gap-3 p-4 sm:p-5">
          {/* SalesHub */}
          <Row app="SalesHub" detail="Maker-checker approvals">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">Price change on client #482</p>
                <p className="truncate text-xs text-muted">Rs 45,000 to Rs 52,000, requested by sales</p>
              </div>
              <AnimatePresence mode="popLayout" initial={false}>
                <m.span
                  key={approval}
                  initial={{ y: 12, opacity: 0, scale: 0.9 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  exit={{ y: -12, opacity: 0, scale: 0.9 }}
                  transition={{ type: 'spring', stiffness: 420, damping: 28 }}
                  className={clsx(
                    'shrink-0 rounded-full px-3 py-1 text-xs font-semibold',
                    approval === 'pending' && 'bg-violet/15 text-violet-ink',
                    approval === 'review' && 'bg-text/10 text-muted',
                    approval === 'approved' && 'bg-cyan/15 text-cyan',
                  )}
                >
                  {approval === 'pending' ? 'Pending' : approval === 'review' ? 'Checker reviewing' : 'Approved'}
                </m.span>
              </AnimatePresence>
            </div>
          </Row>

          {/* TeamHub */}
          <Row app="TeamHub" detail="Live timers and scoring">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">Logo set for a client order</p>
                <p className="flex items-center gap-2 text-xs text-muted">
                  Designer 04 <span className="text-text/80 tabular-nums">{points} pts</span>
                  <AnimatePresence>
                    {scored && (
                      <m.span
                        initial={{ y: 6, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -8, opacity: 0 }}
                        className="rounded-full bg-cyan/15 px-1.5 font-semibold text-cyan"
                      >
                        +12
                      </m.span>
                    )}
                  </AnimatePresence>
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Ring progress={s / (CYCLE - 1)} />
                <span className="font-mono text-lg font-semibold tabular-nums">
                  {String(Math.floor(seconds / 60) % 60).padStart(2, '0')}:{String(seconds % 60).padStart(2, '0')}
                </span>
              </div>
            </div>
          </Row>

          {/* OpsBot */}
          <Row app="OpsBot" detail="Trello orders from Discord">
            <div className="space-y-2 font-mono text-[13px]">
              <p>
                <span className="text-muted">you</span>{' '}
                <span className="text-cyan">/order_status</span> <span>1042</span>
              </p>
              <AnimatePresence mode="wait" initial={false}>
                {s < 2 ? (
                  <m.p key="typing" className="text-muted" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    OpsBot is typing<span className="animate-pulse">...</span>
                  </m.p>
                ) : (
                  <m.p
                    key="reply"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="rounded-input border-l-2 border-cyan bg-bg/60 px-3 py-2 font-sans text-sm"
                  >
                    Order 1042 is <span className="font-semibold text-cyan">In production</span>, due Friday
                  </m.p>
                )}
              </AnimatePresence>
            </div>
          </Row>
        </div>
      </div>
    </div>
  )
}

function Row({ app, detail, children }: { app: string; detail: string; children: React.ReactNode }) {
  return (
    <div className="rounded-[18px] border border-line bg-bg/50 p-4">
      <div className="mb-3 flex items-baseline justify-between gap-2">
        <span className="font-display text-sm font-semibold">{app}</span>
        <span className="text-xs text-muted">{detail}</span>
      </div>
      {children}
    </div>
  )
}

function Ring({ progress }: { progress: number }) {
  return (
    <svg viewBox="0 0 36 36" className="size-9 -rotate-90">
      <circle cx="18" cy="18" r="15" fill="none" stroke="var(--c-line)" strokeWidth="3" />
      <m.circle
        cx="18"
        cy="18"
        r="15"
        fill="none"
        stroke="var(--c-cyan)"
        strokeWidth="3"
        strokeLinecap="round"
        animate={{ pathLength: Math.max(0.04, progress) }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
      />
    </svg>
  )
}
