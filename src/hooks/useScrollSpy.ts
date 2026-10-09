import { useEffect, useState } from 'react'

/** Returns the id of the section currently in the middle band of the viewport. */
export function useScrollSpy(ids: string[], enabled = true) {
  const [active, setActive] = useState<string | null>(null)
  const key = ids.join(',')

  useEffect(() => {
    if (!enabled) return
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id)
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    // Sections mount after the page transition, so retry briefly until they exist
    let tries = 0
    let timer = 0
    const attach = () => {
      const els = key
        .split(',')
        .map((id) => document.getElementById(id))
        .filter((el): el is HTMLElement => !!el)
      if (els.length) els.forEach((el) => io.observe(el))
      else if (tries++ < 20) timer = window.setTimeout(attach, 150)
    }
    attach()
    return () => {
      window.clearTimeout(timer)
      io.disconnect()
    }
  }, [key, enabled])

  return enabled ? active : null
}
