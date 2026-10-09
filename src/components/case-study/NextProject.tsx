import { Link } from 'react-router'
import { Button } from '@/components/ui/Button'
import { getNextProject } from '@/content/projects'
import { profile } from '@/content/profile'
import type { Project } from '@/types/content'

export function NextProject({ project }: { project: Project }) {
  const next = getNextProject(project.slug)

  return (
    <div className="container-page pb-24">
      <section aria-labelledby="ai-note" className="rounded-panel border border-line bg-surface p-6 sm:p-8">
        <h2 id="ai-note" className="text-2xl font-semibold">
          How I used AI
        </h2>
        <p className="measure mt-3 text-lg text-muted">{project.aiNote}</p>
      </section>

      <section aria-labelledby="next-project" className="mt-20 border-t border-line pt-12">
        <h2 id="next-project" className="text-xl font-semibold text-muted">
          Next project
        </h2>
        <Link
          to={`/projects/${next.slug}`}
          className="group mt-6 grid items-center gap-8 md:grid-cols-[1.4fr_1fr]"
          data-cursor="hover"
        >
          <div>
            <p className="font-display text-5xl font-semibold transition-[color,transform] duration-500 ease-out group-hover:translate-x-3 group-hover:text-cyan sm:text-7xl lg:text-8xl">
              {next.title}
            </p>
            <p className="measure mt-5 text-lg text-muted">{next.tagline}</p>
          </div>
          <img
            src={next.cover.thumb}
            alt={next.cover.alt}
            width={next.cover.w}
            height={next.cover.h}
            loading="lazy"
            decoding="async"
            style={{ aspectRatio: `${next.cover.w} / ${next.cover.h}` }}
            className="h-auto w-full rounded-panel border border-line bg-surface object-cover transition-[border-color,box-shadow] duration-300 group-hover:border-cyan group-hover:shadow-[var(--glow-cyan)]"
          />
        </Link>

        <div className="mt-12 flex flex-wrap gap-3">
          <Button href={profile.resume} download>
            Download resume
          </Button>
          <Button variant="ghost" to="/#contact">
            Contact me
          </Button>
        </div>
      </section>
    </div>
  )
}
