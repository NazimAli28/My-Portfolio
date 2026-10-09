import { useCallback, useState } from 'react'
import { Lightbox } from './Lightbox'
import type { Feature, Image } from '@/types/content'

export function FeatureGallery({ features, gallery }: { features: Feature[]; gallery: Image[] }) {
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState<1 | -1>(1)

  const go = useCallback((i: number, d: 1 | -1) => {
    setDirection(d)
    setIndex(i)
  }, [])
  const close = useCallback(() => setOpen(false), [])

  return (
    <div className="mt-12">
      <ul className="grid gap-4 sm:grid-cols-2">
        {features.map((f) => (
          <li
            key={f.title}
            className="rounded-panel border border-line bg-surface p-6 transition-[border-color,box-shadow] duration-300 hover:border-cyan hover:shadow-[var(--glow-cyan)]"
          >
            <h3 className="text-xl font-semibold">{f.title}</h3>
            <p className="mt-2 text-muted">{f.body}</p>
          </li>
        ))}
      </ul>

      {gallery.length > 0 && (
        <>
          <h3 className="mt-16 text-2xl font-semibold">Screens</h3>
          <ul className="mt-6 columns-1 gap-4 sm:columns-2 lg:columns-3">
            {gallery.map((img, i) => (
              <li key={img.src} className="mb-4 break-inside-avoid">
                <button
                  type="button"
                  onClick={() => {
                    setDirection(1)
                    setIndex(i)
                    setOpen(true)
                  }}
                  aria-label={`Open screenshot ${i + 1} of ${gallery.length}: ${img.caption ?? img.alt}`}
                  className="group block w-full cursor-zoom-in text-left"
                  data-cursor="hover"
                >
                  <img
                    src={img.thumb}
                    alt={img.alt}
                    width={img.w}
                    height={img.h}
                    loading="lazy"
                    decoding="async"
                    style={{ aspectRatio: `${img.w} / ${img.h}` }}
                    className="h-auto w-full rounded-input border border-line bg-surface object-cover transition-[border-color,box-shadow] duration-300 group-hover:border-cyan group-hover:shadow-[var(--glow-cyan)]"
                  />
                  {img.caption && <span className="mt-2 block text-sm text-muted">{img.caption}</span>}
                </button>
              </li>
            ))}
          </ul>
          <Lightbox images={gallery} index={index} open={open} direction={direction} onGo={go} onClose={close} />
        </>
      )}
    </div>
  )
}
