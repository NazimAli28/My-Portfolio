import type { Transition, Variants } from 'motion/react'

/** Single source for motion timing. */
export const ease = {
  outExpo: [0.16, 1, 0.3, 1] as const,
  inOut: [0.65, 0, 0.35, 1] as const,
}

export const spring = {
  soft: { type: 'spring', stiffness: 120, damping: 20, mass: 0.6 } satisfies Transition,
  snappy: { type: 'spring', stiffness: 380, damping: 30 } satisfies Transition,
  magnetic: { stiffness: 220, damping: 18, mass: 0.4 },
  cursor: { stiffness: 500, damping: 40, mass: 0.5 },
  scroll: { stiffness: 140, damping: 30, restDelta: 0.001 },
}

export const duration = { fast: 0.25, base: 0.5, slow: 0.9 }

/** Page transitions: opacity only on exit so shared-layout morphs are not clipped */
export const page: Variants = {
  initial: { opacity: 0 },
  enter: { opacity: 1, transition: { duration: 0.45, ease: ease.outExpo } },
  exit: { opacity: 0, transition: { duration: 0.25, ease: ease.inOut } },
}

export const stagger = (gap = 0.06, delay = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: gap, delayChildren: delay } },
})

export const rise: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: ease.outExpo } },
}

export const charRise: Variants = {
  hidden: { y: '110%' },
  show: { y: '0%', transition: { duration: 0.9, ease: ease.outExpo } },
}
