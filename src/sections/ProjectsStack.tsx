import { useRef } from 'react'
import { Link } from 'react-router'
import { m, useScroll, useTransform, type MotionValue } from 'motion/react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { projects } from '@/content/projects'
import type { Project } from '@/types/content'
import { startMorph } from '@/lib/morph'

/**
 * Work list as sticky stacking panels: title left, role / stack / year right,
 * earlier panels scale back as the next one slides over. Clicking flies the cover
 * into the case-study hero (lib/morph.ts).
 */
export function ProjectsStack() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  return (
    <section id="work" aria-labelledby="work-title" className="container-page pt-24 pb-16 sm:pt-32">
      <SectionHeading
        id="work-title"
        title="Systems in production"
        intro="Three internal tools I designed, built and maintain at Quixotic Creatives. Each one replaced a manual process that a real team depended on."
      />
      <div ref={ref} className="mt-14 sm:mt-20">
        {projects.map((p, i) => (
          <Card key={p.slug} project={p} index={i} total={projects.length} progress={scrollYProgress} />
        ))}
      </div>
    </section>
  )
}

function Card({
  project: p,
  index,
  total,
  progress,
}: {
  project: Project
  index: number
  total: number
  progress: MotionValue<number>
}) {
  const img = useRef<HTMLImageElement>(null)
  const start = index / total
  const scale = useTransform(progress, [start, 1], [1, 1 - (total - 1 - index) * 0.05])
  const dim = useTransform(progress, [start, 1], [0, (total - 1 - index) * 0.25])

  return (
    <div className="sticky mb-10 sm:mb-16" style={{ top: `calc(96px + ${index * 26}px)` }}>
      <m.article
        style={{ scale }}
        className={`group relative origin-top overflow-hidden rounded-panel border border-line bg-surface transition-[border-color,box-shadow] duration-500 ${
          p.accent === 'violet' ? 'hover:border-violet/60 hover:shadow-[var(--glow-violet)]' : 'hover:border-cyan/50 hover:shadow-[var(--glow-cyan)]'
        }`}
      >
        <Link
          to={`/projects/${p.slug}`}
          onClick={(e) => {
            if (e.metaKey || e.ctrlKey || e.shiftKey || !img.current) return
            startMorph({
              slug: p.slug,
              src: img.current.currentSrc || p.cover.thumb,
              rect: img.current.getBoundingClientRect(),
              radius: 20,
            })
          }}
          className="grid gap-6 p-5 sm:p-8 lg:grid-cols-[1fr_1.25fr] lg:gap-10"
          aria-label={`${p.title}: read the case study`}
        >
          <div className="flex flex-col">
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-4xl font-semibold transition-colors group-hover:text-cyan sm:text-6xl">{p.title}</h3>
              <span className="pt-2 text-sm text-muted tabular-nums">{p.year}</span>
            </div>
            <p className="mt-3 text-lg text-muted">{p.tagline}</p>
            <p className="mt-6 text-xl font-medium text-text">{p.outcome}</p>

            <dl className="mt-auto grid gap-3 pt-8 text-sm">
              <div className="flex gap-3 border-t border-line pt-3">
                <dt className="w-16 shrink-0 text-muted">Role</dt>
                <dd>{p.role}</dd>
              </div>
              <div className="flex gap-3 border-t border-line pt-3">
                <dt className="w-16 shrink-0 text-muted">Stack</dt>
                <dd className="flex flex-wrap gap-1.5">
                  {p.stack.slice(0, 6).map((s) => (
                    <span key={s} className="rounded-full border border-line px-2.5 py-0.5 text-xs">
                      {s}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>
            <span className="mt-6 inline-flex items-center gap-2 font-semibold text-violet-ink transition-colors group-hover:text-cyan">
              Read the case study
              <svg viewBox="0 0 16 16" className="size-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </div>

          <div className="relative self-start overflow-hidden rounded-[20px] border border-line bg-bg">
            <img
              ref={img}
              src={p.cover.thumb}
              srcSet={`${p.cover.thumb} 640w, ${p.cover.src} 1600w`}
              sizes="(min-width: 1024px) 640px, 100vw"
              alt={p.cover.alt}
              width={p.cover.w}
              height={p.cover.h}
              loading="lazy"
              decoding="async"
              className="aspect-[16/10] w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
            />
          </div>
        </Link>
        <m.div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-bg" style={{ opacity: dim }} />
      </m.article>
    </div>
  )
}
