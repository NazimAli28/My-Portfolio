import { m, useScroll, useSpring } from 'motion/react'
import { spring } from '@/lib/motion-presets'

/** Thin violet→cyan bar at the very top that tracks page scroll. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, spring.scroll)
  return (
    <m.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-violet to-cyan"
      style={{ scaleX }}
    />
  )
}
