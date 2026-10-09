import { useEffect, useState } from 'react'
import { m, useMotionValue, useSpring } from 'motion/react'
import { usePointerFine, useReducedMotion } from '@/hooks/useMedia'
import { spring } from '@/lib/motion-presets'

const INTERACTIVE = 'a, button, [role="button"], input, textarea, select, [data-cursor="hover"]'

/**
 * Cursor follower: a cyan ring that trails the pointer and grows over interactive
 * elements. The native cursor stays visible. Fine pointers only, off under reduced motion.
 */
export function Cursor() {
  const fine = usePointerFine()
  const reduced = useReducedMotion()
  if (!fine || reduced) return null
  return <Follower />
}

function Follower() {
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, spring.cursor)
  const sy = useSpring(y, spring.cursor)
  const [hover, setHover] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const move = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setVisible(true)
      setHover(!!(e.target as Element | null)?.closest?.(INTERACTIVE))
    }
    const leave = () => setVisible(false)
    window.addEventListener('pointermove', move, { passive: true })
    document.documentElement.addEventListener('pointerleave', leave)
    return () => {
      window.removeEventListener('pointermove', move)
      document.documentElement.removeEventListener('pointerleave', leave)
    }
  }, [x, y])

  return (
    <m.div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[95] size-[52px] rounded-full border border-cyan"
      style={{ x: sx, y: sy, translateX: '-50%', translateY: '-50%' }}
      animate={{
        scale: hover ? 1 : 0.54,
        opacity: visible ? 1 : 0,
        backgroundColor: hover ? 'rgb(0 245 255 / 0.08)' : 'rgb(0 245 255 / 0)',
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 26 }}
    />
  )
}
