import clsx from 'clsx'
import { m } from 'motion/react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { courses } from '@/content/experience'
import { skills } from '@/content/skills'
import { ease, stagger } from '@/lib/motion-presets'

const chip = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: ease.outExpo } },
}

export function Learning() {
  return (
    <section id="learning" aria-labelledby="learning-title" className="container-page py-24">
      <SectionHeading
        id="learning-title"
        title="Learning machine learning"
        intro="I am moving from building internal tools toward AI-driven software engineering, studying the models behind the features I want to ship."
      />

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {courses.map((c) => (
          <article key={c.title} className="flex flex-col rounded-panel border border-line bg-surface p-6 sm:p-8">
            <h3 className="text-2xl font-semibold">{c.title}</h3>
            <p className="mt-2 text-muted">{c.provider}</p>
            <p className="text-sm text-muted">{c.date}</p>
            <ul className="mt-5 space-y-2">
              {c.items.map((item) => (
                <li key={item} className="relative pl-5">
                  <span aria-hidden="true" className="absolute top-[0.7em] left-0 size-1.5 rounded-full bg-violet" />
                  {item}
                </li>
              ))}
            </ul>
            {c.url && (
              <a
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex w-fit items-center gap-2 font-semibold text-text underline decoration-line underline-offset-4 transition-colors hover:text-cyan hover:decoration-cyan"
              >
                View course
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            )}
          </article>
        ))}
      </div>

      <div className="mt-16 grid gap-10 sm:grid-cols-2">
        {skills.map((group) => {
          const learning = group.name === 'Learning now'
          return (
            <div key={group.name}>
              <h3 className="text-xl font-semibold">{group.name}</h3>
              <m.ul
                className="mt-4 flex flex-wrap gap-2"
                variants={stagger(0.05)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              >
                {group.items.map((item) => (
                  <m.li
                    key={item}
                    variants={chip}
                    className={clsx(
                      'rounded-full border px-3 py-1 text-sm',
                      learning ? 'border-dashed border-cyan text-cyan' : 'border-line text-text',
                    )}
                  >
                    {item}
                  </m.li>
                ))}
              </m.ul>
            </div>
          )
        })}
      </div>
    </section>
  )
}
