import type { ReactNode } from 'react'

/** Two-column section: sticky name on the left, content on the right (stacked on mobile). */
export function CaseSection({ title, id, children }: { title: string; id?: string; children: ReactNode }) {
  return (
    <section id={id} className="container-page grid gap-6 py-14 md:grid-cols-[minmax(0,1fr)_minmax(0,2.2fr)] md:gap-12 md:py-20">
      <div className="md:self-start md:sticky md:top-28">
        <h2 className="text-3xl font-semibold">{title}</h2>
      </div>
      <div className="min-w-0">{children}</div>
    </section>
  )
}

export function Paragraphs({ items }: { items: string[] }) {
  return (
    <div className="measure space-y-5 text-lg">
      {items.map((p) => (
        <p key={p}>{p}</p>
      ))}
    </div>
  )
}

export function MarkerList({ items }: { items: string[] }) {
  return (
    <ul className="measure space-y-4 text-lg">
      {items.map((item) => (
        <li key={item} className="flex gap-4">
          <span className="mt-[0.7em] size-2 shrink-0 rounded-full bg-cyan" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}
