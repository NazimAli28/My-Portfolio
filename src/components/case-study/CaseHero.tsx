import { Link } from 'react-router'
import { m } from 'motion/react'
import { Button } from '@/components/ui/Button'
import { SplitText } from '@/components/motion/SplitText'
import { ease } from '@/lib/motion-presets'
import type { Project } from '@/types/content'

/**
 * Case-study header. The cover sits in the first screen and carries
 * data-morph-target so the home card's cover can fly into it (lib/morph.ts).
 */
export function CaseHero({ project }: { project: Project }) {
  const { slug, title, tagline, cover, links } = project
  const meta = [
    { label: 'Role', value: project.role },
    { label: 'Type', value: project.type },
    { label: 'Year', value: project.year },
  ]

  return (
    <header className="relative pt-28 pb-12 sm:pt-32 sm:pb-16">
      <div className="pointer-events-none absolute inset-x-0 top-20 -z-10 overflow-hidden" aria-hidden="true">
        <p className="wordmark whitespace-nowrap text-violet/[0.07] select-none">{title}</p>
      </div>

      <div className="container-page">
        <Link
          to="/#work"
          className="inline-flex items-center gap-2 text-base text-muted transition-colors hover:text-cyan"
        >
          <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M15 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          All projects
        </Link>

        <div className="mt-6 grid items-center gap-8 lg:grid-cols-[1fr_1.2fr] lg:gap-12">
          <div>
            <h1 tabIndex={-1} className="font-display text-5xl font-semibold outline-none sm:text-7xl">
              <SplitText text={title} by="char" delay={0.2} />
            </h1>
            <m.p
              className="measure mt-5 text-xl text-muted"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45, ease: ease.outExpo }}
            >
              {tagline}
            </m.p>
            <m.div
              className="mt-8 flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6, ease: ease.outExpo }}
            >
              <Button href={links.github} target="_blank" rel="noopener noreferrer">
                View code on GitHub
              </Button>
              {links.live && (
                <Button variant="ghost" href={links.live} target="_blank" rel="noopener noreferrer">
                  Try the live demo
                </Button>
              )}
            </m.div>
          </div>

          <img
            data-morph-target={slug}
            src={cover.src}
            alt={cover.alt}
            width={cover.w}
            height={cover.h}
            fetchPriority="high"
            decoding="async"
            style={{ aspectRatio: `${cover.w} / ${cover.h}` }}
            className="h-auto w-full rounded-panel border border-line bg-surface object-cover object-top shadow-2xl"
          />
        </div>

        <dl className="mt-12 grid gap-x-8 gap-y-6 border-t border-line pt-8 sm:grid-cols-2 lg:grid-cols-[1.4fr_1.2fr_0.6fr]">
          {meta.map((item) => (
            <div key={item.label}>
              <dt className="text-sm text-muted">{item.label}</dt>
              <dd className="mt-1">{item.value}</dd>
            </div>
          ))}
          <div className="sm:col-span-2 lg:col-span-3">
            <dt className="text-sm text-muted">Stack</dt>
            <dd className="mt-2">
              <ul className="flex flex-wrap gap-2">
                {project.stack.map((s) => (
                  <li key={s} className="rounded-full border border-line bg-surface/40 px-3 py-1 text-sm">
                    {s}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        </dl>
      </div>
    </header>
  )
}
