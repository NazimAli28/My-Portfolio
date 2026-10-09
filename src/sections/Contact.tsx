import { useRef } from 'react'
import { m, useScroll, useTransform } from 'motion/react'
import { SplitText } from '@/components/motion/SplitText'
import { Button } from '@/components/ui/Button'
import { profile } from '@/content/profile'
import { useCopy } from '@/hooks/useCopy'

const linkCls =
  'underline decoration-line underline-offset-4 transition-colors hover:text-cyan hover:decoration-cyan'

export function Contact() {
  const ref = useRef<HTMLElement>(null)
  const { copied, copy } = useCopy()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-12%', '12%'])

  return (
    <section
      ref={ref}
      id="contact"
      aria-labelledby="contact-title"
      className="relative overflow-hidden py-28 sm:py-40"
    >
      <m.div
        aria-hidden="true"
        style={{ y }}
        className="pointer-events-none absolute inset-x-0 top-1/2 -z-0 -translate-y-1/2 text-center select-none"
      >
        <span className="wordmark block text-violet/[0.06]">Nazim</span>
      </m.div>

      <div className="container-page relative">
        <h2 id="contact-title" className="font-display text-5xl font-semibold sm:text-7xl">
          <SplitText text="Let's build something your team will use." inView />
        </h2>
        <p className="measure mt-6 text-lg text-muted">{profile.availability}.</p>

        <p className="mt-10 font-display text-2xl font-semibold break-all select-all sm:text-4xl">
          {profile.email}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Button onClick={() => void copy(profile.email)}>
            {copied ? (
              <>
                <svg viewBox="0 0 24 24" className="size-4 text-cyan" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
                  <path d="M5 12.5l4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Email copied
              </>
            ) : (
              'Copy email'
            )}
          </Button>
          <Button variant="ghost" href={`mailto:${profile.email}`}>
            Email me
          </Button>
          <Button variant="ghost" href={profile.resume} download>
            Download resume
          </Button>
          <span aria-live="polite" className="sr-only">
            {copied ? 'Email address copied to clipboard' : ''}
          </span>
        </div>

        <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-lg">
          <li>
            <a href={profile.phoneHref} className={linkCls}>
              {profile.phone}
            </a>
          </li>
          <li>
            <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer" className={linkCls}>
              LinkedIn
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </li>
          <li>
            <a href={profile.socials.github} target="_blank" rel="noopener noreferrer" className={linkCls}>
              GitHub
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </li>
        </ul>
      </div>
    </section>
  )
}
