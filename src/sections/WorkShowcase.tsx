import { useRef } from 'react'
import { m, useScroll, useTransform } from 'motion/react'
import { projects } from '@/content/projects'

/**
 * Pinned wordmark: "SELECTED WORK" stays put while a SalesHub screen
 * rises from below and grows to full bleed as you scroll. Decorative lead-in to #work.
 */
export function WorkShowcase() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const lead = projects[0]

  const y = useTransform(scrollYProgress, [0, 0.55], ['55vh', '0vh'])
  const scale = useTransform(scrollYProgress, [0, 0.6], [0.42, 1])
  const radius = useTransform(scrollYProgress, [0.4, 0.62], [28, 0])
  const markOpacity = useTransform(scrollYProgress, [0.35, 0.6], [1, 0.12])
  const markScale = useTransform(scrollYProgress, [0, 0.6], [1, 0.9])
  const captionOpacity = useTransform(scrollYProgress, [0.66, 0.78], [0, 1])
  const captionY = useTransform(scrollYProgress, [0.66, 0.78], [24, 0])

  return (
    <div ref={ref} className="relative h-[220vh] sm:h-[260vh]" aria-hidden="true">
      <div className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden">
        <m.p
          className="wordmark absolute text-center leading-[0.8] text-violet"
          style={{ opacity: markOpacity, scale: markScale }}
        >
          Selected
          <br />
          work
        </m.p>

        <m.div
          className="relative h-[100svh] w-full overflow-hidden"
          style={{ y, scale, borderRadius: radius }}
        >
          <img
            src={lead.cover.src}
            alt=""
            loading="lazy"
            decoding="async"
            className="size-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/30 to-transparent" />
          <m.div
            className="container-page absolute inset-x-0 bottom-12"
            style={{ opacity: captionOpacity, y: captionY }}
          >
            <p className="font-display text-4xl font-semibold text-text sm:text-6xl">{lead.title}</p>
            <p className="measure mt-3 text-lg text-text/80">{lead.outcome}</p>
          </m.div>
        </m.div>
      </div>
    </div>
  )
}
