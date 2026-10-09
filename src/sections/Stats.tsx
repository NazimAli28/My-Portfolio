import { useEffect, useRef } from 'react'
import { animate, useInView, useReducedMotion } from 'motion/react'
import { stats } from '@/content/profile'

const CUT = 'polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))'

/** Count-up highlights. Numbers are written straight into the DOM, so no re-render per frame. */
export function Stats() {
  const sectionRef = useRef<HTMLElement>(null)
  const numRefs = useRef<(HTMLSpanElement | null)[]>([])
  const inView = useInView(sectionRef, { once: true, margin: '0px 0px -15% 0px' })
  const reduce = useReducedMotion()

  useEffect(() => {
    if (!inView || reduce) return
    const controls = stats.map((s, i) =>
      animate(0, s.value, {
        duration: 1.6,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (v) => {
          const el = numRefs.current[i]
          if (el) el.textContent = String(Math.round(v))
        },
      }),
    )
    return () => controls.forEach((c) => c.stop())
  }, [inView, reduce])

  return (
    <section ref={sectionRef} aria-label="Highlights" className="container-page py-16">
      <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-5">
        {stats.map((s, i) => (
          <li
            key={s.label}
            className="bg-line p-px last:col-span-2 lg:last:col-span-1"
            style={{ clipPath: CUT }}
          >
            <div
              className="flex h-full flex-col justify-between gap-3 bg-surface p-5"
              style={{ clipPath: CUT }}
            >
              <p className="font-display text-5xl font-semibold tabular-nums text-violet-ink">
                <span className="sr-only">{`${s.value}${s.suffix ?? ''}`}</span>
                <span
                  aria-hidden="true"
                  ref={(el) => {
                    numRefs.current[i] = el
                  }}
                >
                  {reduce ? s.value : 0}
                </span>
                <span aria-hidden="true">{s.suffix}</span>
              </p>
              <p className="text-sm text-muted">{s.label}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
