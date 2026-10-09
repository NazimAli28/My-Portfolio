import { useEffect } from 'react'
import { AnimatePresence, m } from 'motion/react'
import { Modal } from '@/components/ui/Modal'
import { ease } from '@/lib/motion-presets'
import type { Image } from '@/types/content'

type Props = {
  images: Image[]
  index: number
  open: boolean
  direction: 1 | -1
  onGo: (index: number, direction: 1 | -1) => void
  onClose: () => void
}

const slide = {
  enter: (d: number) => ({ opacity: 0, x: d * 48 }),
  center: { opacity: 1, x: 0 },
  exit: (d: number) => ({ opacity: 0, x: d * -48 }),
}

function Arrow({ dir }: { dir: 'left' | 'right' }) {
  return (
    <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d={dir === 'left' ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7'} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function Lightbox({ images, index, open, direction, onGo, onClose }: Props) {
  const count = images.length
  const prev = () => onGo((index - 1 + count) % count, -1)
  const next = () => onGo((index + 1) % count, 1)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') onGo((index - 1 + count) % count, -1)
      if (e.key === 'ArrowRight') onGo((index + 1) % count, 1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, index, count, onGo])

  const img = images[index]
  const btn =
    'grid size-11 place-items-center rounded-full border border-line bg-bg/70 text-text transition-colors hover:border-cyan hover:text-cyan'

  return (
    <Modal open={open} onClose={onClose} label="Project screenshots" className="max-w-6xl">
      <div className="flex flex-col p-3 pt-14 sm:p-5 sm:pt-16">
        <div className="grid place-items-center overflow-hidden">
          <AnimatePresence mode="wait" initial={false} custom={direction}>
            <m.img
              key={img.src}
              src={img.src}
              alt={img.alt}
              width={img.w}
              height={img.h}
              custom={direction}
              variants={slide}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: ease.outExpo }}
              className="h-auto max-h-[min(80dvh,calc(92dvh-9rem))] w-auto max-w-full rounded-input object-contain"
            />
          </AnimatePresence>
        </div>
        <div className="mt-4 flex items-center gap-3">
          <button type="button" onClick={prev} aria-label="Previous image" className={btn}>
            <Arrow dir="left" />
          </button>
          <div className="min-w-0 flex-1 text-center">
            <p className="text-sm text-muted" aria-live="polite">
              {index + 1} of {count}
            </p>
            {img.caption && <p className="mx-auto mt-1 max-w-[68ch] text-sm">{img.caption}</p>}
          </div>
          <button type="button" onClick={next} aria-label="Next image" className={btn}>
            <Arrow dir="right" />
          </button>
        </div>
      </div>
    </Modal>
  )
}
