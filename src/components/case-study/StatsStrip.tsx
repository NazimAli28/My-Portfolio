import { useEffect, useRef } from 'react'
import { animate, useInView, useReducedMotion } from 'motion/react'
import { ease } from '@/lib/motion-presets'
import type { Stat } from '@/types/content'

const CUT = '14px'
const clip = `polygon(0 0, calc(100% - ${CUT}) 0, 100% ${CUT}, 100% 100%, ${CUT} 100%, 0 calc(100% - ${CUT}))`

function CountUp({ value, suffix }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })
  const reduce = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el || !inView || reduce) return
    const controls = animate(0, value, {
      duration: 1.4,
      ease: ease.outExpo,
      onUpdate: (v) => {
        el.textContent = Math.round(v).toLocaleString('en-US')
      },
    })
    return () => controls.stop()
  }, [inView, reduce, value])

  return (
    <span className="tabular-nums">
      <span ref={ref}>{value.toLocaleString('en-US')}</span>
      {suffix}
    </span>
  )
}

export function StatsStrip({ stats }: { stats: Stat[] }) {
  return (
    <section aria-label="Key numbers" className="container-page py-8">
      <ul className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stats.map((s) => (
          <li key={s.label} className="bg-line p-px" style={{ clipPath: clip }}>
            <div className="h-full bg-surface p-5 sm:p-6" style={{ clipPath: clip }}>
              <p className="font-display text-4xl font-semibold text-violet-ink sm:text-5xl">
                <CountUp value={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-2 text-sm text-muted">{s.label}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
