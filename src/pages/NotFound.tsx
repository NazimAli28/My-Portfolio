import { Link } from 'react-router'
import { Seo } from '@/components/Seo'
import { PageTransition } from '@/components/motion/PageTransition'
import { projects } from '@/content/projects'

export default function NotFound() {
  return (
    <PageTransition>
      <Seo title="Page not found" />
      <section className="container-page flex min-h-dvh flex-col justify-center pt-28 pb-20">
        <p className="wordmark text-violet/25 select-none" aria-hidden="true">
          404
        </p>
        <h1 tabIndex={-1} className="mt-6 text-4xl font-semibold outline-none sm:text-5xl">
          This page doesn't exist.
        </h1>
        <p className="measure mt-4 text-lg text-muted">
          The link may be old or mistyped. Head back home, or open one of the case studies.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/" className="rounded-full bg-violet px-6 py-3 font-semibold text-white">
            Go to the home page
          </Link>
          {projects.map((p) => (
            <Link
              key={p.slug}
              to={`/projects/${p.slug}`}
              className="rounded-full border border-line px-6 py-3 font-semibold transition-colors hover:border-cyan hover:text-cyan"
            >
              {p.title}
            </Link>
          ))}
        </div>
      </section>
    </PageTransition>
  )
}
