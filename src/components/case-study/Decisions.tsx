import { useState } from 'react'
import { AnimatePresence, m } from 'motion/react'
import clsx from 'clsx'
import { ease } from '@/lib/motion-presets'
import type { Decision } from '@/types/content'

export function Decisions({ decisions }: { decisions: Decision[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <ul className="space-y-3">
      {decisions.map((d, i) => {
        const open = openIndex === i
        const rows = [
          { label: 'Problem', value: d.problem },
          { label: 'Choice', value: d.choice },
          { label: 'Trade-off', value: d.tradeoff },
        ]
        return (
          <m.li
            key={d.title}
            layout="position"
            className={clsx(
              'rounded-panel border bg-surface transition-colors duration-300',
              open ? 'border-cyan' : 'border-line hover:border-cyan/60',
            )}
          >
            <h3>
              <button
                type="button"
                aria-expanded={open}
                aria-controls={`decision-${i}`}
                onClick={() => setOpenIndex(open ? null : i)}
                className="flex w-full items-center justify-between gap-4 rounded-panel px-6 py-5 text-left"
                data-cursor="hover"
              >
                <span className="text-xl font-semibold">{d.title}</span>
                <m.svg
                  viewBox="0 0 24 24"
                  className={clsx('size-5 shrink-0', open ? 'text-cyan' : 'text-muted')}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                  animate={{ rotate: open ? 45 : 0 }}
                  transition={{ duration: 0.3, ease: ease.outExpo }}
                >
                  <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                </m.svg>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {open && (
                <m.div
                  id={`decision-${i}`}
                  role="region"
                  aria-label={d.title}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: ease.outExpo }}
                  className="overflow-hidden"
                >
                  <dl className="space-y-4 px-6 pb-6">
                    {rows.map((r) => (
                      <div key={r.label} className="grid gap-1 sm:grid-cols-[7rem_1fr] sm:gap-6">
                        <dt className="text-muted">{r.label}</dt>
                        <dd className="measure">{r.value}</dd>
                      </div>
                    ))}
                  </dl>
                </m.div>
              )}
            </AnimatePresence>
          </m.li>
        )
      })}
    </ul>
  )
}
