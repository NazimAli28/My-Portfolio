import { m } from 'motion/react'
import { charRise } from '@/lib/motion-presets'

type Props = {
  text: string
  /** split by 'word' (default, good for headings) or 'char' (wordmark) */
  by?: 'word' | 'char'
  className?: string
  delay?: number
  gap?: number
  /** animate when scrolled into view instead of on mount */
  inView?: boolean
}

/**
 * Masked rise reveal. Screen readers get the plain text from an sr-only copy;
 * the animated pieces are aria-hidden.
 */
export function SplitText({ text, by = 'word', className, delay = 0, gap, inView = false }: Props) {
  const words = text.split(' ')
  const step = gap ?? (by === 'char' ? 0.035 : 0.07)
  const trigger = inView
    ? { whileInView: 'show', viewport: { once: true, margin: '0px 0px -12% 0px' } }
    : { animate: 'show' }

  let i = 0
  return (
    <m.span
      className={className}
      initial="hidden"
      {...trigger}
      variants={{ hidden: {}, show: { transition: { staggerChildren: step, delayChildren: delay } } }}
    >
      <span className="sr-only">{text}</span>
      {words.map((word, wi) => (
        <span key={wi} aria-hidden="true" className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          {by === 'word' ? (
            <m.span className="inline-block" variants={charRise} custom={i++}>
              {word}
            </m.span>
          ) : (
            word.split('').map((ch, ci) => (
              <m.span key={ci} className="inline-block" variants={charRise} custom={i++}>
                {ch}
              </m.span>
            ))
          )}
          {wi < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </m.span>
  )
}
