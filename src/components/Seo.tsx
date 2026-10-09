import { useEffect } from 'react'

const SITE = 'Muhammad Nazim Ali'
const DEFAULT_DESC =
  'Muhammad Nazim Ali builds internal business tools in Python, PHP and SQL: approval workflows, task tracking and chat bots. Case studies, resume and contact.'

/** Per-route title (React 19 hoists <title>) + description/OG meta kept in sync. */
export function Seo({ title, description = DEFAULT_DESC }: { title?: string; description?: string }) {
  const full = title ? `${title} | ${SITE}` : `${SITE}, software developer`

  useEffect(() => {
    const set = (sel: string, value: string) =>
      document.querySelector(sel)?.setAttribute('content', value)
    set('meta[name="description"]', description)
    set('meta[property="og:title"]', full)
    set('meta[property="og:description"]', description)
  }, [full, description])

  return <title>{full}</title>
}
