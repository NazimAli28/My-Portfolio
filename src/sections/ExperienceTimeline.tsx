import { useRef } from 'react'
import { m, useInView, useScroll, useSpring } from 'motion/react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { education, experience } from '@/content/experience'
import { ease, spring } from '@/lib/motion-presets'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function fmt(date: string | null): string {
  if (!date) return 'present'
  const [y, mo] = date.split('-')
  return `${MONTHS[Number(mo) - 1] ?? ''} ${y}`.trim()
}

type Entry = {
  key: string
  title: string
  org: string
  dates: string
  location: string
  summary?: string
  highlights?: string[]
}

const entries: Entry[] = [
  ...experience.map((e) => ({
    key: `exp-${e.company}`,
    title: e.role,
    org: e.company,
    dates: `${fmt(e.start)} to ${fmt(e.end)}`,
    location: e.location,
    summary: e.summary,
    highlights: e.highlights,
  })),
  ...education.map((e) => ({
    key: `edu-${e.school}`,
    title: e.degree,
    org: e.school,
    dates: `${fmt(e.start)} to ${fmt(e.end)}`,
    location: e.location,
  })),
]

function TimelineItem({ entry }: { entry: Entry }) {
  const ref = useRef<HTMLLIElement>(null)
  const passed = useInView(ref, { once: true, margin: '0px 0px -40% 0px' })
  const shown = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })

  return (
    <li ref={ref} className="relative pb-14 pl-10 last:pb-0 sm:pl-14">
      <span
        aria-hidden="true"
        className="absolute top-1.5 left-0 grid size-6 place-items-center rounded-full border border-line bg-bg"
      >
        <m.span
          className="glow-cyan size-3 rounded-full bg-cyan"
          initial={false}
          animate={{ scale: passed ? 1 : 0, opacity: passed ? 1 : 0 }}
          transition={{ duration: 0.4, ease: ease.outExpo }}
        />
      </span>
      <m.div
        initial={{ opacity: 0, y: 24 }}
        animate={shown ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.7, ease: ease.outExpo }}
      >
        <p className="text-sm text-muted">
          {entry.dates}
        </p>
        <h3 className="mt-1 text-2xl font-semibold sm:text-3xl">{entry.title}</h3>
        <p className="mt-1 text-lg text-muted">
          <span className="text-text">{entry.org}</span>, {entry.location}
        </p>
        {entry.summary && <p className="measure mt-4">{entry.summary}</p>}
        {entry.highlights && (
          <ul className="measure mt-4 space-y-2 text-muted">
            {entry.highlights.map((h) => (
              <li key={h} className="relative pl-5">
                <span aria-hidden="true" className="absolute top-[0.7em] left-0 size-1.5 rounded-full bg-violet" />
                {h}
              </li>
            ))}
          </ul>
        )}
      </m.div>
    </li>
  )
}

export function ExperienceTimeline() {
  const listRef = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 70%', 'end 60%'] })
  const scaleY = useSpring(scrollYProgress, spring.scroll)

  return (
    <section id="experience" aria-labelledby="experience-title" className="container-page py-24 sm:py-32">
      <SectionHeading id="experience-title" title="Experience" intro="Where I have worked and studied, newest first." />
      <div className="relative mt-14">
        <div aria-hidden="true" className="absolute top-2 bottom-2 left-[11px] w-px bg-line" />
        <m.div
          aria-hidden="true"
          className="absolute top-2 bottom-2 left-[11px] w-px origin-top bg-cyan"
          style={{ scaleY }}
        />
        <ol ref={listRef} className="relative list-none">
          {entries.map((entry) => (
            <TimelineItem key={entry.key} entry={entry} />
          ))}
        </ol>
      </div>
    </section>
  )
}
