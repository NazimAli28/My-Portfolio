import type { ReactNode } from 'react'
import { SplitText } from '@/components/motion/SplitText'

/**
 * Section opener: large heading on the left, short context on the right.
 * Heading reveals once when scrolled into view.
 */
export function SectionHeading({
  title,
  intro,
  id,
  children,
}: {
  title: string
  intro?: ReactNode
  id?: string
  children?: ReactNode
}) {
  return (
    <div className="grid gap-6 md:grid-cols-[1.4fr_1fr] md:items-end">
      <h2 id={id} className="text-4xl font-semibold sm:text-5xl">
        <SplitText text={title} inView />
      </h2>
      {(intro || children) && (
        <div className="measure text-lg text-muted md:justify-self-end">
          {intro && <p>{intro}</p>}
          {children}
        </div>
      )}
    </div>
  )
}
