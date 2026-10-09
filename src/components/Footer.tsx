import { profile } from '@/content/profile'
import { useZonedTime } from '@/hooks/useKarachiTime'
import { scrollToTarget } from '@/lib/lenis'

export function Footer() {
  const time = useZonedTime(profile.timeZone)

  return (
    <footer className="border-t border-line">
      <div className="container-page grid gap-6 py-10 text-sm text-muted sm:grid-cols-3 sm:items-center">
        <p>
          <span className="inline-flex items-center gap-2 text-text">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-cyan opacity-60 motion-reduce:animate-none" />
              <span className="relative inline-flex size-2 rounded-full bg-cyan" />
            </span>
            {profile.availability}
          </span>
        </p>
        <p className="sm:text-center">
          Karachi, <time className="font-semibold text-text tabular-nums">{time}</time> local time (GMT+5)
        </p>
        <div className="flex items-center gap-5 sm:justify-end">
          <span>© {new Date().getFullYear()} {profile.name}</span>
          <button
            type="button"
            onClick={() => scrollToTarget(0)}
            className="text-text underline-offset-4 hover:text-cyan hover:underline"
          >
            Back to top
          </button>
        </div>
      </div>
    </footer>
  )
}
