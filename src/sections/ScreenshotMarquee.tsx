import type { CSSProperties } from 'react'
import { Link } from 'react-router'
import { projects } from '@/content/projects'
import type { Image } from '@/types/content'

interface Shot {
  slug: string
  title: string
  img: Image
}

const shots: Shot[] = projects
  .flatMap((p) => [p.cover, ...p.gallery].map((img) => ({ slug: p.slug, title: p.title, img })))
  .filter((s) => s.img.h <= s.img.w)
  .filter((s, i, a) => a.findIndex((o) => o.img.thumb === s.img.thumb) === i)

const half = Math.ceil(shots.length / 2)
const rows = [shots.slice(0, half), shots.slice(half)]
const durations = ['60s', '70s']

function Row({ items, reverse, dur }: { items: Shot[]; reverse?: boolean; dur: string }) {
  return (
    <div
      className={`marquee-track flex w-max group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused] ${reverse ? 'marquee-track-rev' : ''}`}
      style={{ '--marquee-dur': dur } as CSSProperties}
    >
      {[false, true].map((isDup) => (
        <div
          key={String(isDup)}
          className="flex shrink-0 gap-4 pr-4"
          aria-hidden={isDup ? true : undefined}
        >
          {items.map((s) => (
            <Link
              key={s.img.thumb}
              to={`/projects/${s.slug}`}
              tabIndex={isDup ? -1 : undefined}
              aria-label={`${s.title}: ${s.img.alt}`}
              className="block h-[180px] shrink-0 overflow-hidden rounded-[18px] border border-line bg-surface lg:h-[220px]"
              style={{ aspectRatio: `${s.img.w} / ${s.img.h}` }}
            >
              <img
                src={s.img.thumb}
                alt={isDup ? '' : s.img.alt}
                width={s.img.w}
                height={s.img.h}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </Link>
          ))}
        </div>
      ))}
    </div>
  )
}

export function ScreenshotMarquee() {
  return (
    <section
      aria-label="Project screens"
      className="group relative overflow-hidden py-10 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]"
    >
      <div className="flex flex-col gap-4">
        {rows.map((items, i) => (
          <Row key={i} items={items} reverse={i === 1} dur={durations[i]} />
        ))}
      </div>
    </section>
  )
}
