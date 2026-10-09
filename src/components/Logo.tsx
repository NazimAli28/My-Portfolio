/** "N" monogram with the violet→cyan gradient. Matches public/favicon.svg. */
export function Logo({ className = 'size-8' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="logo-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--c-violet)" />
          <stop offset="1" stopColor="var(--c-cyan)" />
        </linearGradient>
      </defs>
      <path d="M14 50V14h8l18 23V14h8v36h-8L22 27v23z" fill="url(#logo-g)" />
      <circle cx="54" cy="46" r="4" fill="var(--c-cyan)" />
    </svg>
  )
}
