import { useState, type KeyboardEvent } from 'react'
import clsx from 'clsx'
import type { ProjectVersion } from '@/types/content'

export function VersionCompare({ versions }: { versions: ProjectVersion[] }) {
  const [active, setActive] = useState(versions.length - 1)

  const onKey = (e: KeyboardEvent) => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return
    e.preventDefault()
    const next = (active + (e.key === 'ArrowRight' ? 1 : -1) + versions.length) % versions.length
    setActive(next)
    document.getElementById(`ver-tab-${versions[next].label}`)?.focus()
  }

  return (
    <div>
      <div role="tablist" aria-label="Project version" onKeyDown={onKey} className="mb-5 flex gap-2 md:hidden">
        {versions.map((v, i) => (
          <button
            key={v.label}
            id={`ver-tab-${v.label}`}
            role="tab"
            type="button"
            aria-selected={active === i}
            aria-controls={`ver-panel-${v.label}`}
            tabIndex={active === i ? 0 : -1}
            onClick={() => setActive(i)}
            className={clsx(
              'rounded-full border px-5 py-2 font-semibold transition-colors',
              active === i
                ? 'border-violet bg-violet text-white'
                : 'border-line text-muted hover:border-cyan hover:text-cyan',
            )}
          >
            {v.label}
          </button>
        ))}
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {versions.map((v, i) => {
          const isNew = v.label === 'v2'
          return (
            <article
              key={v.label}
              id={`ver-panel-${v.label}`}
              role="tabpanel"
              aria-labelledby={`ver-tab-${v.label}`}
              className={clsx(
                'rounded-panel border bg-surface p-6 sm:p-8',
                isNew ? 'glow-violet border-violet' : 'border-line',
                active === i ? 'block' : 'hidden md:block',
              )}
            >
              <p className={clsx('font-display text-lg font-semibold', isNew ? 'text-violet-ink' : 'text-muted')}>
                {v.label}
              </p>
              <h3 className="mt-1 text-2xl font-semibold">{v.title}</h3>
              <p className="mt-3 text-muted">{v.summary}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {v.stack.map((s) => (
                  <li key={s} className="rounded-full border border-line px-3 py-1 text-sm">
                    {s}
                  </li>
                ))}
              </ul>
              <ul className="mt-6 space-y-3">
                {v.points.map((p) => (
                  <li key={p} className="flex gap-3">
                    <span
                      className={clsx('mt-[0.7em] size-1.5 shrink-0 rounded-full', isNew ? 'bg-violet' : 'bg-muted')}
                      aria-hidden="true"
                    />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </article>
          )
        })}
      </div>
    </div>
  )
}
