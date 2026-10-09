import { useEffect, useRef, useState } from 'react'
import { useInView } from 'motion/react'
import { useReducedMotion } from '@/hooks/useMedia'

const GLYPHS = '!<>-_\\/[]{}=+*^?#ABCDEFGHIJKLMNOPQRSTUVWXYZ'

/**
 * Cycles through words with a text-scramble effect (rAF, no re-render per frame).
 * The visible text is aria-hidden; screen readers get the full list once.
 */
export function Scramble({ words, interval = 2600, className }: { words: string[]; interval?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [index, setIndex] = useState(0)
  const reduced = useReducedMotion()
  const inView = useInView(ref)

  useEffect(() => {
    if (reduced || !inView) return
    const id = window.setInterval(() => setIndex((i) => (i + 1) % words.length), interval)
    return () => window.clearInterval(id)
  }, [words.length, interval, reduced, inView])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const target = words[index]
    if (reduced) {
      el.textContent = target
      return
    }
    const from = el.textContent ?? ''
    const len = Math.max(from.length, target.length)
    const queue = Array.from({ length: len }, (_, i) => ({
      from: from[i] ?? '',
      to: target[i] ?? '',
      start: Math.floor(Math.random() * 14),
      end: 14 + Math.floor(Math.random() * 16),
    }))
    let frame = 0
    let raf = 0
    const tick = () => {
      let out = ''
      let complete = 0
      for (const q of queue) {
        if (frame >= q.end) {
          complete++
          out += q.to
        } else if (frame >= q.start) {
          out += q.to === ' ' ? ' ' : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
        } else out += q.from
      }
      el.textContent = out
      if (complete < queue.length) {
        frame++
        raf = requestAnimationFrame(tick)
      }
    }
    tick()
    return () => cancelAnimationFrame(raf)
  }, [index, words, reduced])

  return (
    <>
      <span ref={ref} aria-hidden="true" className={className}>
        {words[0]}
      </span>
      <span className="sr-only">{words.join(', ')}</span>
    </>
  )
}
