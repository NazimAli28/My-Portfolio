import type { CSSProperties } from 'react'
import { marquee } from '@/content/skills'

function TechSet() {
  return (
    <div className="flex shrink-0 items-center gap-8 pr-8 sm:gap-12 sm:pr-12">
      {marquee.map((t) => (
        <span key={t} className="flex items-center gap-8 sm:gap-12">
          <span className="whitespace-nowrap font-display text-3xl font-semibold text-text/80 sm:text-5xl">
            {t}
          </span>
          <span aria-hidden="true" className="text-xl text-cyan">
            ✦
          </span>
        </span>
      ))}
    </div>
  )
}

export function TechMarquee() {
  return (
    <section aria-label="Technologies" className="group overflow-hidden border-y border-line py-6">
      <ul className="sr-only">
        {marquee.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
      <div
        aria-hidden="true"
        className="marquee-track flex w-max group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused]"
        style={{ '--marquee-dur': '40s' } as CSSProperties}
      >
        <TechSet />
        <TechSet />
      </div>
    </section>
  )
}
