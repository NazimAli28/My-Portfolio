import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, animate, m } from 'motion/react'
import { finishIntro, shouldShowPreloader } from '@/lib/intro'
import { ease } from '@/lib/motion-presets'

const NAME = 'NAZIM ALI'

/**
 * Preloader: wordmark + 0→100 counter, then the screen dims and lifts away.
 * First visit per session only, ~1.2s, skipped under reduced motion.
 * The page renders underneath the whole time, so it never blocks content loading.
 */
export function Preloader() {
  const [show] = useState(shouldShowPreloader)
  const [visible, setVisible] = useState(show)
  const count = useRef<HTMLSpanElement>(null)
  const bar = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!show) {
      finishIntro()
      return
    }
    const controls = animate(0, 100, {
      duration: 1.15,
      ease: [0.45, 0, 0.2, 1],
      onUpdate: (v) => {
        if (count.current) count.current.textContent = String(Math.round(v)).padStart(3, '0')
        if (bar.current) bar.current.style.transform = `scaleX(${v / 100})`
      },
      onComplete: () => window.setTimeout(() => setVisible(false), 180),
    })
    return () => controls.stop()
  }, [show])

  return (
    <AnimatePresence onExitComplete={finishIntro}>
      {visible && (
        <m.div
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-bg p-5 sm:p-8"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.85, ease: ease.inOut, delay: 0.15 }}
          aria-hidden="true"
        >
          <div className="flex justify-between text-sm text-muted">
            <span>Muhammad Nazim Ali</span>
            <span>Software developer</span>
          </div>

          <m.p
            className="wordmark text-center text-text"
            exit={{ opacity: 0.15, scale: 0.96 }}
            transition={{ duration: 0.4 }}
          >
            {NAME.split('').map((ch, i) => (
              <span key={i} className="inline-block overflow-hidden align-bottom">
                <m.span
                  className={`inline-block ${i >= 6 ? 'text-violet' : ''}`}
                  initial={{ y: '105%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 0.7, ease: ease.outExpo, delay: 0.05 + i * 0.04 }}
                >
                  {ch === ' ' ? ' ' : ch}
                </m.span>
              </span>
            ))}
          </m.p>

          <div className="flex items-end justify-between gap-6">
            <span className="relative h-px w-1/2 max-w-sm overflow-hidden bg-line">
              <span ref={bar} className="absolute inset-0 origin-left scale-x-0 bg-cyan" />
            </span>
            <span className="font-display text-6xl leading-none font-semibold tabular-nums sm:text-8xl">
              <span ref={count}>000</span>
              <span className="text-cyan">.</span>
            </span>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  )
}
