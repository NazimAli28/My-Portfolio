import { useRef } from 'react'
import { m, useScroll, useTransform } from 'motion/react'
import { Button } from '@/components/ui/Button'
import { OpsConsole } from '@/components/OpsConsole'
import { SplitText } from '@/components/motion/SplitText'
import { Scramble } from '@/components/motion/Scramble'
import { profile, roles } from '@/content/profile'
import { useIntroDone } from '@/lib/intro'
import { scrollToTarget } from '@/lib/lenis'
import { ease } from '@/lib/motion-presets'

/**
 * Hero: giant wordmark at the back, ops console in front,
 * headline + actions on the left. One orchestrated load sequence after the preloader.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const ready = useIntroDone()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const markY = useTransform(scrollYProgress, [0, 1], ['0%', '-40%'])
  const markScale = useTransform(scrollYProgress, [0, 1], [1, 1.08])
  const consoleY = useTransform(scrollYProgress, [0, 1], ['0%', '-12%'])


  return (
    <section ref={ref} className="relative isolate flex min-h-[100svh] flex-col overflow-hidden pt-28 pb-[13vw]">
      {/* Back layer: the wordmark */}
      <m.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 translate-y-[14%] select-none"
        style={{ y: markY, scale: markScale }}
      >
        <m.p
          className="wordmark text-center whitespace-nowrap"
          style={{
            backgroundImage:
              'linear-gradient(180deg, var(--c-violet) 0%, color-mix(in srgb, var(--c-violet) 40%, transparent) 60%, transparent 92%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
          }}
          initial={{ opacity: 0, y: 80 }}
          animate={ready ? { opacity: 0.9, y: 0 } : undefined}
          transition={{ duration: 1.2, ease: ease.outExpo }}
        >
          Nazim Ali
        </m.p>
      </m.div>

      <div className="container-page grid flex-1 items-center gap-12 lg:grid-cols-[1fr_1.05fr]">
        {/* Front left: headline */}
        <div>
          <m.p
            className="text-base text-muted"
            initial={{ opacity: 0, y: 12 }}
            animate={ready ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {profile.name}, {profile.role.toLowerCase()} in Karachi
          </m.p>
          <h1 tabIndex={-1} className="mt-4 text-[clamp(2.6rem,5vw,5.25rem)] font-semibold outline-none">
            {ready ? <SplitText text={profile.headline} delay={0.15} /> : <span className="opacity-0">{profile.headline}</span>}
          </h1>
          <m.p
            className="mt-6 text-lg text-muted sm:text-xl"
            initial={{ opacity: 0 }}
            animate={ready ? { opacity: 1 } : undefined}
            transition={{ duration: 0.6, delay: 0.55 }}
          >
            Internal systems that real teams use every day, built with{' '}
            <Scramble words={roles} className="font-semibold text-cyan" />
          </m.p>
          <m.div
            className="mt-9 flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 16 }}
            animate={ready ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.7, delay: 0.7, ease: ease.outExpo }}
          >
            <Button onClick={() => scrollToTarget('#work')}>Read the case studies</Button>
            <Button href={profile.resume} download variant="ghost">
              Download resume
            </Button>
          </m.div>
          <m.button
            type="button"
            onClick={() => scrollToTarget('#about')}
            className="mt-10 flex items-center gap-3 text-sm text-muted transition-colors hover:text-cyan"
            initial={{ opacity: 0 }}
            animate={ready ? { opacity: 1 } : undefined}
            transition={{ delay: 1.1 }}
          >
            <span className="relative flex h-8 w-5 justify-center rounded-full border border-line pt-1.5">
              <span className="h-1.5 w-0.5 animate-bounce rounded-full bg-cyan motion-reduce:animate-none" />
            </span>
            Scroll to explore
          </m.button>
        </div>

        {/* Front right: the console */}
        <m.div
          style={{ y: consoleY }}
          initial={{ opacity: 0, x: 60, rotateY: -12 }}
          animate={ready ? { opacity: 1, x: 0, rotateY: 0 } : undefined}
          transition={{ duration: 1.1, delay: 0.35, ease: ease.outExpo }}
          className="[perspective:1200px]"
        >
          <OpsConsole active={ready} />
        </m.div>
      </div>
    </section>
  )
}
